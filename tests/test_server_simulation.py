import sys
sys.path.append('../')

import pytest
from docker_client import Docker_Client
from threading import Thread, Event
import time

NO_OF_CONTAINERS = 10

def test_server_simulation():
	dcli = Docker_Client()
	thread_list = list()

	for turn in range(5):
		for i in range(NO_OF_CONTAINERS):
			container_num = ( ( NO_OF_CONTAINERS * turn ) + i )
			print("Spawn container: %d"%container_num)
			thread_list.append(dcli.create_process(name='prototype%d'%container_num, num=container_num, sleep=2000))
		time.sleep(5)

	for i, t in enumerate(thread_list):
			assert('Hello container: %d'%i == t.result_queue.get().decode('utf-8'))
