import sys
sys.path.append('../')

import pytest
import argparse
from docker_client import Docker_Client
from threading import Thread, Event
import time

def test_50():
	dcli = Docker_Client()
	thread_list = list()
	for i in range(50):
		# ready = Event()
		print("Spawn container: %d"%i)
		t = Thread(target=dcli.create_process, kwargs={'name':'prototype%d'%i, 'num':i, 'sleep':1000})
		t.start()
		thread_list.append(t)
	
	for t in thread_list:
		t.join()