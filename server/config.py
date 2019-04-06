import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    TEMPLATES_AUTO_RELOAD=True
    
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or \
        "sqlite:///" + os.path.join(basedir, "TitaniumSilver.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    SECRET_KEY = "somesecretkeyhereplease"
    
    JWT_SECRET_KEY = "somesecretkeyhereplease"
    JWT_BLACKLIST_ENABLED=True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access","refresh"]

    CODE_FOLDER = os.getcwd()+"/server/flaskr/codes"
    INPUT_FOLDER = os.getcwd()+"/server/flaskr/codes/Input"
    OUTPUT_FOLDER = os.getcwd()+"/server/flaskr/codes/Output"
    TEST_CASES_FOLDER = os.getcwd()+"/server/flaskr/codes/TestCases"
    EXPECTED_OUTPUTS_FOLDER = os.getcwd()+"/server/flaskr/codes/ExpectedOutputs"


class TestingConfig(Config):
    TESTING = True
