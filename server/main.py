# main.py

from fastapi import FastAPI
from api import router as api_router
import account_api

app = FastAPI()

app.include_router(api_router)
app.include_router(account_api.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
