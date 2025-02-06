const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API',
  },
  host: 'localhost:8080',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];


swaggerAutogen(outputFile, routes, doc);