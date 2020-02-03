from typing import List

from pydantic import BaseModel

class FeatureBase(BaseModel):
    text: str

class FeatureCreate(FeatureBase):
    pass

class FeatureVote(FeatureBase):
    id: int
    upvotes: int
    downvotes: int

class Feature(FeatureBase):
    id: int
    upvotes: int
    downvotes: int
    form_id: int

    class Config:
        orm_mode = True


class FormBase(BaseModel):
    pass

class FormCreate(FormBase):
    password: str
    features: List[FeatureCreate] = []

class Form(FormBase):
    id: int
    features: List[Feature] = []

    class Config:
        orm_mode = True