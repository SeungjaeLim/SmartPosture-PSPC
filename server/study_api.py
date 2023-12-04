from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import db

router = APIRouter()

@router.get("/study-data")
def get_study_data():
    # Your logic to fetch and return study data
    return [{"date": "2023-11-01", "correctPostureTime": 120, "incorrectPostureTime": 30}, 
            {"date": "2023-11-02", "correctPostureTime": 120, "incorrectPostureTime": 30},
            {"date": "2023-11-03", "correctPostureTime": 150, "incorrectPostureTime": 30}]

@router.get("/advise")
def get_advise():
    return "Hi"