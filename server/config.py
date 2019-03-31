import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    PRODUCTION = True
    DEBUG = False
    INPUT_FOLDER = os.getcwd()+'/server/flaskr/codes/Input'

    OUTPUT_FOLDER = os.getcwd()+'/server/flaskr/codes/Output'
    
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'TitaniumSilver.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TEMPLATES_AUTO_RELOAD=True
    INPUT_FOLDER = os.getcwd()+'/server/flaskr/codes/Input'
    HOST='0.0.0.0'

    OUTPUT_FOLDER = os.getcwd()+'/server/flaskr/codes/Output'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'TitaniumSilver.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestingConfig(Config):
    TESTING = True
