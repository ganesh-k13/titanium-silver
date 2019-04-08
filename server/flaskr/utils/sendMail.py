from server.flaskr import mail
from flask_mail import Message

MSG_BODY = "\
    Hi!\n\
\n\
    You have a challenge starting now.\n\
    Use this challenge ID to enter it.\n\
    ID: {0}\n\
\n\
    Good luck and cheers!\n\
    Titanium Silver Bot\n\
\n\
    Note: This mail was autogenrated by Titanium Siver Bot. Any issues please contact rahulbharadwaj033@gmail.com\n\
"

def sendMail(recipients,ID):
    msg = Message(
                    subject="Challenge started, key in mail",
                    sender="titaniumsilverbot@gmail.com",
                    recipients=recipients
                )

    msg.body = MSG_BODY.format(ID)

    mail.send(msg)