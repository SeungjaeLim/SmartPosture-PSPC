# db.py

import mysql.connector
from config import DBConfig

def get_db_connection():
    connection = mysql.connector.connect(
        host=DBConfig.DB_HOST,
        user=DBConfig.DB_USER,
        password=DBConfig.DB_PASSWORD,
        database=DBConfig.DB_NAME
    )
    return connection
