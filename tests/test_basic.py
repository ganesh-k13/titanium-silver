import sys
sys.path.append('../')

import pytest
from docker_client import Docker_Client
from threading import Thread, Event
import time

@pytest.mark.skipif(sys.platform == 'darwin', reason="does not run on osx yet")
def test_basic():
	dcli = Docker_Client()
	thread_list = list()
	for i in range(10):
		print("Spawn container: %d"%i)
		thread_list.append(dcli.create_process(name='prototype%d'%i, num=i, sleep=5000))
	
	for i, t in enumerate(thread_list):
		assert('Hello container: %d'%i == t.result_queue.get().decode('utf-8'))
