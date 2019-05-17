#!/bin/bash

VENV="./titanium-silver-venv"

echo "----Creating Python3 Virtual Environment----"
python3 -m venv "titanium-silver-venv"
. "${VENV}/bin/activate"

echo "----Entering Virtual Environment----"
bash --rcfile "${VENV}/bin/activate" -ci "
	echo \"----Installing requirements via pip----\"
	python3 -m pip install -r requirements.txt

	echo \"----Linking frontend static and template files----\"
	cd ./server/flaskr
	ln -s ../../frontend/production/static static
	ln -s ../../frontend/production templates

	echo \"----Creating Databases----\"
	cd ../../
	python3 dbCreator.py

	echo \"\"
	echo \"\"
	echo \"\"
	echo \"----------------------------------------------------------------------------------------\"
	echo \"Look at ./sample-questions.zip for some examples of how to form questions and test cases\"
	echo \"----------------------------------------------------------------------------------------\"
	echo \"\"
	echo \"\"
	echo \"\"

	echo \"----Starting Gunicorn Processes---\"
	gunicorn --bind 0.0.0.0:8000 --workers=4 run:app
"