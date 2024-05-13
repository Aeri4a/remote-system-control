from common import *
from paramiko import SSHClient, AutoAddPolicy
from python_on_whales import docker

if __name__ == "__main__":
    print("[C0] - Core started")
    print("[C0] - Reading env file")
    envFile = open("../.env", "r")
    varsEnv = parseConfigFile(envFile)
    envFile.close()

    # TODO: Key authentication
    print("[C1] - Establishing connection with trusted server...")
    client = SSHClient()
    client.set_missing_host_key_policy(AutoAddPolicy())
    try:
        client.connect(
            hostname=varsEnv[Env.TRUSTED_SERVER_IP],
            port=varsEnv[Env.TRUSTED_SERVER_PORT],
            username=varsEnv[Env.TRUSTED_SERVER_USER],
            password=varsEnv[Env.TRUSTED_SERVER_PASSWORD]
        )
    except:
        print("[C1] - Error ocurred during connection")
        print("[C1] - Exiting")
        exit()
    
    print("[C1] - Connection established")
    # Set client status - connected
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.CLIENT_CONNECTED.value}.*/{ConInfo.CLIENT_CONNECTED.value}=T/g" {varsEnv[Env.FILE_PATH_CLIENT]}'
    )
    stdin.close()

    print("[C1] - Fetching status information")
    stdin, stdout, stderr = client.exec_command(
        f'cat {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()
    serverInfo = parseConfigFile(stdout)
    print("[C1] - Status information gained")

    # Process decision
    if serverInfo[ConInfo.SERVER_CONNECT] == ConInfo.TRUE:
        print("[C1] - Server allow connections")
        print("[C1] - Starting 'Connector' docker container")
        
        # TODO: catch error if cannot be started
        container = docker.run(
            image="atlassian/ssh-ubuntu:0.2.2",
            detach=True,
            name="Connector"
        )

        print(container.state.started_at)

        stdin, stdout, stderr = client.exec_command(
            f'sed -i "s/^{ConInfo.CLIENT_RUNNING.value}.*/{ConInfo.CLIENT_RUNNING.value}=T/g" {varsEnv[Env.FILE_PATH_CLIENT]}'
        )
        stdin.close()
        print("[C1] - Container started, client is running")

    else:
        print("[C1] - Server not allow connections")
        # TODO: if its running then stop it based on name

    print("[C1] - Closing connection")
    # Set client status - disconnected
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.CLIENT_CONNECTED.value}.*/{ConInfo.CLIENT_CONNECTED.value}=F/g" {varsEnv[Env.FILE_PATH_CLIENT]}'
    )
    stdin.close()
    client.close()

