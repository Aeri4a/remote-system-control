from flask import Flask, request
from python_on_whales import docker, exceptions, components
from flask_socketio import SocketIO, emit
from utils import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

socketServer = SocketIO(app, cors_allowed_origins='*', always_connect=True, logger=True)

# --- WebSocket Server ---

@socketServer.on('connect')
def WSServerConnect():
    print('Client connected') 
    print('Emitting server status')
    socketServer.emit('SERVER_ACTIVE')

@socketServer.on('disconnect')
def WSServerDisconnect():
    print('Client disconnected')

# --- RestAPI ---

"""
[GET]
Connectitvity info
"""
@app.route("/", methods=["GET"])
def connectivity():
    return '', 200

"""
[POST]
Accept: body -> { mac: mac_address, broadcast: broadcast_address }
"""
@app.route("/devicewol", methods=["POST"])
def deviceWakeOnLAN():
    MAC = request.json["mac"]
    BROADCAST = request.json["broadcast"]
    print("[devicewol] - Checking container status...")
    
    try:
        container = docker.container.inspect("devicewol")
        print("[devicewol] - Container exists")
        print("[devicewol] - Removing old container...")
        container.remove(force=True)

    except exceptions.NoSuchContainer:
        print("[devicewol] - Cannot find container")
        if not isImageAvailable("devicewol"):
            print("[devicewol] - Image is not available")
            buildDockerImage("devicewol")

    print("[devicewol] - Running container...")
    container = docker.run(
        image="devicewol",
        name="devicewol",
        detach=True,
        envs={ "DEV_MAC": MAC, "DEV_BROADCAST": BROADCAST },
        networks=["host"]
    )

    while container.state.running:
        pass

    print("[devicewol] - Container finished")

    return {
        "state": docker.logs(container).strip(),
        "success": True if container.state.exit_code == 0 else False
    }, 200

if __name__ == "__main__":
    # app.run()
    socketServer.run(app)
