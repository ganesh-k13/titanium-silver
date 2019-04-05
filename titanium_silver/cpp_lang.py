import os
from titanium_silver.lang_container import LangContainer 

class CppContainer(LangContainer):
	def __init__(self):
		pass

	def run_container(self, cli):
		container_no = self.num
		container_name = self.name
		source_code_path = self.path
		cli.create_container(
				image='gcc:4.9',
				command=['sh','-c',('g++ -std=c++11 /opt/%s.cpp -o /opt/%s && /opt/%s '%(container_name, container_name, container_name)) + self.params],
				# command=['sh','-c','ls -la'],
				volumes=['/opt'],
				host_config=cli.create_host_config(
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

		cli.start(container_name)
		cli.wait(container_name)
		output = cli.logs(container_name)

		cli.remove_container(container_name, force=True)
		return output
