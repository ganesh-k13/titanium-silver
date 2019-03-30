from flask import Flask
import sys
import server.config as config
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)

db = SQLAlchemy(app)

from server.flaskr import apiServer 
from server.flaskr import views 

from server.flaskr.models import models