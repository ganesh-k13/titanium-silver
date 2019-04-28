import argparse
import os
from server.flaskr import db
from server.flaskr.models import models
from uuid import uuid4

parser = argparse.ArgumentParser()
parser.add_argument("--dir",
	help="Enter project root directory,\n\
		eg if titanium_silver is in: /home/rahul/, enter /home/rahul/\n\
		If you are already in the project dir, then give ..",
	type=str,
	required=True
)

args = parser.parse_args()

rootDir = os.path.abspath(args.dir)
inputDir = rootDir+"/titanium-silver/server/flaskr/codes/Input/"
outputDir = rootDir+"/titanium-silver/server/flaskr/codes/Output/"
testCaseDir = rootDir+"/titanium-silver/server/flaskr/codes/TestCases/"
expectedOutputDir = rootDir+"/titanium-silver/server/flaskr/codes/ExpectedOutputs/"

teacher_id =  "01TI15ECS001"
t1 = models.Teacher(
		ID=teacher_id,
		name="Teacher 1",
		designation="Asst Prof",
		username="teacher1@teachers.com",
		password="teacher1",
		noOfChallenges=0
	)

student_id = "01FB15ECS104"
s1 = models.Student(
		ID=student_id,
		name="Student 1",
		semester="6th",
		username="student1@students.com",
		password="student1",
		noOfChallenges=0
	)

# c1uuid = str(uuid4().hex)
c1uuid = "c1"
c1 = models.Challenge(
		ID=c1uuid,
		teacherID=teacher_id,
		status="INACTIVE",
		timeLimitHrs=2,
		timeLimitMins=30
	)

# q1uuid = str(uuid4().hex)
q1uuid = "q1"
q1 = models.Question(
		ID=q1uuid,
		name="This is question 1",
		CPU="2GHz",
		memory="128m"
	)

# q2uuid = str(uuid4().hex)
q2uuid = "q2"
q2 = models.Question(
		ID=q2uuid,
		name="This is question 2",
		CPU="1GHz",
		memory="128m"
	)

# q3uuid = str(uuid4().hex)
q3uuid = "q3"
q3 = models.Question(
		ID=q3uuid,
		name="This is question 3",
		CPU="1.5GHz",
		memory="128m"
	)

q1l = models.QuestionAndLanguage(
	    qID=q1uuid,
	    C=True,
	    CPP=False,
	    Python=True,
	    Python3=False,
	    Ruby=True,
	    PHP5x=False,
	    PHP7x=False,
	    Java=False
	)

q2l = models.QuestionAndLanguage(
	    qID=q2uuid,
	    C=False,
	    CPP=True,
	    Python=True,
	    Python3=False,
	    Ruby=False,
	    PHP5x=False,
	    PHP7x=False,
	    Java=False
	)

q3l = models.QuestionAndLanguage(
	    qID=q3uuid,
	    C=False,
	    CPP=False,
	    Python=True,
	    Python3=True,
	    Ruby=False,
	    PHP5x=False,
	    PHP7x=False,
	    Java=True
	)

# t1_1uuid = str(uuid4().hex)
t1_1uuid = "t1_1"
t1_1 = models.TestCase(
		ID=t1_1uuid,
		testCasePath="TestCases/"+t1_1uuid,
		expectedOutputPath="ExpectedOutputs/"+t1_1uuid
	)

# t1_2uuid = str(uuid4().hex)
t1_2uuid = "t1_2"
t1_2 = models.TestCase(
		ID=t1_2uuid,
		testCasePath="TestCases/"+t1_2uuid,
		expectedOutputPath="ExpectedOutputs/"+t1_2uuid
	)

# t1_3uuid = str(uuid4().hex)
t1_3uuid = "t1_3"
t1_3 = models.TestCase(
		ID=t1_3uuid,
		testCasePath="TestCases/"+t1_3uuid,
		expectedOutputPath="ExpectedOutputs/"+t1_3uuid
	)


# t2uuid = str(uuid4().hex)
t2uuid = "t2"
t2 = models.TestCase(
		ID=t2uuid,
		testCasePath="TestCases/"+t2uuid,
		expectedOutputPath="ExpectedOutputs/"+t2uuid
	)

# t3uuid = str(uuid4().hex)
t3uuid = "t3"
t3 = models.TestCase(
		ID=t3uuid,
		testCasePath="TestCases/"+t3uuid,
		expectedOutputPath="ExpectedOutputs/"+t3uuid
	)

# t4uuid = str(uuid4().hex)
t4uuid = "t4"
t4 = models.TestCase(
		ID=t4uuid,
		testCasePath="TestCases/"+t4uuid,
		expectedOutputPath="ExpectedOutputs/"+t4uuid
	)

# t5uuid = str(uuid4().hex)
t5uuid = "t5"
t5 = models.TestCase(
		ID=t5uuid,
		testCasePath="TestCases/"+t5uuid,
		expectedOutputPath="ExpectedOutputs/"+t5uuid
	)

# t6uuid = str(uuid4().hex)
t6uuid = "t6"
t6 = models.TestCase(
		ID=t6uuid,
		testCasePath="TestCases/"+t6uuid,
		expectedOutputPath="ExpectedOutputs/"+t6uuid
	)


