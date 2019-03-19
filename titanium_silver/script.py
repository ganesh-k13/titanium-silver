import argparse
from docker_client import Docker_Client
from threading import Thread, Event
from thread_custom import threaded
import os
import pdb

def main():
	# pdb.set_trac()
	dcli = Docker_Client()
	parser = argparse.ArgumentParser(description = 'usage %prog -f<file>')
	parser.add_argument('-n', dest='num', type = int, nargs = '?', const = 1, default=1, action = 'store', help='Number of containers=(0,50]')
	parser.add_argument('-s', dest='sleep', type = int, nargs = '?', const = 1000, default=1, action = 'store', help='Sleep duration of client file')
	
	options = parser.parse_args()
	thread_list = list()
	for i in range(options.num):
		print("Spawn container: %d"%i)
		thread_list.append(dcli.spawn_process(name='prototype%d'%i, num=i, sleep=options.sleep, path=os.getcwd()+'/../tests/SC/'))

	for t in thread_list:
		print(t.result_queue.get().decode('utf-8'))

if __name__ == "__main__" :
	main()
