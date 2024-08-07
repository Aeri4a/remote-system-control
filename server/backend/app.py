import requests
from paramiko import SSHClient, AutoAddPolicy
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
from socketio import Client
from time import sleep
from utils import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
    
CORS(app, origins='*', methods=["GET", "POST"], resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
socketServer = SocketIO(app, cors_allowed_origins='*', always_connect=True, logger=True, engineio_logger=True)

with open(".env", "r") as envFile:
    varsEnv = parseConfigFile(envFile)

# --- WebSocket Client ---
socketClient = Client()

# --- WebSocket Server ---
@socketServer.on('connect')
def WSServerConnect():
    print('Client connected')
    print(f'Connecting to: http://openssh:{varsEnv[Env.OUT_API_PORT]}')
    test = f'ws://openssh:{varsEnv[Env.OUT_API_PORT]}'
    if socketClient.connected:
        print('Disconnecting provider to reconnect')
        socketClient.disconnect()
        sleep(2)
    
    print('Trying to connect to provider...')
    socketClient.connect(url=test, wait=True, retry=True)

    print('Connected to provider sucessfully')

@socketServer.on('disconnect')
def WSServerDisconnect():
    print('Client disconnected')
    socketClient.disconnect()

@socketClient.on('disconnect')
def WSClientDisconnect():
    print('Provider disconnected')
    socketServer.emit('disconnect')

@socketClient.on('SERVER_ACTIVE')
def WSClientServerStatus():
    print('Recieved provider status')
    socketServer.emit('SERVER_ACTIVE')

# --- RestAPI ---
@app.route("/api/server-status", methods=["GET"])
def serverStatus():
    print("[S] - Establishing connection with trusted server...")
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
        print("[S] - Error ocurred during connection")
        return { "error": "Cannot connect" }, 500
    
    print("[S] - Connection established")

    print("[S] - Fetching saved information about server...")
    stdin, stdout, stderr = client.exec_command(
        f'cat {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()
    print("[S] - Information gained")

    status = parseConfigFile(stdout)

    print("[S] - Closing connection")
    client.close()

    return { "serverStatus": True if status[ConInfo.SERVER_CONNECT] == ConInfo.TRUE.value else False }, 200


@app.route("/api/connect", methods=["GET"])
def connect():
    print("[S] - Establishing connection with trusted server...")
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
        print("[S] - Error ocurred during connection")
        return { "error": "Cannot connect" }, 500
    
    print("[S] - Connection established")
    # TODO: wait if CONNECTED=T

    print("[S] - Setting server status to accept connections")
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.SERVER_CONNECT.value}.*/{ConInfo.SERVER_CONNECT.value}=T/g" {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()

    print("[S] - Setting server address")
    res = requests.get("https://api.ipify.org?format=json")
    serverCurrentAddress = res.json()["ip"]
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.SERVER_ADDRESS.value}.*/{ConInfo.SERVER_ADDRESS.value}={serverCurrentAddress}/g" {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()

    print("[S] - Closing connection")
    client.close()

    return '', 200

@app.route("/api/disconnect", methods=["GET"])
def disconnect():
    print("[S] - Establishing connection with trusted server...")
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
        print("[S] - Error ocurred during connection")
        return { "error": "Cannot connect" }, 500
    
    print("[S] - Connection established")
    # TODO: wait if CONNECTED=T

    print("[S] - Setting server status to reject connections")
    stdin, stdout, stderr = client.exec_command(
        f'sed -i "s/^{ConInfo.SERVER_CONNECT.value}.*/{ConInfo.SERVER_CONNECT.value}=F/g" {varsEnv[Env.FILE_PATH_SERVER]}'
    )
    stdin.close()

    print("[S] - Closing connection")
    client.close()

    return '', 200

@app.route("/api/check-connection", methods=["GET"])
def checkConnection():
    try:
        response = requests.get(
            f'http://openssh:{varsEnv[Env.OUT_API_PORT]}'
        )
        return response.text, 200
    except:
        return '', 400

# Mapped functionalities
@app.route("/api/devicewol", methods=["POST"])
def mapDevicewol():
    try:
        response = requests.post(
            f'http://openssh:{varsEnv[Env.OUT_API_PORT]}/devicewol',
            json=request.get_json()
        )
        return response.text, 200
    except:
        return '', 400

if __name__ == "__main__":
    # app.run()
    socketServer.run(app, debug=True)