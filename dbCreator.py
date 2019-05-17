from server.flaskr import db
from server.config import DevelopmentConfig
import sqlalchemy

engine = sqlalchemy.create_engine("mysql+pymysql://root:RahulRB@1997@localhost") # mysql+pymysql://user:password@host
engine.execute("CREATE DATABASE TitaniumSilver") #create db

db.create_all()