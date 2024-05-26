import json, time
from paramiko import SSHClient, AutoAddPolicy
from python_on_whales import docker, DockerClient, exceptions
from common import *

if __name__ == "__main__":
    print("[C0] - Core started")
    print("[C0] - Reading env file")
    with open("../.env", "r") as envFile:
        varsEnv = parseConfigFile(envFile)    

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
    time.sleep(1)

    print("[C1] - Fetching status information")
    stdin, stdout, stderr = client.exec_command(
        f'cat {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()
    serverInfo = parseConfigFile(stdout)
    print("[C1] - Status information gained")

    print("[C1] - Saving current configuration")
    with open(".env.docker", "w", encoding="utf-8") as dockerEnv:
        dockerEnv.write(serializeConfigFile(
            { **varsEnv, "SSH_HOST": serverInfo[ConInfo.SERVER_ADDRESS] }
        ))

    dockerClient = DockerClient(
        compose_files=["./containers/core-docker.yml"],
        compose_env_file=".env.docker"
    )

    # Process decision
    isConnectionNeeded = serverInfo[ConInfo.SERVER_CONNECT] == ConInfo.TRUE
    if isConnectionNeeded:
        print("[C1] - Server allow connections")

        if dockerClient.compose.is_installed:
            print("[C1] - Stopping current compose")
            dockerClient.compose.down()
        else:
            print("[C1] - Compose is not initialized")
            print("[C1] - Building compose...")
            dockerClient.compose.build()

        print("[C1] - Starting docker containers in compose")
        dockerClient.compose.up(detach=True) # build=True

    else:
        print("[C1] - Server not allow connections")
        print("[C1] - Stopping current compose...")
        dockerClient.compose.down()


    print("[C1] - Saving current running status to server")
    runStat = 'T' if isConnectionNeeded else 'F'
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.CLIENT_RUNNING.value}.*/{ConInfo.CLIENT_RUNNING.value}={runStat}/g" {varsEnv[Env.FILE_PATH_CLIENT]}'
    )
    stdin.close()

    print("[C1] - Closing connection")
    # Set client status - disconnected
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.CLIENT_CONNECTED.value}.*/{ConInfo.CLIENT_CONNECTED.value}=F/g" {varsEnv[Env.FILE_PATH_CLIENT]}'
    )
    stdin.close()
    client.close()

