# Titanium-Silver

[![Build Status](https://travis-ci.org/ganesh-k13/titanium-silver.svg?branch=master)](https://travis-ci.org/ganesh-k13/titanium-silver) ![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg) [![licensebuttons by-sa](https://licensebuttons.net/l/by-sa/3.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0)


### Description

Titanium-Silver is a python package for automating lab evalution using dockers.

- Built an online judge for source code evaluation where user submits source code and receives results such as execution time, memory usage and number of passed testcases.
- Each user program is run in a docker container with limited memory and processing power. The number of active containers are configurable to guarantee no server crashes. Each container is spawned on a different thread to improve efficiency.
- The server is developed using Flask and deployed using Gunicorn. Nginx is used as reverse proxy. Nginx takes care of load balancing.
- Tests are written using pytest and continuous integration using Travis.
- [Results](https://travis-ci.org/ganesh-k13/titanium-silver "Travis Build Status"):
	- 50 simultaneous requests: 27.18 seconds 
	- 100 simultaneous requests: 50.18 seconds
	- 10 requests with 5 seconds interval, 5 times (Realistic scenario designed and tuned for): 27.64 seconds
	- Above result translates to 0.55 seconds per request with average waiting time for requests being 0.528 seconds.

### Installation

This package requires:
- docker-ce ([Install Guide](https://docs.docker.com/install/))
- python 3

Please verify docker's installation:

```sh
$ sudo docker run hello-world
```

Install Required Packages:

```sh
$ sudo pip3 install -r requirements.txt
```

Install Titanium-Silver:

```sh
$ sudo pip3 install -e . # PWD must be main folder with setup.py
```

### Development:
Steps:
1. Install `nvm` to install `node` and `npm`:
```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
nvm install node
cd <project_root>/frontend
npm install
<in one shell> $ npm run start
<in another shell> $ ./run.sh
```
### Production:

Prerequisites for production
-

- Install MySQL as shown here: https://support.rackspace.com/how-to/installing-mysql-server-on-ubuntu/
- Then go to: `./dbCreator.py`(`line 5`) and `./server/config.py`(`line 17`) and find the line starting from `"mysql+pymysql...."`:
    - Replace `root` with your user (else create a root user in MySQL).
    - Replace `RahulRB@1997` with your password.
    - Replace `locahost` with another host name if DB is on another system.

MySQL is making too much fuss / not so important now?
-
- In this case, comment out `lines 5 and 6` of `./dbCreator.py`
- Uncomment `line 18` in `./server/config.py`.
- Comment `line 17` in `./server/config.py`

Note
-
- If the frontend fails to render, then do this from root of the project:
	- Fix 1:
		1. Open the file `index.html` in `frontend/build`. For each `<script>` tag, add this: `type="text/babel"`
		2. Remove the `<link>` for `manifest.json`
		3. For `favicon.ico` to load do this: 
		    1. Move `favicon.ico` to `build/static`.
		    2. Change `href` of `<link>` to : ```{{url_for("static",filename="./favicon.ico")}}```
    
    - Fix 2: (If Fix 1 fails)
	    - `rm -r titanium-silver-venv`
	    - `rm ./server/TitaniumSilver.db` (if you couldn't install/run/do stuff with MySQL).
	    - Install `nvm` as shown here: https://github.com/nvm-sh/nvm
	    - Restart the shell/open new shell and do: `nvm install node`
	    - Go to `./frontend` and do:
	        - `npm install` (this will take a few minutes)
	        - `npm run build && mv build production`
            - Run `production.sh`. Try doing Fix 1 if UI renders improperly.



### Tests

```sh
$ pytest # Very Intensive, Less verbose
$ # Recommended:
$ sudo pytest tests/test_basic.py
$ sudo pytest tests/test_basic_100.py
$ sudo pytest tests/test_basic_50.py
$ sudo pytest tests/test_server_simulation.py
```

### Usage

Docker module usage:
```
usage: script.py [-h] [-n [NUM]] [-s [SLEEP]]

optional arguments:
  -h, --help  show this help message and exit
  -n [NUM]    Number of containers=(0,50]
  -s [SLEEP]  Sleep duration of client file

# or as package:

>>> from titanium_silver.docker_client import Docker_Client
>>> dcli = Docker_Client()
>>> t = dcli.spawn_process(name='prototype%d'%i, num=i, sleep=5000, path=os.getcwd()+'/tests/SC') # returns a thread with container
>>> t.result_queue.get().decode('utf-8') # Get result

```

### License: Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)

### Authors:
- [**Ganesh K**](https://github.com/ganesh-k13)
- [**Rahul R Bharadwaj**](https://github.com/Rahul-RB)
- [**Gurunandan N**](https://github.com/ngurunandan)
