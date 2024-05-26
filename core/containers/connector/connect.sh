#!/bin/bash

while :
do

echo "[Script info] - Initializing ssh connection..."

ssh -T -i ./certificate/cert \
    -p $SSH_PORT \
    -R *:$OUT_API_PORT:$API_HOST:$IN_API_PORT $SSH_USER@$SSH_HOST \
    "while sleep 10; do echo Connected - maintaing connection; done"

echo "[Script info] - Connection closed or not initialized"

sleep 2

done
