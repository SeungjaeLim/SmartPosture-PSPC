from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from pydantic import BaseModel
import db
from model import PostureModel 
import glob
import cv2
import io
from PIL import Image
from chat import llm_advice
import modi
import time

router = APIRouter()
posture_model = PostureModel() 
bundle = modi.MODI()

@router.get("/study-data")
async def get_study_data():
    connection = db.get_db_connection()
    cursor = connection.cursor()
    # SQL query to fetch and aggregate data
    query = """
    SELECT
        DATE(date) as date,
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END) as correctPostureTime,
        SUM(CASE WHEN status != 'correct' THEN 1 ELSE 0 END) as incorrectPostureTime
    FROM log
    GROUP BY DATE(date)
    ORDER BY DATE(date)
    """
    try:
        cursor.execute(query)
        rows = cursor.fetchall()
        study_data = [
            {"date": row[0], "correctPostureTime": row[1], "incorrectPostureTime": row[2]}
            for row in rows
        ]
        return study_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        connection.close()

@router.get("/env")
async def get_env():
    env = bundle.envs[0]
    env_data = {
        "humidity": env.humidity,
        "temperature": env.temperature,
        "brightness": env.brightness,
    }
    return env_data


@router.get("/advise")
async def get_advise():
    connection = db.get_db_connection()
    cursor = connection.cursor()
    try:
        # Query to get counts of different postures
        query = """
        SELECT status, COUNT(*) as count
        FROM log
        GROUP BY status
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        posture_counts = {row[0]: row[1] for row in rows}
        # Formulate your message to the chat API
        posture_descriptions = []
        for posture, minutes in posture_counts.items():
            if posture == 'correct':
                posture_descriptions.append(f"{minutes} minutes of correct posture")
            else:
                posture_descriptions.append(f"{minutes} minutes of {posture} issues")
        
        posture_query = ", and ".join(posture_descriptions)# Send this message to the chat API and LangChain
        return llm_advice(posture_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        connection.close()

@router.post("/update-study")
async def update_study():
    # Capture an image from the webcam
    cap = cv2.VideoCapture(0)  # 0 is typically the default camera
    ret, frame = cap.read()
    cap.release()
    if not ret:
        return {"error": "Failed to capture image"}
    
    # Convert the captured frame to PIL Image
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image)

    # Analyze the image with your CNN
    result = posture_model.analyze_image(pil_image)

    insert_log(result)
    # Logic to update study time based on CNN result
    speaker = bundle.speakers[0]
    display = bundle.displays[0]

    if result != "correct":
        display.text = "Incorrect Posture Detected!"     
        speaker.volume = 100 # Example values, change as needed
        time.sleep(3)
        display.clear()
        speaker.turn_off()
    # Save to DB, etc.
    return {"result": result}

def insert_log(status):
    connection = db.get_db_connection()
    cursor = connection.cursor()
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(current_time, status)
    try:
        cursor.execute("INSERT INTO log (date, status) VALUES (%s, %s)", (current_time, status))
        connection.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        connection.close()
