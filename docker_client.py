from docker import APIClient
import tarfile
import os
import time

class Docker_Client:

	def __init__(self, base_url='unix://var/run/docker.sock'):
		self.cli = APIClient(base_url='unix://var/run/docker.sock')

	def create_process(self, **kwargs):
		container_no = kwargs['num']
		container_name = kwargs['name']
		self.cli.create_container(
			image='gcc:4.9',
			command=['sh','-c','g++ -std=c++11 /opt/usn-%d.cpp -o /opt/out/usn-%d && /opt/out/usn-%d %d %d'%(container_no, container_no, container_no, container_no, kwargs['sleep'])],
			# command=['sh','-c','ls'],
			volumes=['/opt'],
			host_config=self.cli.create_host_config(
				binds={ os.getcwd()+'/SC': {
						'bind': '/opt',
						'mode': 'rw',
						}
					}
				),
			name=container_name,
			working_dir='/opt',
			environment=["DOCKER_CLIENT_TIMEOUT=120", "COMPOSE_HTTP_TIMEOUT=120"]
		)

		self.cli.start(container_name)
		self.cli.wait(container_name)
		output = self.cli.logs(container_name)

		self.cli.remove_container(container_name, force=True)
		print(output)
		return output

	def busy_wait(self, name):
		named_threads[name].join()
		self.cli.wait(name)
		output = self.cli.logs(name)

		self.cli.remove_container(name, force=True)
		print(output)
		return output	

	def get_status(self):
		return self.cli.status()

