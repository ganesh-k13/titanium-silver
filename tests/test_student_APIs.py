import pytest
import pytest_flask
import json
from server.flaskr import app
from server.flaskr import db

globalData = {
    "studentRegistration" : {
        "acctType":"Student",
        "ID":"01FB15PPS456",
        "name":"Pytest Student 1",
        "detailType":"semester",
        "detailValue":"6th",
        "username":"pyteststudent123@students.com",
        "password":"pyteststudent123"
    },
    "studentLogin" : {
        "acctType":"Student",
        "username":"pyteststudent123@students.com",
        "password":"pyteststudent123",
    },
    "accessToken" : ""
}

class TestRegistrations:

    def testStudent(self, client):
        db.create_all()
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*"
        }

        data = globalData["studentRegistration"]

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

        data = globalData["studentLogin"]

        url = "/api/login"

        response = client.post(url, data=json.dumps(data), headers=headers)

        assert response.status_code == 200
        assert response.content_type == "application/json"
        assert "success" in response.json

        # Get Student Details
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*",
            "Authorization":"Bearer {0}".format(globalData["accessToken"])
        }

        url = "/api/getstudentdetails"

        response = client.get(url,headers=headers)

        assert response.status_code == 200
        assert response.json["ID"] == globalData["studentRegistration"]["ID"]
        assert response.json["name"] == globalData["studentRegistration"]["name"]
        assert response.json["username"] == globalData["studentRegistration"]["username"]
        assert response.json["semester"] == globalData["studentRegistration"]["detailValue"]

        # Submit Code
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json, text/plain, */*",
            "Authorization":"Bearer {0}".format(globalData["accessToken"])
        }

        url = "/api/getstudentdetails"