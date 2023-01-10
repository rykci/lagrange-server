from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__, static_url_path='/static')
app.config.from_object("config.Config")
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": "GET, PUT, POST, DELETE",
        "allow_headers": "*"
    }
})
app.jinja_env.add_extension('jinja2.ext.do')
jwt = JWTManager(app)
db = SQLAlchemy(app)

from backend.dataset.views import dataset_bp
from backend.auth.views import auth_bp


app.register_blueprint(dataset_bp)
app.register_blueprint(auth_bp)
