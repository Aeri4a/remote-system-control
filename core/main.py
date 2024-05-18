import json
from paramiko import SSHClient, AutoAddPolicy
from python_on_whales import docker
from common import *
import time

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
    time.sleep(1)

    print("[C1] - Fetching status information")
    stdin, stdout, stderr = client.exec_command(
        f'cat {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()
    serverInfo = parseConfigFile(stdout)
    print("[C1] - Status information gained")

    print("[C1] - Checking container state")
    with open("./connectorState.json", "r", encoding="utf-8") as conStFile:
        connectorState = json.load(conStFile)

    # Process decision
    isConnectionNeeded = serverInfo[ConInfo.SERVER_CONNECT] == ConInfo.TRUE
    if isConnectionNeeded:
        print("[C1] - Server allow connections")

        if connectorState["status"] == "on":
            print("[C1] - Killing current container")
            try:
                docker.stop("Connector")
                docker.remove("Connector")
            except:
                pass

        print("[C1] - Starting 'Connector' docker container")

        # TODO: catch error if cannot be started
        container = docker.run(
            image="atlassian/ssh-ubuntu:0.2.2",
            detach=True,
            name="Connector"
        )

        print(f'[C1] - Container started at: {container.state.started_at}')

        connectorState["status"] = "on"
        connectorState["runid"] = container.id

        print("[C1] - Container started, client is running")
    else:
        print("[C1] - Server not allow connections")
        
        if connectorState["status"] == "on":
            print("[C1] - Killing current container")
            try:
                docker.stop("Connector")
                docker.remove("Connector")
            except:
                pass
        
        connectorState["status"] = "off"
        connectorState["runid"] = -1

    with open("./connectorState.json", "w", encoding="utf-8") as conStFile:
        json.dump(connectorState, conStFile)

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

