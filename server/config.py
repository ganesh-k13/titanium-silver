import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    pass

class DevelopmentConfig(Config):
    DEVELOPMENT = False
    DEBUG = True
    TEMPLATES_AUTO_RELOAD=True
    
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or \
        "sqlite:///" + os.path.join(basedir, "TitaniumSilver.db")
        # "mysql+pymysql://root:RahulRB@1997@localhost/TitaniumSilver"  # mysql+pymysql://user:password@host
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    SECRET_KEY = "somesecretkeyhereplease"
    
    JWT_SECRET_KEY = "somesecretkeyhereplease"
    JWT_BLACKLIST_ENABLED=True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access","refresh"]

    ROOT_FOLDER = os.getcwd()
    ZIP_FOLDER = os.getcwd()+"/server/flaskr/zips/"
    TMP_FOLDER = os.getcwd()+"/server/flaskr/tmp/"
    CODE_FOLDER = os.getcwd()+"/server/flaskr/codes"
    INPUT_FOLDER = os.getcwd()+"/server/flaskr/codes/Input"
    OUTPUT_FOLDER = os.getcwd()+"/server/flaskr/codes/Output"
    TEST_CASES_FOLDER = os.getcwd()+"/server/flaskr/codes/TestCases"
    EXPECTED_OUTPUTS_FOLDER = os.getcwd()+"/server/flaskr/codes/ExpectedOutputs"

    # CODE_FOLDER = "./codes"
    # INPUT_FOLDER = "./codes/Input"
    # OUTPUT_FOLDER = "./codes/Output"
    # TEST_CASES_FOLDER = "./codes/TestCases"
    # EXPECTED_OUTPUTS_FOLDER = "./codes/ExpectedOutputs"

    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or "titaniumsilverbot@gmail.com"
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD') or "elioigqqqdmsjefp"

class TestingConfig(Config):
    TESTING = True
