const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'MTG API',
  },
  host: 'cse341personal-bu80.onrender.com',
    schemes: ['https'],
  // host: 'localhost:8080',
  //   schemes: ['http'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];


swaggerAutogen(outputFile, routes, doc);