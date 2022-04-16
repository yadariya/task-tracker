FROM node:16.14.2-alpine as builder

# Prepare a directory and enter it
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
USER node
RUN npm install

# Copy & chown all the other files
COPY --chown=node:node . .

# Load api server name
ARG API_ROOT

# Build the project
RUN npm run build


FROM nginx:alpine

# Copy the built project to the directory served by nginx
COPY --from=builder /home/node/app/build /usr/share/nginx/html