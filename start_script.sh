#!/bin/bash

screen -S 'Rainbow server' -dm sh -c "RAINBOW_PORT=3003 npm start; exec bash"
