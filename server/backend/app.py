import requests
from paramiko import SSHClient, AutoAddPolicy
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
from utils import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
    
CORS(app, origins='*', methods=["GET", "POST"], resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
socketio = SocketIO(app, cors_allowed_origins='*', always_connect=True)

with open(".env", "r") as envFile:
    varsEnv = parseConfigFile(envFile)

# --- WebSockets ---
@socketio.on('connect')
def wsConnect():
    print('Client connected')
    
    emit('test', 'Hello world!')

@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


# --- RestAPI ---
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
    socketio.run(app)