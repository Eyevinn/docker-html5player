#!/bin/bash
DOCKERCMD=`which docker`
VERSION=`cat docker-version`

if [ -z $DOCKERCMD ]; then
  echo "Please install docker first"
  exit 1
fi

$DOCKERCMD build -t eyevinntechnology/html5player:$VERSION .
