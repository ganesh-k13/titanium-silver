import os
from titanium_silver.lang_container import LangContainer 
import pdb

class CContainer(LangContainer):
    def __init__(self):
        pass

    def run_container(self, cli):
        self.command = self.create_command()
        # pdb.set_trace()
        return super().run_container(cli)

    def create_command(self):
        container_no = self.num
        container_name = self.name
        source_code_path = self.path
        return ['sh','-c',('gcc /opt/%s.c -o /opt/%s && /opt/%s '%(container_name, container_name, container_name)) + self.params]	 
