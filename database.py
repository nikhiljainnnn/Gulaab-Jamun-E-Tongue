from sqlmodel import SQLModel, create_engine, Session


DATABASE_URL = "postgresql://postgres:2005@localhost:5432/gulaabjamun_db"

engine = create_engine(DATABASE_URL, echo=True)

# Dependency for FastAPI routes
def get_session():
    with Session(engine) as session:
        yield session
