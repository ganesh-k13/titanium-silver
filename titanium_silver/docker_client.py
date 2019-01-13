from docker import APIClient
import tarfile
import os
import time
from titanium_silver.thread_custom import threaded

class Docker_Client:
	"""
	Custom Docker Client class aimed to efficiently
	create specific containers in large quantities.
	"""
	def __init__(self, base_url='unix://var/run/docker.sock'):
		self.cli = APIClient(base_url='unix://var/run/docker.sock')

	@threaded
	def spawn_process(self, **kwargs):
		"""
		Create a container in a thread.

		Parameters
		----------
		num : int [To be depcrecated]
			Container Number (one of the unique ways to identify a container).
		name : string
			Unique name to container
		path : string
			Path to folder containing source code of students.
			This folder will be mounted as a volume.
		sleep : int [To be deprecated]
			Sleep duration of client code.
		params: string
			params to be passed to client code in a space seperated string
		Returns
		----------
		String:
			Without Closure: Output of client code.

		Thread
			With @threaded decorater: Thread object which can be waited on to
			get above mentioned output.
		"""
		container_no = kwargs['num']
		container_name = kwargs['name']
		source_code_path = kwargs['path']
		self.cli.create_container(
			image='gcc:4.9',
			command=['sh','-c',('g++ -std=c++11 /opt/%s.cpp -o /opt/out/%s && /opt/out/%s '%(container_name, container_name, container_name)+kwargs['params'])],
			# command=['sh','-c','ls -la'],
			volumes=['/opt'],
			host_config=self.cli.create_host_config(
				binds={ source_code_path: {
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
		return output

	def busy_wait(self, name):
		"""
		Waits on a thread. [DEPRECATED]
		Use spawn_process and wait on returned thread for same effect.
		"""

		named_threads[name].join()
		self.cli.wait(name)
		output = self.cli.logs(name)

		self.cli.remove_container(name, force=True)
		print(output)
		return output	

	def get_status(self):
		return self.cli.status()

