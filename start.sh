!#/bin/bash

echo "Run Mongod"
mongod --dbpath=~/mongodb/data/db --smallfiles &

echo "Run NodeJs"
#npm start
node --harmony server.js