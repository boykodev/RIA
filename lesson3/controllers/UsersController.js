var users = require("../lib/users"),
    qs = require('querystring'),
    url = require("url");

module.exports = {
    getAction: function (request, response, next) {

        setTimeout(function (next) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');

            try {
                if (users.get().length) {
                    var responseText = JSON.stringify(users.get(), null, 2);
                } else {
                    var responseText = 'Користувачів не знайдено';
                }
                response.write(responseText);
                next();
            } catch (e) {
                next(e);
            }
        }, 500, next)
    },
    postAction: function (request, response, next) {

        response.setHeader('Content-Type', 'text/html; charset=utf-8');

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

            if (users.add(post)['edit']) {
                response.statusCode = 200;
                response.write('Дані користувача змінені');
                next();
            }
            else if (users.add(post)['success']) {
                response.statusCode = 200;
                response.write('Новий користувач доданий');
                next();
            }
            else {
                response.statusCode = 400;
                response.write('Bad request');
                next();
            }
        });
    }
};