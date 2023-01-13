"""Class-based Flask app configuration."""
import os
import random
import string
from os import environ, path

from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


class Config:
    """Configuration from environment variables."""
    # Setup the Flask-JWT-Extended extension
    # log2(26^22) ~= 100 (pull at least 100 bits of entropy)
    JWT_SECRET_KEY = ''.join(random.choice(string.ascii_lowercase) for i in range(22))
    # app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    # app.config['JWT_COOKIE_SECURE'] = True
    # app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
    # app.config['JWT_COOKIE_CSRF_PROTECT'] = True
    MAX_CONTENT_LENGTH = 1024 * 1024 * 100
    UPLOAD_PATH = 'uploads'
    # Static Assets
    STATIC_FOLDER = "static"
    TEMPLATES_FOLDER = "templates"
    COMPRESSOR_DEBUG = True

    # Datadog
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
