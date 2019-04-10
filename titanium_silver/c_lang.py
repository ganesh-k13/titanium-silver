import os
from titanium_silver.lang_container import LangContainer 
import pdb

class CContainer(LangContainer):
    def __init__(self):
        pass

    def run_container(self, cli):
        self.configure()
        # pdb.set_trace()
        return super().run_container(cli)

    def configure(self):
        container_no = self.num
        container_name = self.name
        source_code_path = self.path
        self.command =  ['sh','-c',('gcc /opt/Input%s.c -o /opt/Output%s && /opt/Output%s %s'%(container_name, container_name, container_name + self.params))]	 
        self.image = "gcc:4.9"
