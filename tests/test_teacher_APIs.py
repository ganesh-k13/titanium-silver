import pytest
import pytest_flask
import json
from server.flaskr import app
from server.flaskr import db

globalData = {
    "teacherRegistration" : {
        "acctType":"Teacher",
        "ID":"01FB15PPT456",
        "name":"Pytest Teacher 1",
        "detailType":"designation",
        "detailValue":"Prof",
        "username":"teacher123@teachers.com",
        "password":"teacher123"
    },
    "teacherLogin" : {
        "acctType":"Teacher",
        "username":"teacher123@teachers.com",
        "password":"teacher123",
    },
    "accessToken" : ""
}

class TestRegistrations:

    def testTeacher(self, client):
        db.create_all()
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*"
        }

        data = globalData["teacherRegistration"]

        url = "/api/registration"

        response = client.post(url, data=json.dumps(data), headers=headers)

        assert response.status_code == 200
        assert response.content_type == "application/json"
        assert "success" in response.json
        assert "accessToken" in response.json

        globalData["accessToken"]=response.json["accessToken"]

        # Login Tests

        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*"
        }

        data = globalData["teacherLogin"]

        url = "/api/login"

        response = client.post(url, data=json.dumps(data), headers=headers)

        assert response.status_code == 200
        assert response.content_type == "application/json"
        assert "success" in response.json

        # Get Teacher Details
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*",
            "Authorization":"Bearer {0}".format(globalData["accessToken"])
        }

        url = "/api/getteacherdetails"

        response = client.get(url,headers=headers)

        assert response.status_code == 200
        assert response.json["ID"] == globalData["teacherRegistration"]["ID"]
        assert response.json["name"] == globalData["teacherRegistration"]["name"]
        assert response.json["username"] == globalData["teacherRegistration"]["username"]
        assert response.json["designation"] == globalData["teacherRegistration"]["detailValue"]

        # Get Teacher Challenges
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*",
            "Authorization":"Bearer {0}".format(globalData["accessToken"])
        }

        url = "/api/getteacherchallenges"

        response = client.get(url,headers=headers)

        assert response.status_code == 200
        assert "challenges" in response.json
