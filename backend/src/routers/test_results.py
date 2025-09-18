from fastapi import APIRouter, HTTPException
from database import db


router = APIRouter(prefix="/test-results", tags=["test-results"])

@router.post("/")
async def add_test_result(result: dict):
    """Add a new test result"""
    res = await db.test_results.insert_one(result)
    return {"inserted_id": str(res.inserted_id)}

@router.get("/")
async def get_test_results():
    results = []
    cursor = db.test_results.find()
    async for r in cursor:
        r["_id"] = str(r["_id"])
        results.append(r)
    
    # If no results in database, return sample data
    if not results:
        sample_results = [
            {
                "_id": "result1",
                "title": "Tulsi Taste Analysis",
                "herb_id": "sample1",
                "raw_data": [
                    {"x": 0, "value": 0.2},
                    {"x": 1, "value": 0.4},
                    {"x": 2, "value": 0.6},
                    {"x": 3, "value": 0.8},
                    {"x": 4, "value": 0.7},
                    {"x": 5, "value": 0.5}
                ],
                "timestamp": "2024-01-15T10:30:00Z"
            },
            {
                "_id": "result2", 
                "title": "Ashwagandha E-Tongue Test",
                "herb_id": "sample2",
                "raw_data": [
                    {"x": 0, "value": 0.1},
                    {"x": 1, "value": 0.3},
                    {"x": 2, "value": 0.5},
                    {"x": 3, "value": 0.4},
                    {"x": 4, "value": 0.6},
                    {"x": 5, "value": 0.8}
                ],
                "timestamp": "2024-01-15T11:00:00Z"
            }, # <-- ✅ FIXED: Added the missing comma here
            {
                "_id": "result3",
                "title": "Turmeric E-Tongue Profile",
                "herb_id": "sample3", # <-- THIS IS THE CRUCIAL LINK!
                "raw_data": [
                    {"x": 0, "value": 0.3}, {"x": 1, "value": 0.5},
                    {"x": 2, "value": 0.8}, {"x": 3, "value": 0.7},
                    {"x": 4, "value": 0.4}, {"x": 5, "value": 0.2}
                ],
                "timestamp": "2024-01-15T12:00:00Z"
            }
        ]
        return sample_results
    
    return results

@router.get("/{herb_id}")
async def get_results_by_herb(herb_id: str):
    results = []
    cursor = db.test_results.find({"herb_id": herb_id})
    async for r in cursor:
        r["_id"] = str(r["_id"])
        results.append(r)
    if not results:
        raise HTTPException(status_code=404, detail="No results found for this herb")
    return results

# ✅ FIXED: Removed the duplicated code from the herbs router that was here

