from typing import List
from datetime import datetime
from models import VoteType

from pydantic import BaseModel

class ItemBase(BaseModel):
    text: str

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    form_id: int

    class Config:
        orm_mode = True


class FormBase(BaseModel):
    pass

class FormCreate(FormBase):
    password: str
    items: List[ItemCreate] = []

class Form(FormBase):
    id: int
    items: List[Item] = []

    class Config:
        orm_mode = True

class VoteBase(BaseModel):
    item_id: int
    ip: str # Use pydantic ipaddress.IPv4Address?
    vote_type: VoteType
    pass

class VoteCreate(VoteBase):
    pass

class Vote(VoteBase):
    id: int
    item: Item = None
    timestamp: datetime = None

    class Config:
        orm_mode = True