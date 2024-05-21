from flask import Flask, request
from python_on_whales import docker, exceptions
from utils import *

app = Flask(__name__)

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
        print("[devicewol] - Starting...")
        container.remove(force=True)

    except exceptions.NoSuchContainer:
        print("[devicewol] - Cannot find container")
        if not isImageAvailable("devicewol"):
            print("[devicewol] - Image is not available")
            buildDockerImage("devicewol")

    print("[devicewol] - Running...")
    container = docker.run(
        image="devicewol",
        name="devicewol",
        detach=True,
        envs={ "DEV_MAC": MAC, "DEV_BROADCAST": BROADCAST }
    )

    while container.state.running:
        pass

    print("[devicewol] - Container finished")

    return {
        "state": docker.logs(container).strip(),
        "success": True if container.state.exit_code == 0 else False
    }, 200

if __name__ == "__main__":
    app.run()
