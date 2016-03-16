var qs = require('querystring'),
    url = require("url");

module.exports = {
    getAction: function (request, response, next) {
        /* next(null) */
        setTimeout(function (next) {
            response.statusCode = 200;
            try {
                response.write('GET happened');

                // Отримуємо get дані
                var queryData = url.parse(request.url, true).query;

                next();
            } catch (e) {
                next(e);
            }
        }, 500, next)
    },
    postAction: function (request, response, next) {
        /* next(null) */
        setTimeout(function (next) {
            response.statusCode = 200;
            try {
                response.write('POST happened');

                var body = '';

                request.on('data', function (data) {
                    body += data;

                    // Too much POST data, kill the connection!
                    if (body.length > 1e6)
                        request.connection.destroy();
                });

                request.on('end', function () {
                    // Отримуємо post дані
                    var post = qs.parse(body);
                });

                next();
            } catch (e) {
                next(e);
            }
        }, 500, next)
    }
};