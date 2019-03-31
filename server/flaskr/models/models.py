from datetime import datetime
from server.flaskr import db

class Teacher(db.Model):
    ID = db.Column(db.String(12), primary_key=True) # Teacher TRN 
    name = db.Column(db.String(20))
    designation=db.Column(db.String(20))
    username = db.Column(db.String(20),index=True,unique=True,nullable=False)  # Email for login
    password = db.Column(db.String(10))
    noOfChallenges = db.Column(db.Integer)          # Challenges created
    # challenges = db.relationship("Challenge", backref="teacher", lazy=True)
    
    def __repr__(self):
        return "<Teacher {0},{1},{2},{3},{4},{5}>".format(
                                                self.ID,
                                                self.name,
                                                self.designation,
                                                self.username,
                                                self.password,
                                                self.noOfChallenges)

class Student(db.Model):
    ID = db.Column(db.String(12), primary_key=True)# Student SRN 
    name = db.Column(db.String(20))
    semester = db.Column(db.String(3))
    username = db.Column(db.String(20),index=True,unique=True,nullable=False) # Email for login
    password = db.Column(db.String(10))
    noOfChallenges = db.Column(db.Integer)         # Challenges attended

    def __repr__(self):
        return "<Student {0},{1},{2},{3},{4},{5}>".format(
                                                self.ID,
                                                self.name,
                                                self.semester,
                                                self.username,
                                                self.password,
                                                self.noOfChallenges)

class Challenge(db.Model):
    ID = db.Column(db.String(18), primary_key=True) # generated via uuid4
    teacherID = db.Column(db.String(10),db.ForeignKey("teacher.ID"), index=True)
    status = db.Column(db.String(8))
    timeLimitHrs = db.Column(db.Integer)
    timeLimitMins = db.Column(db.Integer)

    def __repr__(self):
        return "<Challenge {0},{1},{2},{3},{4}>".format(
                                                self.ID,
                                                self.teacherID,
                                                self.status,
                                                self.timeLimitHrs,
                                                self.timeLimitMins)

class Question(db.Model):
    ID = db.Column(db.String(18), primary_key=True)# Question ID # generated via uuid4
    name = db.Column(db.String(20))
    CPU = db.Column(db.String(10))
    memory = db.Column(db.String(10))

    def __repr__(self):
        return "<Question {0},{1},{2},{3}>".format(
                                                self.ID,
                                                self.name,
                                                self.CPU,
                                                self.memory)

class TestCase(db.Model):
    ID = db.Column(db.String(18), primary_key=True)# Test Case ID # generated via uuid4
    testCasePath = db.Column(db.String(20))
    expectedOutputPath = db.Column(db.String(20))

    def __repr__(self):
        return "<TestCase {0},{1},{2}>".format(
                                            self.ID,
                                            self.testCasePath,
                                            self.expectedOutputPath)

class ChallengeAndQuestion(db.Model): # relationship tables
    cID = db.Column(db.String(18), db.ForeignKey("challenge.ID"),primary_key=True)
    qID = db.Column(db.String(18), db.ForeignKey("question.ID"),primary_key=True)

    def __repr__(self):
        return "<ChallengeAndQuestion {0},{1}>".format(
                                            self.cID,
                                            self.qID)

class ChallengeAndStudent(db.Model): # relationship tables
    cID = db.Column(db.String(18), db.ForeignKey("challenge.ID"),primary_key=True)
    sID = db.Column(db.String(18), db.ForeignKey("student.ID"),primary_key=True)

    def __repr__(self):
        return "<ChallengeAndStudent {0},{1}>".format(
                                            self.cID,
                                            self.sID)

class QuestionAndTestCase(db.Model): # relationship tables
    qID = db.Column(db.String(18), db.ForeignKey("question.ID"),primary_key=True)
    tID = db.Column(db.String(18), db.ForeignKey("test_case.ID"),primary_key=True)

    def __repr__(self):
        return "<QuestionAndTestCase {0},{1}>".format(
                                            self.qID,
                                            self.tID)

class Submission(db.Model):
    sID = db.Column(db.String(18), db.ForeignKey("student.ID"),primary_key=True)
    cID = db.Column(db.String(18), db.ForeignKey("challenge.ID"),primary_key=True)
    qID = db.Column(db.String(18), db.ForeignKey("question.ID"),primary_key=True)
    codeFilePath = db.Column(db.String(100))
    status = db.Column(db.String(50)) # One of these -- [Compile:Pass,Compile:Fail]

    def __repr__(self):
        return "<Submission {0},{1},{2},{3},{4}>".format(
                                            self.sID,
                                            self.cID,
                                            self.qID,
                                            self.codeFilePath,
                                            self.status)

class SubmissionResult(db.Model):
    sID = db.Column(db.String(18), db.ForeignKey("student.ID"),primary_key=True)
    cID = db.Column(db.String(18), db.ForeignKey("challenge.ID"),primary_key=True)
    qID = db.Column(db.String(18), db.ForeignKey("question.ID"),primary_key=True)
    tID = db.Column(db.String(18), db.ForeignKey("test_case.ID"),primary_key=True)
    testPass = db.Column(db.Boolean) 

    def __repr__(self):
        return "<Submission {0},{1},{2},{3},{4}>".format(
                                            self.sID,
                                            self.cID,
                                            self.qID,
                                            self.tID,
                                            self.testPass)