cq1 = models.ChallengeAndQuestion(
		cID=c1uuid,
		qID=q1uuid
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
		qID=q3uuid,
		tID=t6uuid
	)

cs1 = models.ChallengeAndStudent(
		cID=c1uuid,
		sID=student_id
	)

sub1 = models.Submission(
		sID=student_id,
		cID=c1uuid,
		qID=q1uuid,
		codeFilePath=inputDir+student_id+"_"+q1uuid+".c",
		compilePass=True
	)

sub2 = models.Submission(
		sID=student_id,
		cID=c1uuid,
		qID=q2uuid,
		codeFilePath=inputDir+student_id+"_"+q2uuid+".cpp",
		compilePass=False
	)

sub3 = models.Submission(
		sID=student_id,
		cID=c1uuid,
		qID=q3uuid,
		codeFilePath=inputDir+student_id+"_"+q3uuid+".py",
		compilePass=True
	)

subRes1 = models.SubmissionResult(
		sID=student_id,
		cID=c1uuid,
		qID=q1uuid,
		tID=t1_1uuid,
		testPass=False
	)

subRes2 = models.SubmissionResult(
		sID=student_id,
		cID=c1uuid,
		qID=q1uuid,
		tID=t2uuid,
		testPass=True
	)

subRes3 = models.SubmissionResult(
		sID=student_id,
		cID=c1uuid,
		qID=q3uuid,
		tID=t6uuid,
		testPass=True
	)

# Make Test case and Expected Output files
t1_1uuid_tc_path = testCaseDir+t1_1uuid
t1_2uuid_tc_path = testCaseDir+t1_2uuid
t1_3uuid_tc_path = testCaseDir+t1_3uuid
t2uuid_tc_path = testCaseDir+t2uuid
t3uuid_tc_path = testCaseDir+t3uuid
t4uuid_tc_path = testCaseDir+t4uuid
t5uuid_tc_path = testCaseDir+t5uuid
t6uuid_tc_path = testCaseDir+t6uuid

with open(t1_1uuid_tc_path,"w") as fp:
	fp.write("t1_1")
with open(t1_2uuid_tc_path,"w") as fp:
	fp.write("t1_2")
with open(t1_3uuid_tc_path,"w") as fp:
	fp.write("t1_3")
with open(t2uuid_tc_path,"w") as fp:
	fp.write("t2")
with open(t3uuid_tc_path,"w") as fp:
	fp.write("t3")
with open(t4uuid_tc_path,"w") as fp:
	fp.write("t4")
with open(t5uuid_tc_path,"w") as fp:
	fp.write("t5")
with open(t6uuid_tc_path,"w") as fp:
	fp.write("t6")

t1_1uuid_ex_path = expectedOutputDir+t1_1uuid
t1_2uuid_ex_path = expectedOutputDir+t1_2uuid
t1_3uuid_ex_path = expectedOutputDir+t1_3uuid
t2uuid_ex_path = expectedOutputDir+t2uuid
t3uuid_ex_path = expectedOutputDir+t3uuid
t4uuid_ex_path = expectedOutputDir+t4uuid
t5uuid_ex_path = expectedOutputDir+t5uuid
t6uuid_ex_path = expectedOutputDir+t6uuid

with open(t1_1uuid_ex_path,"w") as fp:
	fp.write("et1_1")
with open(t1_2uuid_ex_path,"w") as fp:
	fp.write("et1_2")
with open(t1_3uuid_ex_path,"w") as fp:
	fp.write("et1_3")
with open(t2uuid_ex_path,"w") as fp:
	fp.write("et2")
with open(t3uuid_ex_path,"w") as fp:
	fp.write("et3")
with open(t4uuid_ex_path,"w") as fp:
	fp.write("et4")
with open(t5uuid_ex_path,"w") as fp:
	fp.write("et5")
with open(t6uuid_ex_path,"w") as fp:
	fp.write("et6")

# Submission files
p1 = inputDir+student_id+"_"+q1uuid+".c"
p2 = inputDir+student_id+"_"+q2uuid+".cpp"
p3 = inputDir+student_id+"_"+q3uuid+".py"

with open(p1,"w") as fp:
	fp.write("""
#include<stdio.h>
int main(){
	print("%%s\\n","The C file");
}
	""")
	fp.close()

with open(p2,"w") as fp:
	fp.write("""
#include<iostream>
using namespace std;
int main(){
	cout<<"The C++ file";
}
	""")
	fp.close()

with open(p3,"w") as fp:
	fp.write("""
print("The Python file")
	""")
	fp.close()

db.create_all()
db.session.add(t1)
db.session.add(s1)
db.session.add(c1)
db.session.add(q1)
db.session.add(q2)
db.session.add(q3)
db.session.add(q1l)
db.session.add(q2l)
db.session.add(q3l)
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
#db.session.add(sub1)
#db.session.add(sub2)
#db.session.add(sub3)
#db.session.add(subRes1)
#db.session.add(subRes2)
#db.session.add(subRes3)

db.session.commit()
