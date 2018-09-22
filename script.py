from docker import APIClient
import tarfile
import os
'''
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

'''

class Docker_Client:

	def __init__(self, base_url='unix://var/run/docker.sock'):
		self.cli = APIClient(base_url='unix://var/run/docker.sock')

	def create_process(self, name):
		self.cli.create_container(
		image='gcc:4.9',
		command=['sh','-c','gcc /opt/myapp.c -o /opt/myapp && /opt/myapp'],
		volumes=['/opt'],
		host_config=self.cli.create_host_config(
			binds={ os.getcwd(): {
					'bind': '/opt',
					'mode': 'rw',
					}
				}
			),
			name=name,
			working_dir='/opt'
		)

		self.cli.start(name)

	def busy_wait(self, name):
		self.cli.wait(name)
		output = self.cli.logs(name)

		self.cli.remove_container(name, force=True)
		
		return output	

if __name__ == "__main__" :
	# tar = tarfile.open("in.tar.gz", "w:gz")
	# tar.add(".", arcname="in")
	# tar.close()
	dcli = Docker_Client()

	for i in range(10):
		print("Spawn container: %d"%i)
		dcli.create_process('prototype%d'%i)
	for i in range(10)[::-1]:
		print(dcli.busy_wait('prototype%d'%i))
		

	# dcli.create_process('prototype')
	# dcli.create_process('prototype1')
	# print(dcli.busy_wait('prototype1'))
	# print(dcli.busy_wait('prototype'))

