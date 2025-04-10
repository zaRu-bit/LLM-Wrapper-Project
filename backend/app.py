from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from database import db
from auth import auth
from models import User

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
JWTManager(app)

app.register_blueprint(auth)

@app.route("/")
def home():
    return {"message": "Welcome to the LLM Wrapper API"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Initialize the database and create tables
    app.run(debug=True)