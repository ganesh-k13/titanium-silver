import os
from abc import ABC, abstractmethod

class LangContainer(ABC):
	def __init__(self):
		pass
	
	@abstractmethod
	def run_container(self, cli):
		pass
