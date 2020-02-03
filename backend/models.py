from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base

class Feature(Base):
    __tablename__ = "features"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    upvotes = Column(Integer)
    downvotes = Column(Integer)
    form_id = Column(Integer, ForeignKey("forms.id"))

    form = relationship("Form", back_populates="features")

class Form(Base):
    __tablename__ = "forms"

    id = Column(Integer, primary_key=True, index=True)
    hashed_password = Column(String)

    features = relationship("Feature", back_populates="form")
