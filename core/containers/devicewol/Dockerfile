FROM debian:bookworm

RUN apt-get update && apt-get install -y etherwake

CMD ["sh", "-c", "etherwake $DEV_MAC"]