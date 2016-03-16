var validator = require('validator');

users = [];

module.exports = {
    _users: users,
    add: function (data) {
        // валідація даних
        if (this._validate(data)) {

            var result = {"success": true};

            // перевірка на повтор
            var totalUsers = users.length;
            for (var i = 0; i < totalUsers; i++) {
                if (users[i].nick === data.nick) {
                    // видаляєм для перезапису
                    users.splice(i, 1);
                    // повідомляємо що юзер був змінений, а не доданий
                    result.edit = true;
                }
            }

            // створення нового юзера
            var newUser = {
                "nick": data["nick"],
                "name": data["name"],
                "e-mail": data["e-mail"],
                "description": data["description"],
                "age": data["age"]
            };

            // занесення нового юзера в базу
            this._users.push(newUser);

            return result;
        }
        return {"success": false}

    },
    get: function () {
        return this._users;
    },
    _validate: function (data) {
        return (
            // перевірка чи відправлені обов'язкові поля
            data['nick'] !== undefined &&
            data['name'] !== undefined &&
            data['e-mail'] !== undefined &&
            data['description'] !== undefined &&
            data['age'] !== undefined &&
            // валідація відправлених полів
            validator.isLength(data['nick'], 2, 255) &&
            validator.isLength(data['name'], 2, 255) &&
            validator.isEmail(data['e-mail']) &&
            validator.isLength(data['description'], 2, 255) &&
            validator.isNumeric(data['age'])
        )
    }
};