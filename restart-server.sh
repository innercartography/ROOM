#!/bin/bash
pkill -f nodemon 2>/dev/null
pkill -f "node server" 2>/dev/null
sleep 2
cd ~/MSF_Map_Svc/dist
nohup npm run dev > ~/server.log 2>&1 &
sleep 3
tail -5 ~/server.log
