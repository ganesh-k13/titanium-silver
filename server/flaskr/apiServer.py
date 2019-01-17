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


