# Container for node modules
FROM node:14 as toa-web-base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# serve is used to serve the webapp at the end
RUN npm install -g serve

# package.json install
RUN npm install

# Main Build Container
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy npm modules from base
COPY --from=toa-web-base /usr/src/app/node_modules /usr/src/app/node_modules

# Bundle app source
COPY . .

RUN npm run build

CMD [ "serve", "dist/browser", "-l 80" ]
