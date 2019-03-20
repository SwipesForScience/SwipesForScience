## Swipes evictions app
##
## Usage (please understand docker basics!):
##  build the image
##    docker build -t <user/name> .
##  run the image
##    docker run -p 8080:8080 <user/name>
##
FROM node:8
LABEL description="swipes api eviction app"
COPY . /code
WORKDIR /code
EXPOSE 8080
RUN npm install
CMD ["npm", "run", "dev"]
