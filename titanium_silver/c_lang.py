import os
from titanium_silver.lang_container import LangContainer 
import pdb

def read_cmd():
    cmd_fd = open('./scripts/c_lang.sh', 'r')
    cmd = cmd_fd.readlines()
    cmd_fd.close()
    return cmd[0]

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
        cmd = read_cmd()
        self.command =  [cmd%(container_name, container_name+str(container_no), container_name+str(container_no), self.params, test_case_in)]	 
        self.image = "gcc:4.9"
