FROM alpine:3.19

RUN apk update && apk upgrade
RUN apk add --no-cache \
  openssh-client \
  ca-certificates \
  bash

WORKDIR /startup/

COPY certificate/ ./certificate/
COPY connect.sh .

CMD ["./connect.sh"]