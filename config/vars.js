const path = require('path');

require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
});

module.exports = {
  env: process.env.API_SERVER_NODE_ENV,
  port: process.env.API_SERVER_PORT,
  logs: process.env.API_SERVER_NODE_ENV === 'production' ? 'combined' : 'dev',
};
