from flask import Flask
import sys
import server.config as config

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)

from server.flaskr import apiServer 
from server.flaskr import views 