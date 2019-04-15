import sys
import pytest
from server.flaskr import app as flaskApp

@pytest.fixture
def app():
    # app = create_app("development")
    flaskApp.debug = True
    return flaskApp
