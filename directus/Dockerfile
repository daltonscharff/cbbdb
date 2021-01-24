FROM node
WORKDIR /home

# Install libvips
RUN wget https://github.com/libvips/libvips/releases/download/v8.10.5/vips-8.10.5.tar.gz
RUN tar xf vips-8.10.5.tar.gz
WORKDIR /home/vips-8.10.5
RUN ./configure
RUN make
RUN make install
RUN ldconfig

WORKDIR /home/node
COPY package*.json .

# Install sharp
RUN npm i sharp --build-from-source --unsafe-perm

# Install other dependencies
RUN npm ci

# Copy environment
COPY .env .

# Expose ports
EXPOSE 8080

CMD ["npm", "start"]
