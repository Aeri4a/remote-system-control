from enum import Enum

class Env(str, Enum):
    TRUSTED_SERVER_IP = "TRUSTED_SERVER_IP"
    TRUSTED_SERVER_PORT = "TRUSTED_SERVER_PORT"
    TRUSTED_SERVER_USER = "TRUSTED_SERVER_USER"
    TRUSTED_SERVER_PASSWORD = "TRUSTED_SERVER_PASSWORD"
    FILE_PATH_CLIENT = "FILE_PATH_CLIENT"
    FILE_PATH_SERVER = "FILE_PATH_SERVER"

class ConInfo(str, Enum):
    CLIENT_CONNECTED = "CONNECTED"
    CLIENT_RUNNING = "RUNNING"
    SERVER_CONNECT = "CONNECT"
    SERVER_ADDRESS = "ADDRESS"
    TRUE = "T"
    FALSE = "F"

# TODO: allow empty parse and skip white chars
def parseConfigFile(input):
    outputVariables = {}

    for line in input.readlines():
        key, var = line.split("=")
        outputVariables[key] = var.strip()
    
    return outputVariables