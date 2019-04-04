import os
from flask import request, abort, make_response, jsonify
import random
from titanium_silver.docker_client import Docker_Client
from server.flaskr import app

EXTENSIONS = {
    "C++":"cpp",
    "Python":"py",
    "Python3":"py",
    "C":"c",
    "Ruby":"rb",
    "PHP5.x":"php",
    "PHP7.x":"php",
    "Java":"java"
}

def uploadCode(inputJson):
    # Create a filename: 
    # inpFileName = 
    #    USN_of_user + _ + questionHash + "." + extension_of_user_code
    # Eg: USN:usn-11, questionHash = 1, progLang = cpp gives :
    # inpFileName = usn-11_1.cpp
    file_name = inputJson['USN']+"_"+inputJson['questionHash']
    inpFileName = os.path.join(
        app.config["INPUT_FOLDER"],
        file_name+"."+EXTENSIONS[inputJson["progLang"]]
    )

    # Open the file in 'w' mode to either overwrite previous
    # submission or create a new file for new submission.
    with open(inpFileName,"w") as inputFp:
        inputFp.write(inputJson['code']) # Write incoming 'code' string into the file.
        inputFp.close()
          
    # ------------------------------------------------------
    # Add lines of code here to communicate with docker code
    # and then read the OP file. Not syncing here will 
    # cause major discrepancies.
    # ------------------------------------------------------
    
	# [TODO]: Ganesh
    # 1. Send lang to dcli
    # 2. For each testcase, run in loop
    # 3. Process output per testcase to give boolean pass or fail

    # [TODO]: RAHUL
    # Query to get TC input and output file name in two list variables(one question multiple TC).
    # path must be relative to INPUT_FOLDER.
    # For example, if INPUT_FOLDER is '/server/flaskr/codes/Input' and TC is like: 
    # input: /server/flaskr/codes/Input/TC_IN/q1_1.in, q1_2.in and output: /server/flaskr/codes/Input/TC_OUT/q1_1.out, q1_2.out
	# Variables must be: tc_in = [TC_IN/q1_1.in, TC_IN/q1_2.in] and tc_out = [/TC_OUT/q1_1.out, /TC_OUT/q1_2.out]

    random.seed(inputJson['USN'])
    dcli = Docker_Client()
    thread = dcli.spawn_process(name=file_name, num=random.randint(1, 99999999), params='%s 5000'%inputJson['USN'], path=app.config["INPUT_FOLDER"])
    # Create a filename: 
    # opFileName = 
    #    "op" + _ + USN_of_user + _ + questionHash

    opFileName = os.path.join(
        app.config["OUTPUT_FOLDER"],
        "op"+"_"+inputJson['USN']+"_"+inputJson['questionHash']
    )

    with open(opFileName, 'w') as f:
        output = thread.result_queue.get().decode('utf-8') 
        f.write(output)
    
    #codeOutput should be a dictionary.
    codeOutput = {"output":output}

    return codeOutput


