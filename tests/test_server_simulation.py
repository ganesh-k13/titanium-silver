import sys
import pytest
from titanium_silver.docker_client import Docker_Client
from threading import Thread, Event
import time
import os

NO_OF_CONTAINERS = 10

@pytest.mark.skipif(sys.platform == 'darwin', reason="does not run on osx yet")
def test_server_simulation():
	dcli = Docker_Client()
	thread_list = list()

	for turn in range(5):
		for i in range(NO_OF_CONTAINERS):
			container_num = ( ( NO_OF_CONTAINERS * turn ) + i )
			print("Spawn container: %d"%container_num)
			thread_list.append(dcli.spawn_process(name='usn-%d'%container_num, num=container_num, params='%d 5000'%container_num, path=os.getcwd()+'/tests/SC', lang='CppContainer', testcases = {'in':'in', 'out':'out'}))
			# thread_list.append(dcli.spawn_process(name='prototype%d'%container_num, num=container_num, sleep=2000, path=os.getcwd()+'/tests/SC'))
		time.sleep(5)

	for i, t in enumerate(thread_list):
			assert('Hello container: %d'%i == t.result_queue.get().decode('utf-8'))
