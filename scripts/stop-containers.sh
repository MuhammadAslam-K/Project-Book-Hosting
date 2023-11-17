#stop-containers.sh


cd /home/bookat/devopspipeline
sudo cp -r build/* nginx

if ! docker info > /dev/null 2>&1; then
    service docker start
fi

docker-compose down
echo $?