## File structure information

- app.py:
	- Is the actual server code.
	- Handles URL to /submitCode , which accepts POST and GET.
	- Further working is defined in the file itself.

- run.py:
	- Supports the interface requested in Issue-1.
	- Returns a JSON having input and output parameters.

- app_file_upload.py:
	- Code written to directly accept files as input.
	- Currently not used. Code kept for unkown future purposes.