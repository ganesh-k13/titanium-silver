from flask import Flask
import sys
import server.config as config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(config.DevelopmentConfig)

jwt = JWTManager(app)
api = Api(app)
CORS(app)
db = SQLAlchemy(app)


from server.flaskr.views import views 
from server.flaskr.models import models
from server.flaskr.API import resources

api.add_resource(resources.UserRegistration, "/api/registration")
api.add_resource(resources.UserLogin, "/api/login")
api.add_resource(resources.UserLogoutAccess, "/api/logout/access")
api.add_resource(resources.UserLogoutRefresh, "/api/logout/refresh")
api.add_resource(resources.TokenRefresh, "/api/token/refresh")
api.add_resource(resources.SecretResource, "/api/secret")


from server.flaskr.models import modelHelpers
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    JTI = decrypted_token['jti']

    return modelHelpers.isJTIBlackListed(JTI)