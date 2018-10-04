import sys
import pytest
import time
import os
import json
import random

from server.forTests import run
from threading import Thread, Event

def getRandomUSNList():
    USNList = [random.randint(0,100) for e in range(0,10)]
    random.shuffle(USNList)
    return USNList

@pytest.mark.skipif(sys.platform == 'darwin', reason="does not run on osx yet")
def test_basic():
    # Create a bunch of random USNs
    # Assume question is 1 only
    # Assume all codes are the same.
    # Make requests to sendCode() in run
    # Do t.result_queue.get() to get all results.
    # Convert result to dictionary with json.loads()
    # Verify whether 'Code recieved for USN:usn-X question:qY for lang:Z'
    # Then verify whether we get correct output.
    USNList = getRandomUSNList()
    inputCodeFilePath = os.getcwd()+"/tests/SC/myapp.cpp"
    progLang = "C++"
    questionHash = "q1"

    threadList = []

    for i in range(0,10):
        threadList.append(run.sendCode(
            usn = "usn-"+str(USNList[i]),
            inputCodeFilePath = inputCodeFilePath,
            progLang = progLang,
            questionHash = questionHash)
        )

    for i, t in enumerate(threadList):
        res = json.loads(t.result_queue.get())
        assert(("Code recieved for USN:usn-"+str(USNList[i])+" question:q"+str(1)+" for lang:"+"C++") == res["output"]["output"])

