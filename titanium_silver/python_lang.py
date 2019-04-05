import os
from titanium_silver.lang_container import LangContainer 

class PythonContainer(LangContainer):
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
        self.command =  ['sh','-c',('gcc /opt/%s.c -o /opt/%s && /opt/%s '%(container_name, container_name, container_name)) + self.params]
        self.image = "python:latest"

