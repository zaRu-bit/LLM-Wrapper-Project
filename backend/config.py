import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret"
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "jwt-super-secret"
    SQLALCHEMY_DATABASE_URI = "sqlite:///users.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False