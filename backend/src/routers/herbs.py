from fastapi import APIRouter, HTTPException
from database import db



router = APIRouter(prefix="/herbs", tags=["herbs"])

@router.post("/")
async def add_herb(herb: dict):
    """Add a new herb"""
    result = await db.herbs.insert_one(herb)
    return {"inserted_id": str(result.inserted_id)}

@router.get("/")
async def get_herbs():
    herbs = []
    cursor = db.herbs.find()
    async for herb in cursor:
        herb["_id"] = str(herb["_id"])
        herbs.append(herb)
    
    # If no herbs in database, return sample data
    if not herbs:
        sample_herbs = [
            {
                "_id": "sample1",
                "name": "Tulsi (Holy Basil)",
                "scientific_name": "Ocimum tenuiflorum",
                "taste_signature": "Bitter, pungent, astringent",
                "uses": "Respiratory health, stress relief, immunity boost"
            },
            {
                "_id": "sample2", 
                "name": "Ashwagandha",
                "scientific_name": "Withania somnifera",
                "taste_signature": "Bitter, astringent, sweet",
                "uses": "Stress management, energy, sleep support"
            },
            {
                "_id": "sample3",
                "name": "Turmeric",
                "scientific_name": "Curcuma longa", 
                "taste_signature": "Bitter, pungent, astringent",
                "uses": "Anti-inflammatory, digestive health, skin care"
            }
        ]
        return sample_herbs
    
    return herbs

@router.get("/{name}")
async def get_herb(name: str):
    herb = await db.herbs.find_one({"name": name})
    if not herb:
        raise HTTPException(status_code=404, detail="Herb not found")
    herb["_id"] = str(herb["_id"])
    return herb
