import http from 'http';

http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html'});
  res.write('Jane, this is your app. Drink some water. Now!');
  res.end();
}).listen(3000);