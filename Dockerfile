# Base image , os and node
FROM node:18-alpine

# Setting up working folder
WORKDIR /app

# Copy package.json to install modules
COPY package.json /

# Copy app files
COPY . .

# Intalling modules
RUN npm install


# Run build
RUN npm run build

# Exposing port to connect app
EXPOSE 3000

# Run app
CMD ["npm", "start"]