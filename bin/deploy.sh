docker start blog &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
yarn build &&
docker build -t blog/node-web-app . &&
docker kill blog &&
docker rm blog &&
docker run --network=host --name blog -p 3000:3000 -d blog/node-web-app &&
echo 'Done!'
