from enum import Enum

class Env(str, Enum):
    TRUSTED_SERVER_IP = "TRUSTED_SERVER_IP"
    TRUSTED_SERVER_PORT = "TRUSTED_SERVER_PORT"
    TRUSTED_SERVER_USER = "TRUSTED_SERVER_USER"
    TRUSTED_SERVER_PASSWORD = "TRUSTED_SERVER_PASSWORD"
    FILE_PATH_CLIENT = "FILE_PATH_CLIENT"
    FILE_PATH_SERVER = "FILE_PATH_SERVER"
    SSH_USER = "SSH_USER"
    SSH_PORT = "SSH_PORT"
    OUT_API_PORT = "OUT_API_PORT"
    IN_API_PORT = "IN_API_PORT"

class ConInfo(str, Enum):
    CLIENT_CONNECTED = "CONNECTED"
    CLIENT_RUNNING = "RUNNING"
    SERVER_CONNECT = "CONNECT"
    SERVER_ADDRESS = "ADDRESS"
    TRUE = "T"
    FALSE = "F"

def parseConfigFile(input) -> dict:
    outputVariables = {}

    for line in input.readlines():
        key, var = line.split("=")
        outputVariables[key] = var.strip()
    
    return outputVariables