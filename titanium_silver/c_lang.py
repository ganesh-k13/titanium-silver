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
        test_case_in = self.testcases['in']
        self.command =  ['sh','-c',('gcc /opt/%s.c -o /opt/%s && /opt/%s %s < %s'%(container_name, container_name+str(container_no), container_name+str(container_no), self.params, test_case_in))]	 
        self.image = "gcc:4.9"
