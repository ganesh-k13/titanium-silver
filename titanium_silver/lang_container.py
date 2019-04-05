import os
from abc import ABC, abstractmethod

class LangContainer(ABC):
    def __init__(self):
        pass

    def run_container(self, cli):
        #pdb.set_trace()
        cli.create_container(
                        image='gcc:4.9',
                        command=self.command,
                        # command=['sh','-c','ls -la'],
                        volumes=['/opt'],
                        host_config=cli.create_host_config(
                                        binds={ self.path: {
                                                                        'bind': '/opt',
                                                                        'mode': 'rw',
                                                                        }
                                                        }
                                        ),
                        name=self.name,
                        working_dir='/opt',
                        environment=["DOCKER_CLIENT_TIMEOUT=120", "COMPOSE_HTTP_TIMEOUT=120"]
        )

        cli.start(self.name)
        cli.wait(self.name)
        output = cli.logs(self.name)

        cli.remove_container(self.name, force=True)
        return output

    @abstractmethod
    def create_command(self):
        pass
