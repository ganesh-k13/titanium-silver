from docker import APIClient
import tarfile
import os
import time
from titanium_silver.thread_custom import threaded
from titanium_silver.c_lang import CContainer
from titanium_silver.cpp_lang import CppContainer
from titanium_silver.python_lang import PythonContainer
from titanium_silver.python2_lang import Python2Container
from titanium_silver.java_lang import JavaContainer
import pdb

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
		lang: string
			Name of language (class name)
		Returns
		----------
		String:
			Without Closure: Output of client code.

		Thread
			With @threaded decorater: Thread object which can be waited on to
			get above mentioned output.
		"""
		# pdb.set_trace()
		container = globals()[kwargs['lang']]()
		setattr(container, 'num', kwargs['num'])
		setattr(container, 'name', kwargs['name'])
		setattr(container, 'path', kwargs['path'])
		setattr(container, 'params', kwargs['params'])
		output = container.run_container(cli=self.cli)
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

