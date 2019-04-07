from flask import Flask
import sys
import server.config as config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)
CORS(app)

jwt = JWTManager(app)
api = Api(app)
db = SQLAlchemy(app)


from server.flaskr.views import views 
from server.flaskr.models import models
from server.flaskr.API import resources
from server.flaskr.models import modelHelpers
from server.flaskr import initScripts

api.add_resource(resources.UserRegistration, "/api/registration")
api.add_resource(resources.GetStudentDetails, "/api/getstudentdetails")
api.add_resource(resources.GetTeacherDetails, "/api/getteacherdetails")
api.add_resource(resources.GetTeacherChallenges, "/api/getteacherchallenges")
api.add_resource(resources.UserLogin, "/api/login")
api.add_resource(resources.UserLogoutAccess, "/api/logout/access")
api.add_resource(resources.UserLogoutRefresh, "/api/logout/refresh")
api.add_resource(resources.TokenRefresh, "/api/token/refresh")
api.add_resource(resources.UploadCode, "/api/submitcode")
api.add_resource(resources.SetChallenge, "/api/setchallenge")
api.add_resource(resources.StartChallenge, "/api/startchallenge")
api.add_resource(resources.GetChallengeDetails, "/api/getchallengedetails")

