from flask import Blueprint, request, jsonify
from models import User
from database import db
from flask_jwt_extended import create_access_token

auth = Blueprint("auth", __name__)

@auth.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.query.filter((User.email == data["email"]) | (User.username == data["username"])).first():
        return jsonify({"error": "User already exists"}), 400

    new_user = User(username=data["username"], email=data["email"])
    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "username": user.username})