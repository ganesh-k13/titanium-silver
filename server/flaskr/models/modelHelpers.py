from server.flaskr import db
from server.flaskr.models import models
import pdb

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

def insertIntoSubmission(sID,cID,qID,codeFilePath,compilePass,progLang):
    newSubmission = models.Submission(
        sID=sID,
        cID=cID,
        qID=qID,
        codeFilePath=codeFilePath,
        compilePass=compilePass,
        progLang=progLang
    )
    db.session.add(newSubmission)
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
    if not challenge: # challenge ID is invalid
        return {"res":"Invalid","code":500}

    if challenge.status=="INACTIVE":
        return {"res":"Challenge not started yet","code":500}

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
            "questionID":question.qID,
            "questionName":questionName,
            "cpu":questionCpu,
            "memory":questionMemory,
            "testCases":testCases,
        })

    return {"res":res,"code":200}

def setChallengeStatusByID(ID,status):
    challenge = getChallengeByChallengeID(ID)
    challenge.status=status
    db.session.commit()

def getTestcasesByQID(ID):
    # pdb.set_trace()
    tids = db.session.query(models.QuestionAndTestCase).filter_by(qID=ID).all()
    testcases_list = list()
    for tid in tids:
        testcase = db.session.query(models.TestCase).filter_by(ID=tid.tID).first()
        testcases_list.append({'in': testcase.testCasePath,'out': testcase.expectedOutputPath})
    return testcases_list

def isExistingSubmission(sID,cID,qID):
    return not db.session.query(models.Submission).filter_by(sID=sID,cID=cID,qID=qID).first()==None

def getSubmissionDetailsByIDs(sID,cID,qID):
    return db.session.query(models.Submission).filter_by(sID=sID,cID=cID,qID=qID).first()

def updateSubmissionCompileStatus(sID,cID,qID,compilePass):
    submission = getSubmissionDetailsByIDs(sID,cID,qID)
    submission.compilePass = compilePass
    db.session.commit()

def insertIntoSubmissionResult(sID,cID,qID,tID,testPass):
    newSubmission = models.SubmissionResult(
        sID=sID,
        cID=cID,
        qID=qID,
        tID=tID,
        testPass=testPass
    )
    db.session.add(newSubmission)
    db.session.commit()

def isExistingSubmissionResult(sID,cID,qID,tID):
    return not db.session.query(models.SubmissionResult).filter_by(sID=sID,cID=cID,qID=qID,tID=tID).first()==None

def getSubmissionResultDetailsByIDs(sID,cID,qID,tID):
    return db.session.query(models.SubmissionResult).filter_by(sID=sID,cID=cID,qID=qID,tID=tID).first()

def updateTestPassSubmissionResult(sID,cID,qID,tID,testPass):
    submissionRes = getSubmissionResultDetailsByIDs(sID,cID,qID,tID)
    submissionRes.testPass = testPass
    db.session.commit()

def getQuestionLanguagesByQID(qID):
    return db.session.query(models.QuestionAndLanguage).filter_by(qID=qID).first()

def getChallengeQuestionByCID(ID):
    res = {
        "cID":ID,
        "questions":[]
    }
    challenge = getChallengeByChallengeID(ID)
    if not challenge: # challenge ID is invalid
        return {"res":"Invalid","code":500}
    if challenge.status=="INACTIVE":
        return {"res":"Challenge not started yet","code":500}

    questionList = getAllQuestionsByChallengeID(ID)

    for question in questionList:
        questionDet = getQuestionByQuestionID(question.qID)
        questionName = questionDet.name
        questionCpu = questionDet.CPU
        questionMemory = questionDet.memory

        questionLang = getQuestionLanguagesByQID(question.qID)

        res["questions"].append({
            "questionID":question.qID,
            "questionName":questionName,
            "cpu":questionCpu,
            "memory":questionMemory,
            "C":questionLang.C,
            "CPP":questionLang.CPP,
            "Python":questionLang.Python,
            "Python3":questionLang.Python3,
            "Ruby":questionLang.Ruby,
            "PHP5x":questionLang.PHP5x,
            "PHP7x":questionLang.PHP7x,
            "Java":questionLang.Java,
        })

    return {"res":res,"code":200}


def insertIntoQuestionAndLanguage(
        qID,
        C,
        CPP,
        Python,
        Python3,
        Ruby,
        PHP5x,
        PHP7x,
        Java
    ):
    newItem = models.QuestionAndLanguage(
        qID=qID,
        C=C,
        CPP=CPP,
        Python=Python,
        Python3=Python3,
        Ruby=Ruby,
        PHP5x=PHP5x,
        PHP7x=PHP7x,
        Java=Java
    )
    db.session.add(newItem)
    db.session.commit()

def updateSubmissionProgLang(sID,cID,qID,progLang):
    submission = getSubmissionDetailsByIDs(sID,cID,qID)
    submission.progLang = progLang

    db.session.commit()

def getSubmissionLanguageCountByCID(cID):
    from sqlalchemy import func
    from sqlalchemy.sql import text
    return db.session.query(models.Submission,func.count(models.Submission.progLang).label("langCount")).filter_by(cID=cID).group_by(models.Submission.progLang).order_by(text("langCount DESC")).all()

def insertIntoChallengeAndStudent(cID,sID):
    item = models.ChallengeAndStudent(
                cID=cID,
                sID=sID
           )
    db.session.add(item)
    db.session.commit()

def isExistingChallengeAndStudent(cID,sID):
    return not db.session.query(models.ChallengeAndStudent).filter_by(cID=cID,sID=sID).first()==None

def getAllChallengeAndStudentByCID(cID):
    return db.session.query(models.ChallengeAndStudent).filter_by(cID=cID).all()

def getStudentRanksByCID(cID):
    from sqlalchemy import func
    from sqlalchemy.sql import text
    return db.session.query(models.SubmissionResult,func.count(models.SubmissionResult.sID).label("student")).filter_by(cID=cID).group_by(models.SubmissionResult.sID).order_by(text("student DESC")).all()

def getStudentByID(ID):
    return db.session.query(models.Student).filter_by(ID=ID).first()