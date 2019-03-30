import os
from abc import ABC, abstractmethod

class LangContainer(ABC):
	def __init__(self, name='', num=0, params='', path=''):
		self.name = name
		self.num = num
		self.params = params
		self.path = path
	
	@abstractmethod
	def run_container(self, cli):
		pass
