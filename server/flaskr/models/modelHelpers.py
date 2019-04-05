from server.flaskr import db
from server.flaskr.models import models

def insertIntoStudent(ID,name,semester,username,password):
    newStudent = models.Student(
        ID=ID,
        name=name,
        semester=semester,
        username = username,
        password = password,
        noOfChallenges=0
    )
    db.session.add(newStudent)
    db.session.commit()

def insertIntoTeacher(ID,name,designation,username,password):
    newTeacher = models.Teacher(
        ID=ID,
        name=name,
        designation=designation,
        username = username,
        password = password,
        noOfChallenges=0
    )
    db.session.add(newTeacher)
    db.session.commit()

def insertIntoRevokedTokens(JTI):
    newToken = models.RevokedTokens(
        JTI=JTI
    )

    db.session.add(newToken)
    db.session.commit()

def isExistingStudentByID(ID):
    return not db.session.query(models.Student).filter_by(ID=ID).first()==None

def isExistingTeacherByID(ID):
    return not db.session.query(models.Teacher).filter_by(ID=ID).first()==None

def isExistingStudentByUsername(username):
    return not db.session.query(models.Student).filter_by(username=username).first()==None

def isExistingTeacherByUsername(username):
    return not db.session.query(models.Teacher).filter_by(username=username).first()==None

def getStudentByUsername(username):
    return db.session.query(models.Student).filter_by(username=username).first()

def getTeacherByUsername(username):
    return db.session.query(models.Teacher).filter_by(username=username).first()

def isJTIBlackListed(JTI):
    return not db.session.query(models.RevokedTokens).filter_by(JTI = JTI).first() == None

def getRevokedTokenByJTI(JTI):
    return db.session.query(models.RevokedTokens).filter_by(JTI=JTI).first()
