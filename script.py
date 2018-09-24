import argparse
from docker_client import Docker_Client
from threading import Thread, Event

# import Queue
'''

[IMPORTANT] Do not remove

19:17:~/Documents/docker/gcc/python:$ sudo docker run --rm --name voltest -v "$PWD":/app gcc:4.9 ls -la
docker.containers.run(image='name_of_your_image',                                                                                                                                                      
                      command='/usr/sbin/your_command --arg 123 --abc',                                                                                                                              
                      name=CONTAINER_NAME,                                                                                                                                              
                      hostname='host',                                                                                                                                                   
                      volumes={                                                                                                                                                         
                          '/container_directory': {                                                                                                                                       
                              'bind': '/host/home/user/directory',                                                                                                                             
                              'mode': 'rw'                                                                                                                                              
                          }                                                                                                                                                             
                      },                                                                                                                                                                
                      detach=True)
def create_process(name):
	cli = APIClient(base_url='unix://var/run/docker.sock')
	cli.create_container(
		image='gcc:4.9',
		command=['sh','-c','gcc /opt/myapp.c -o /opt/myapp && /opt/myapp'],
		volumes=['/opt'],
		host_config=cli.create_host_config(
		binds={ os.getcwd(): {
				'bind': '/opt',
				'mode': 'rw',
			}
		}
	),
		name=name,
		working_dir='/opt'
	)

	cli.start(name)
	cli.wait(name)
	output = cli.logs(name)

	cli.remove_container(name, force=True)

	print(output)
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
# c groups API
# benchmarks
'''


def main():
	dcli = Docker_Client()
	parser = argparse.ArgumentParser(description = 'usage %prog -f<file>')
	parser.add_argument('-n', dest='num', type = int, nargs = '?', const = 1, default=1, action = 'store', help='Number of containers=(0,50]')
	parser.add_argument('-s', dest='sleep', type = int, nargs = '?', const = 1000, default=1, action = 'store', help='Sleep duration of client file')
	
	options = parser.parse_args()
	# ready = Event()
	for i in range(options.num):
		# ready = Event()
		print("Spawn container: %d"%i)
		t = Thread(target=dcli.create_process, kwargs={'name':'prototype%d'%i, 'num':i, 'sleep':options.sleep})
		t.start()
		# ready.wait()
		# print(dcli.get_status())
	# ready.wait()


if __name__ == "__main__" :
	# tar = tarfile.open("in.tar.gz", "w:gz")
	# tar.add(".", arcname="in")
	# tar.close()
	
	main()

	# for i in range(NO_OF_PROCESSES):
	# 	t = Thread(target=dcli.busy_wait, args=('prototype%d'%i, ))
	# 	t.start()

	# dcli.create_process('prototype')
	# dcli.create_process('prototype1')
	# print(dcli.busy_wait('prototype1'))
	# print(dcli.busy_wait('prototype'))

