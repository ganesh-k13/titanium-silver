import os
from abc import ABC, abstractmethod

class LangContainer(ABC):
    def __init__(self):
        pass

    def run_container(self, cli):
        #pdb.set_trace()
        container_name = self.name.split('/')[-1]+str(self.num)
        cli.create_container(
                        image=self.image,
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
                        name=container_name,
                        working_dir='/opt',
                        environment=["DOCKER_CLIENT_TIMEOUT=120", "COMPOSE_HTTP_TIMEOUT=120"]
        )

        cli.start(container_name)
        cli.wait(container_name)
        output = cli.logs(container_name)

        cli.remove_container(container_name, force=True)
        return output

    @abstractmethod
    def configure(self):
        pass
