import http from 'http'
import express from 'express'

import compression from 'compression'
import middlewareMockServer from './libs/middlewareMockServer'

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.use(compression())
app.use(middlewareMockServer())

app.use(express.static(`${process.cwd()}/public`))

io.on('connection', function (socket) {

  function send() {
    setTimeout(()=> {

      socket.emit('message', {
        message: 'hello world',
        time: Date.now().toString()
      });

      send();
    }, 5000);
  }

  send()

});

const serve = server.listen(process.env.PORT || 3000, function () {
  const host = serve.address().address;
  const port = serve.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
