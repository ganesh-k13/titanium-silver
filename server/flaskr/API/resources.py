from flask_restful import Resource,reqparse
from server.flaskr.models import modelHelpers
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, get_jwt_claims

parser = reqparse.RequestParser()
parser.add_argument("acctType")
parser.add_argument("ID")
parser.add_argument("name")
parser.add_argument("detailType")
parser.add_argument("detailValue")
parser.add_argument("username", help = "This field cannot be blank", required = True)
parser.add_argument("password", help = "This field cannot be blank", required = True)

class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()

        if(data["acctType"]=="Student"):
            if(modelHelpers.isExistingStudentByID(data["ID"])):
                return {"message":"User already exists, please login in login page"}

            else:
                # try:
                modelHelpers.insertIntoStudent(
                    ID=data["ID"],
                    name=data["name"],
                    semester=data["detailValue"],
                    username = data["username"],
                    password = data["password"]
                )
                print("here")
                accessToken = create_access_token(identity = data["username"])
                refreshToken = create_refresh_token(identity = data["username"])
                return {
                    "success": "Student {} was created".format(data["username"]),
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                }
                
                # except:
                #     return {"error": "Something went wrong"}, 500

        else:
            if(modelHelpers.isExistingTeacherByID(data["ID"])):
                return {"message":"User already exists, please login in login page"}

            else:
                try:
                    modelHelpers.insertIntoTeacher(
                        ID=data["ID"],
                        name=data["name"],
                        designation=data["detailValue"],
                        username = data["username"],
                        password = data["password"]
                    )
                    return {
                        "success": "Teacher {} was created".format(data["username"])
                    }
                except:
                    return {"error": "Something went wrong"}, 500


class UserLogin(Resource):
    def post(self):        
        data = parser.parse_args()

        if(data["acctType"]=="Student"):
            currentUser = modelHelpers.isExistingStudentByUsername(data["username"])
        else:
            currentUser = modelHelpers.isExistingTeacherByUsername(data["username"])

        if not currentUser:
            return {"error": "User {} doesn't exist".format(data["username"])}
        
        currentUser = modelHelpers.getStudentByUsername(data["username"])

        if data["password"] == currentUser.password:
            accessToken = create_access_token(identity = data["username"])
            refreshToken = create_refresh_token(identity = data["username"])

            return {
                "success": "Logged in as {}".format(currentUser.username),
                "accessToken": accessToken,
                "refreshToken": refreshToken
            }

        else:
            return {"error": "Wrong credentials"},500

class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        JTI = get_raw_jwt()["jti"]
        try:
            revokedToken = modelHelpers.insertIntoRevokedTokens(JTI = JTI)
            return {"message": "Access token has been revoked"}
        except:
            return {"message": "Something went wrong"}, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        JTI = get_raw_jwt()["jti"]
        try:
            revokedToken = modelHelpers.insertIntoRevokedTokens(JTI = JTI)
            return {"message": "Refresh token has been revoked"}
        except:
            return {"message": "Something went wrong"}, 500

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        currentUser = get_jwt_identity()
        accessToken = create_access_token(identity = currentUser)
        return {"access_token": accessToken}
      

# This class will represent all hidden routes
class SecretResource(Resource):
    @jwt_required
    def get(self):
        claims = get_jwt_claims()
        return {
            "username": claims["username"]
        }, 200