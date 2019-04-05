from server.flaskr import jwt
from server.flaskr.models import modelHelpers

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    JTI = decrypted_token['jti']

    return modelHelpers.isJTIBlackListed(JTI)

# Using the user_claims_loader, we can specify a method that will be
# called when creating access tokens, and add these claims to the said
# token. This method is passed the identity of who the token is being
# created for, and must return data that is json serializable
@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        "username": identity
    }