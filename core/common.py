from enum import Enum

class VarEnv(Enum):
    TRUSTED_SERVER_IP = "TRUSTED_SERVER_IP"
    TRUSTED_SERVER_PORT = "TRUSTED_SERVER_PORT"
    TRUSTED_SERVER_USER = "TRUSTED_SERVER_USER"
    TRUSTED_SERVER_PASSWORD = "TRUSTED_SERVER_PASSWORD"
    FILE_PATH_CLIENT = "FILE_PATH_CLIENT"
    FILE_PATH_SERVER = "FILE_PATH_SERVER"

# TODO: fit more natural VarEnv into dictionary
# TODO: allow empty parse and skip white chars
def parseEnvFile(file):
    outputVariables = {}

    for line in file.readlines():
        key, var = line.split("=")
        outputVariables[key] = var.strip()
    
    return outputVariables