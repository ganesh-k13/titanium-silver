# Titanium-Silver

[![Build Status](https://travis-ci.org/DarkFate13/titanium-rhythm.svg?branch=master)](https://travis-ci.org/DarkFate13/titanium-rhythm) ![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg)  [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)  


Titanium-Silver is a python package for automating lab evalution using dockers.

### Installation[TODO]

This package requires:
- docker-ce
- python 3

Install the above dependencies and required packages by:

```sh
$ # Docker
$ apt-get update
$ sudo apt-get remove docker docker-engine docker.io #Remove
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88 # Verify:
# pub   4096R/0EBFCD88 2017-02-22
#       Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
# uid                  Docker Release (CE deb) <docker@docker.com>
# sub   4096R/F273FCD8 2017-02-22
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get install docker-ce

```

Please verify installation:

```sh
$ sudo docker run hello-world
```

### Tests [TODO]

```sh
$ pytest
```

### Usage

```
usage: script.py [-h] [-n [NUM]] [-s [SLEEP]]

optional arguments:
  -h, --help  show this help message and exit
  -n [NUM]    Number of containers=(0,50]
  -s [SLEEP]  Sleep duration of client file

```

### License: MIT

