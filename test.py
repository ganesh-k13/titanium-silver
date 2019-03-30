from titanium_silver.docker_client import Docker_Client
dcli = Docker_Client()
import os
dcli.spawn_process(name='usn-%d'%1, num=1, params='%d 5000'%1, path=os.getcwd()+'/tests/SC', lang='CContainer')

