# Stage 1: Build Node.js app
FROM node:18.18.2-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port for Node.js
EXPOSE 8001

# Create the .env file with build arguments
ARG PORT
ARG SOCKET_PORT
ARG FRONT_END
ARG MONGO_URL
ARG SECRET_KEY
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_AUTH_TOKEN
ARG TWILIO_VERIFY_SID
ARG NODEMAILER_USER_EMAIL
ARG NODEMAILER_PASS

RUN echo "PORT=$PORT" > .env \
    && echo "SOCKET_PORT=$SOCKET_PORT" >> .env \
    && echo "FRONT_END=$FRONT_END" >> .env \
    && echo "MONGO_URL=$MONGO_URL" >> .env \
    && echo "SECRET_KEY=$SECRET_KEY" >> .env \
    && echo "TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID" >> .env \
    && echo "TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN" >> .env \
    && echo "TWILIO_VERIFY_SID=$TWILIO_VERIFY_SID" >> .env \
    && echo "NODEMAILER_USER_EMAIL=$NODEMAILER_USER_EMAIL" >> .env \
    && echo "NODEMAILER_PASS=$NODEMAILER_PASS" >> .env

# Define the command to run your application
CMD ["sh", "-c", "echo PORT=$PORT > .env && echo SOCKET_PORT=$SOCKET_PORT >> .env && echo FRONT_END=$FRONT_END >> .env && echo MONGO_URL=$MONGO_URL >> .env && echo SECRET_KEY=$SECRET_KEY >> .env && echo TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID >> .env && echo TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN >> .env && echo TWILIO_VERIFY_SID=$TWILIO_VERIFY_SID >> .env && echo NODEMAILER_USER_EMAIL=$NODEMAILER_USER_EMAIL >> .env && echo NODEMAILER_PASS=$NODEMAILER_PASS >> .env && npm start dev"]
