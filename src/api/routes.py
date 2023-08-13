"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import random
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import (create_access_token, get_jwt_identity, jwt_required)
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/test', methods=['GET'])
def token_maker():
    return jsonify(
        token=create_access_token("Is this a valid token?")
    )

@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    print(data)
    user = User.query.filter_by(email=data.get("email", None)).first()

    if user:
        return jsonify(message="This user already exists. Get outta here!"), 400
    
    user = User(
        email=data["email"],
        password=data["password"],
        lucky_number=random.randrange(1, 100)
    )
    db.session.add(user)
    db.session.commit()
    return '', 204
 
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    user = User.query.filter_by(email=data.get("email", None)).first()

    if not user or user.password != data.get("password", None):
        return jsonify(message="Invalid Credentials"), 401

    token = create_access_token(user.email)
    return jsonify(token=token), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def top_secret():
    user = User.query.filter_by(email=get_jwt_identity()).first()

    return jsonify(
        top_secret="https://image.tmdb.org/t/p/original/xsuEGorx2RcgtF6JKQjwYYrcr3E.jpg",
        email=user.email,
        lucky_number=user.lucky_number
    ), 200