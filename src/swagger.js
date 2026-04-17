import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Minha API Automática',
    description: 'Documentação gerada automaticamente pelo swagger-autogen',
  }
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);