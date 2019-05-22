import os
import pkg_resources as pkg
from titanium_silver.lang_container import LangContainer 

def read_cmd():
    file_name = pkg.resource_filename('titanium_silver', 'java_lang.sh')
    with open(file_name, 'r') as cmd_fd:
        return cmd_fd.read()

class JavaContainer(LangContainer):
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
        self.command = [cmd%(container_name, container_name, self.params, test_case_in)]
        self.image = "java:latest"
