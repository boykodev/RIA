"use strict";

const http = require('http'),
    url = require('url');

// Кількість переглядів index.html
let count = 0;

http.createServer(function (request, response) {

    var contentType = {'Content-Type': 'text/html; charset=utf-8'};

    var pathname = url.parse(request.url).pathname,
        responseText = '';

    if (pathname === '/index.html') {
        response.writeHead(200, contentType);
        responseText = 'Привіт світ!';
        count++;

    } else if (pathname === '/counter.html') {
        response.writeHead(200, contentType);
        responseText = 'Кількість переглядів: ' + count;

    } else {
        response.writeHead(404, contentType);
        responseText = '404 "Page not found!"\n';
    }

    response.write(responseText);
    response.end();

}).listen(3000);