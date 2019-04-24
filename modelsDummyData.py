from uuid import uuid4
from server.flaskr import db
from server.flaskr.models import models


t1 = models.Teacher(
		ID="01TI15ECS001",
		name="Teacher 1",
		designation="Asst Prof",
		username="teacher1@gmail.com",
		password="password1",
		noOfChallenges=0
	)

s1 = models.Student(
		ID="01FB15ECS104",
		name="Student 1",
		semester="6th",
		username="student1@students.com",
		password="student1",
		noOfChallenges=0
	)

c1uuid = str(uuid4().time)
c1 = models.Challenge(
		ID=c1uuid,
		teacherID="01TI15ECS001",
		status="INACTIVE",
		timeLimitHrs=2,
		timeLimitMins=30
	)

q1uuid = "54321"
q1 = models.Question(
		ID=q1uuid,
		name="This is question 1",
		CPU="2GHz",
		memory="1000MB"
	)

q2uuid = str(uuid4().time)
q2 = models.Question(
		ID=q2uuid,
		name="This is question 2",
		CPU="1GHz",
		memory="100MB"
	)

q3uuid = str(uuid4().time)
q3 = models.Question(
		ID=q3uuid,
		name="This is question 3",
		CPU="1.5GHz",
		memory="300MB"
	)


t1_1uuid = "1234567"
t1_1 = models.TestCase(
		ID=t1_1uuid,
		testCasePath="TestCases/t1",
		expectedOutputPath="ExpectedOutputs/t1e"
	)

t1_2uuid = "12345678"
t1_2 = models.TestCase(
		ID=t1_2uuid,
		testCasePath="TestCases/t2",
		expectedOutputPath="ExpectedOutputs/t2e"
	)

t1_3uuid = "12345679"
t1_3 = models.TestCase(
		ID=t1_3uuid,
		testCasePath="TestCases/t3",
		expectedOutputPath="ExpectedOutputs/t3e"
	)


t2uuid = str(uuid4().time)
t2 = models.TestCase(
		ID=t2uuid,
		testCasePath="TestCases/t2",
		expectedOutputPath="ExpectedOutputs/t2e"
	)

t3uuid = str(uuid4().time)
t3 = models.TestCase(
		ID=t3uuid,
		testCasePath="TestCases/t3",
		expectedOutputPath="ExpectedOutputs/t3e"
	)

t4uuid = str(uuid4().time)
t4 = models.TestCase(
		ID=t4uuid,
		testCasePath="TestCases/t4",
		expectedOutputPath="ExpectedOutputs/t4e"
	)

t5uuid = str(uuid4().time)
t5 = models.TestCase(
		ID=t5uuid,
		testCasePath="TestCases/t5",
		expectedOutputPath="ExpectedOutputs/t5e"
	)

t6uuid = str(uuid4().time)
t6 = models.TestCase(
		ID=t6uuid,
		testCasePath="TestCases/t6",
		expectedOutputPath="ExpectedOutputs/t6e"
	)


cq1 = models.ChallengeAndQuestion(
		cID=c1uuid,
		qID=q1uuid
	)

cs1 = models.ChallengeAndStudent(
		cID=c1uuid,
		sID="01FB15ECS444"
	)

cq2 = models.ChallengeAndQuestion(
		cID=c1uuid,
		qID=q2uuid
	)

cq3 = models.ChallengeAndQuestion(
		cID=c1uuid,
		qID=q3uuid
	)

qt1_1 = models.QuestionAndTestCase(
		qID=q1uuid,
		tID=t1_1uuid
	)

qt1_2 = models.QuestionAndTestCase(
		qID=q1uuid,
		tID=t1_2uuid
	)


qt1_3 = models.QuestionAndTestCase(
		qID=q1uuid,
		tID=t1_3uuid
	)

qt2 = models.QuestionAndTestCase(
		qID=q1uuid,
		tID=t2uuid
	)

qt3 = models.QuestionAndTestCase(
		qID=q2uuid,
		tID=t3uuid
	)

qt4 = models.QuestionAndTestCase(
		qID=q2uuid,
		tID=t4uuid
	)

qt5 = models.QuestionAndTestCase(
		qID=q2uuid,
		tID=t5uuid
	)

qt6 = models.QuestionAndTestCase(
		qID=q1uuid,
		tID=t6uuid
	)

sub1 = models.Submission(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q1uuid,
		codeFilePath="./codes/Input/01FB15ECS444",
		status="Compile:Pass"
	)

sub2 = models.Submission(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q2uuid,
		codeFilePath="./codes/Input/01FB15ECS444",
		status="Compile:Fail"
	)

sub3 = models.Submission(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q3uuid,
		codeFilePath="./codes/Input/01FB15ECS444",
		status="Compile:Pass"
	)

subRes1 = models.SubmissionResult(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q1uuid,
		tID=t1_1uuid,
		testPass=0
	)

subRes2 = models.SubmissionResult(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q1uuid,
		tID=t2uuid,
		testPass=1
	)

subRes3 = models.SubmissionResult(
		sID="01FB15ECS444",
		cID=c1uuid,
		qID=q3uuid,
		tID=t6uuid,
		testPass=1
	)

db.create_all()
db.session.add(t1)
db.session.add(s1)
db.session.add(c1)
db.session.add(q1)
db.session.add(q2)
db.session.add(q3)
db.session.add(t1_1)
db.session.add(t1_2)
db.session.add(t1_3)
db.session.add(t2)
db.session.add(t3)
db.session.add(t4)
db.session.add(t5)
db.session.add(t6)
db.session.add(cq1)
db.session.add(cs1)
db.session.add(cq2)
db.session.add(cq3)
db.session.add(qt1_1)
db.session.add(qt1_2)
db.session.add(qt1_3)
db.session.add(qt2)
db.session.add(qt3)
db.session.add(qt4)
db.session.add(qt5)
db.session.add(qt6)
db.session.add(sub1)
db.session.add(sub2)
db.session.add(sub3)
db.session.add(subRes1)
db.session.add(subRes2)
db.session.add(subRes3)

db.session.commit()
