import swaggerAutogen from 'swagger-autogen';
import swaggerFile from '../../src/documentation/swagger.json';
import rotaUser from '../routes/userRoutes';
import rotaCep from '../routes/cepRoutes';

const output = swaggerFile;
const endpoints = [rotaUser, rotaCep];

swaggerAutogen(output, endpoints);
