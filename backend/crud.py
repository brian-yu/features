from sqlalchemy.orm import Session

import models, schemas


def get_form(db: Session, form_id: int):
    return db.query(models.Form).filter(models.Form.id == form_id).first()


def get_forms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Form).offset(skip).limit(limit).all()

def create_form(db: Session, form: schemas.FormCreate):
    fake_hashed_password = form.password + "notreallyhashed"
    db_form = models.Form(hashed_password=fake_hashed_password)
    db.add(db_form)
    for item in form.items:
        db_form.items.append(
            models.Item(text=item.text))
    db.commit()
    db.refresh(db_form)
    return db_form

# def get_features(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Feature).offset(skip).limit(limit).all()

# def create_form_feature(db: Session, item: schemas.FeatureCreate, form_id: int):
#     db_feature = models.Feature(**item.dict(), form_id=form_id)
#     db.add(db_feature)
#     db.commit()
#     db.refresh(db_feature)
#     return db_feature