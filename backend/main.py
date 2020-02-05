from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/forms/", response_model=schemas.Form)
def create_form(form: schemas.FormCreate, db: Session = Depends(get_db)):
    return crud.create_form(db=db, form=form)

@app.get("/forms/", response_model=List[schemas.Form])
def read_forms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    forms = crud.get_forms(db, skip=skip, limit=limit)
    return forms

@app.get("/forms/{form_id}", response_model=schemas.Form)
def read_form(form_id: int, db: Session = Depends(get_db)):
    form = crud.get_form(db, form_id)
    return form