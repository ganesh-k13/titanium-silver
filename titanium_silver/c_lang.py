import os
from titanium_silver.lang_container import LangContainer 

class CContainer(LangContainer):
	def __init__(self, name='', num=0, params='', path=''):
		super().__init__(name, num, params, path)

	def run_container(self, cli):
		
