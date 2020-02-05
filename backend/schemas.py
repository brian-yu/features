from typing import List

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