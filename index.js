const { port, env } = require('./config/vars');
const app = require('./config/express');

app.listen(port, () => console.info(`Api server started on port ${port} (${env})`));

module.exports = app;
