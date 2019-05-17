from server.flaskr import db
from server.config import DevelopmentConfig
import sqlalchemy

engine = sqlalchemy.create_engine("mysql+pymysql://root:@127.0.0.1") # mysql+pymysql://user:password@host
engine.execute("CREATE DATABASE TitaniumSilver") #create db

db.create_all()