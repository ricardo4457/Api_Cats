FROM node:23-alpine

WORKDIR /usr/src/app

# Install npx globally
RUN npm install -g npx

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Install sequelize-cli globally (optional, can also use npx)
RUN npm install -g sequelize-cli

EXPOSE 3000:3000

# Run migrations and start the app
CMD ["sh", "-c", "npx sequelize db:migrate && node server.js"]