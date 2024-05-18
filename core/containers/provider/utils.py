from python_on_whales import docker

def isImageAvailable(image: str) -> bool:
    return docker.image.exists(image)

def buildDockerImage(image: str) -> None:
    print("------ Building docker image ------")
    docker.build("../devicewol", tags=["devicewol"])
    print("------ Finished building ------")
    return
