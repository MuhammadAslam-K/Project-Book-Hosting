# Set the directory path
DEPLOY_DIR="/home/bookat/devopspipeline"

# Change to the deployment directory
cd "$DEPLOY_DIR"



# Check if Docker is not running, then start Docker
if ! docker info > /dev/null 2>&1; then
    service docker start
fi

# Stop and remove Docker containers defined in the docker-compose.yml file
docker-compose down

# Output the exit status of the last command
echo $?
