from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    
    form_id = Column(Integer, ForeignKey("forms.id"))
    form = relationship("Form", back_populates="items")

    votes = relationship("Vote", back_populates="item")

class Form(Base):
    __tablename__ = "forms"

    id = Column(Integer, primary_key=True, index=True)
    hashed_password = Column(String)

    items = relationship("Item", back_populates="form")

class Vote(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, index=True)
    upvotes = Column(Integer)
    downvotes = Column(Integer)

    item_id = Column(Integer, ForeignKey("items.id"))
    item = relationship("Item", back_populates="votes")