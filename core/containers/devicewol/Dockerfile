FROM alpine:3.19

RUN apk update && apk upgrade
RUN apk add --no-cache awake

CMD ["sh", "-c", "awake -b $DEV_BROADCAST $DEV_MAC"]