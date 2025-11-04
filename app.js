import http from 'http';

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html'});
  res.write('New Changes');
  res.end();
}).listen(3000);