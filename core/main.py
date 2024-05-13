from paramiko import SSHClient, AutoAddPolicy
from common import parseEnvFile, VarEnv

if __name__ == "__main__":
    print("[C0] - Core started")
    print("[C0] - Reading env file")
    envFile = open("../.env", "r")
    varsEnv = parseEnvFile(envFile)
    envFile.close()

    # TODO: Key authentication
    print("[C1] - Establishing connection with trusted server...")
    client = SSHClient()
    client.set_missing_host_key_policy(AutoAddPolicy())
    try:
        client.connect(
            hostname=varsEnv[VarEnv.TRUSTED_SERVER_IP.value],
            port=varsEnv[VarEnv.TRUSTED_SERVER_PORT.value],
            username=varsEnv[VarEnv.TRUSTED_SERVER_USER.value],
            password=varsEnv[VarEnv.TRUSTED_SERVER_PASSWORD.value]
        )
    except:
        print("[C1] - Error ocurred during connection")
        print("[C1] - Exiting")
        exit()
    
    print("[C1] - Connection established")

    print("[C1] - Fetching status information")
    stdin, stdout, stderr = client.exec_command(
        f'cat {varsEnv[VarEnv.FILE_PATH_SERVER.value]}'
    )
    stdin.close()
    print(stdout.readlines())
    print("[C1] - Status information gained")

    # Process decision
    


    client.close()
    
