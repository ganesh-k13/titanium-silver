import os
from titanium_silver.lang_container import LangContainer 

class Python2Container(LangContainer):
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
        self.command =  ['sh','-c',('python /opt/%s.py %s < %s'%(container_name, self.params, test_case_in))]
        self.image = "python:latest"

