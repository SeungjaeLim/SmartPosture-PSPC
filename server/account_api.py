from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
import db

router = APIRouter()

class LoginData(BaseModel):
    id: str
    password: str

class RegisterData(BaseModel):
    id: str
    password: str
    email: str


@router.post("/login/")
def login(login_data: LoginData):
    connection = db.get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE id = %s AND passwd = %s", 
                   (login_data.id, login_data.password))
    user = cursor.fetchone()
    connection.close()

    if user:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
@router.post("/register/")
def register(register_data: RegisterData):
    connection = db.get_db_connection()
    cursor = connection.cursor()
    
    # Check if the user already exists
    cursor.execute("SELECT * FROM users WHERE id = %s", (register_data.id,))
    user = cursor.fetchone()
    if user:
        connection.close()
        raise HTTPException(status_code=400, detail="User already exists")

    # Insert new user
    cursor.execute("INSERT INTO users (id, passwd, email) VALUES (%s, %s, %s)", 
                   (register_data.id, register_data.password, register_data.email))
    connection.commit()
    connection.close()

    return {"message": "Registration successful"}

