from fastapi import FastAPI
from src.routers import herbs, test_results         #import routers for herbs and test results


#here we are creating the fastapi app
app = FastAPI(
    title="Gulaab Jamun E-Tongue API",
    description="API for managing herbs and taste data",
    version="1.0.0"
)

# Including routers so that they can be used in the app
app.include_router(herbs.router)
app.include_router(test_results.router)


#this is the root endpoint with the message "Welcome to Gulaab Jamun E-Tongue API"
@app.get("/")
def root():
    return {"message": "Welcome to Gulaab Jamun E-Tongue API"}
