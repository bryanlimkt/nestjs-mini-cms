# Use the official Node.js 19 image as a base
FROM node:19

# Create a working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /usr/src/app

# Build the application
RUN npm run build

# Expose the application's port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
