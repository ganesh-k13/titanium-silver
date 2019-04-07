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


def insertIntoChallenge(ID,teacherID,status,timeLimitHrs,timeLimitMins):
    newChallenge = models.Challenge(
        ID=ID,
        teacherID=teacherID,
        status=status,
        timeLimitHrs=timeLimitHrs,
        timeLimitMins=timeLimitMins
    )

    db.session.add(newChallenge)
    db.session.commit()

def insertIntoQuestion(ID,name,CPU,memory):
    newQuestion = models.Question(
        ID=ID,
        name=name,
        CPU=CPU,
        memory=memory
    )

    db.session.add(newQuestion)
    db.session.commit()


def insertIntoTestCase(ID,testCasePath,expectedOutputPath):
    newTestCase = models.TestCase(
        ID=ID,
        testCasePath=testCasePath,
        expectedOutputPath=expectedOutputPath
    )

    db.session.add(newTestCase)
    db.session.commit()


def insertIntoChallengeAndQuestion(cID,qID):
    newItem = models.ChallengeAndQuestion(
        cID=cID,
        qID=qID
    )

    db.session.add(newItem)
    db.session.commit()

def insertIntoQuestionAndTestCase(qID,tID):
    newItem = models.QuestionAndTestCase(
        qID=qID,
        tID=tID
    )

    db.session.add(newItem)
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

def getChallengeByChallengeID(ID):
    return db.session.query(models.Challenge).filter_by(ID=ID).first()

def getQuestionByQuestionID(ID):
    return db.session.query(models.Question).filter_by(ID=ID).first()

def getTestCaseByTestCaseID(ID):
    return db.session.query(models.TestCase).filter_by(ID=ID).first()

def getChallengeByTeacherID(ID):
    return db.session.query(models.Challenge).filter_by(teacherID=ID).first()

def getAllChallengesByTeacherID(ID):
    return db.session.query(models.Challenge).filter_by(teacherID=ID).all()

def getTeacherChallengesByUsername(username):
    teacherID = getTeacherByUsername(username).ID
    challengeList = getAllChallengesByTeacherID(teacherID)
    return challengeList

def getAllQuestionsByChallengeID(ID):
    return db.session.query(models.ChallengeAndQuestion).filter_by(cID=ID).all()

def getAllTestCasesByQuestionID(ID):
    return db.session.query(models.QuestionAndTestCase).filter_by(qID=ID).all()

def getChallengeDetailsByID(ID):
    res = {
        "cID":ID,
        "questions":[]
    }
    challenge = getChallengeByChallengeID(ID)
    questionList = getAllQuestionsByChallengeID(ID)

    for question in questionList:
        questionDet = getQuestionByQuestionID(question.qID)
        questionName = questionDet.name
        questionCpu = questionDet.CPU
        questionMemory = questionDet.memory

        testCaseList = getAllTestCasesByQuestionID(question.qID)

        testCases = []
        for testCase in testCaseList:
            testCaseDet = getTestCaseByTestCaseID(testCase.tID)
            testCaseString = ""
            expectedOutputString = ""

            with open(testCaseDet.testCasePath,"r") as fp:
                testCaseString = "".join(fp.readlines())

            with open(testCaseDet.expectedOutputPath,"r") as fp:
                expectedOutputString = "".join(fp.readlines())

            testCases.append((testCaseString,expectedOutputString))

        res["questions"].append({
            "questionName":questionName,
            "cpu":questionCpu,
            "memory":questionMemory,
            "testCases":testCases,
        })

    return res

def setChallengeStatusByID(ID,status):
    challenge = getChallengeByChallengeID(ID)
    challenge.status=status
    db.session.commit()