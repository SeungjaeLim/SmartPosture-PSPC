# api.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/items/")
async def read_items():
    
    return [{"name": "Item 1"}, {"name": "Item 2"}]

@router.get("/items/{item_id}")
async def read_item(item_id: int):
    
    return {"name": f"Item {item_id}"}
