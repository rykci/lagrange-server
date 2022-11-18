from flask import render_template, request, Flask, g, send_from_directory, abort, jsonify

import time

from sqlalchemy import Integer, ForeignKey
from web3.auto import w3
from eth_account.messages import defunct_hash_message

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, set_access_cookies
from flask_cors import CORS
from ethhelper import *

import random
import string

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='/static')
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": "GET, PUT, POST, DELETE",
        "allow_headers": "*"
    }
})
app.jinja_env.add_extension('jinja2.ext.do')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'


# Setup the Flask-JWT-Extended extension
# log2(26^22) ~= 100 (pull at least 100 bits of entropy)
app.config['JWT_SECRET_KEY'] = ''.join(random.choice(string.ascii_lowercase) for i in range(22))
# app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# app.config['JWT_COOKIE_SECURE'] = True
# app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
# app.config['JWT_COOKIE_CSRF_PROTECT'] = True
db = SQLAlchemy(app)
jwt = JWTManager(app)


@app.before_first_request
def setup():
    print("[+] running setup")
    try:
        db.create_all()
        print("[+] created users db")
    except:
        print("[+] users db already exists")


def generate_nonce(self, length=8):
    return ''.join([str(random.randint(0, 9)) for i in range(length)])


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_address = db.Column(db.String(80), nullable=False, unique=True)
    nonce = db.Column(db.Integer(), nullable=False, default=generate_nonce, )



def get_user(public_address):
    user: User = User.query.filter_by(public_address=public_address).first()
    return user


class Dataset(db.Model):
    __tablename__ = "dataset"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    data_schema = db.Column(db.String(254))
    user_id = db.Column(Integer, ForeignKey('user.id'))


@app.route('/')
def landing():
    return render_template("index.html")


@app.route('/secret')
@jwt_required()
def secret():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/dataset', methods=['POST'])
@jwt_required()
def create_dataset():
    public_address = get_jwt_identity()
    user:User = get_user(public_address)

    name = request.form.get("name")
    data_schema = request.form.get("data_schema")
    print(public_address)
    print(user.nonce)

    dataset = Dataset(name=name, data_schema=data_schema, user_id=user.id)
    db.session.add(dataset)
    db.session.commit()
    db.session.refresh(dataset)

    return jsonify(dataset=name), 200


@app.route('/login', methods=['POST'])
def login():
    print("[+] creating session")

    print("info: " + (str(request.json)))

    public_address = request.json[0]
    signature = request.json[1]

    domain = os.getenv('DOMAIN')

    rightnow = int(time.time())
    sortanow = rightnow - rightnow % 600

    original_message = 'Signing in to {} at {}'.format(domain, sortanow)
    print("[+] checking: " + original_message)
    message_hash = defunct_hash_message(text=original_message)
    signer = w3.eth.account.recoverHash(message_hash, signature=signature)
    print("[+] fascinating")

    if signer == public_address:
        print("[+] this is fine " + str(signer))
        user:User = get_user(public_address)
        if user:
            print("[+] Found user " + user.public_address)
        else:
            user = User(public_address=public_address)
            db.session.add(user)
            db.session.commit()
            db.session.refresh(user)
    else:
        abort(401, 'could not authenticate signature')

    access_token = create_access_token(identity=public_address)

    resp = jsonify(access_token=access_token)
    # print(resp)
    # set_access_cookies(resp, access_token)
    return resp, 200
