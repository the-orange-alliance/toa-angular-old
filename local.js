const server = require('./dist/server');
const port = process.env.PORT || 8080;

server.app.listen(port, () => {
    console.log('Listening on: http://localhost:' + port);
});
