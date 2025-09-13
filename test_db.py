from sqlmodel import create_engine, SQLModel

# this is the database url
DATABASE_URL = "postgresql://postgres:2005@localhost:5432/gulaabjamun_db"


engine = create_engine(DATABASE_URL, echo=True)



try:
    with engine.connect() as conn:
        print("Connection successful!")
except Exception as e:
    print("Error connecting to database:", e)
