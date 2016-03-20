"use strict";

let addresses = require('./addresses');

/* Розбиття регулярки для зручності редагування */
let patterns = {
    streetName: /^\s*((?:ул|пр-т|вул|пл|пер)?[.\s]*(?:\d*[-])?[А-Яа-яЁёІіЇїЄєҐґ\-.\s]+)/,
    houseType: /(?:[,\s]*(?:дом)?[.\s]*)?/,
    houseNumber: /(\d+[А-Яа-яЁёІіЇїЄєҐґ-]*)?/,
    flatType: /(?:[,\s]*(?:кв)?[.\s]*)?/,
    flatNumber: /\/?(\d+)?\s*$/
};

/* Конкатинація регулярки в один вираз */
let pattern = new RegExp(patterns.streetName.source +
    patterns.houseType.source + patterns.houseNumber.source +
    patterns.flatType.source + patterns.flatNumber.source);

/* Отримання результатів */
let result = [];
addresses.forEach(function (item) {
    let address = {};

    let match = pattern.exec(item);
    if (match) {
        address.street = match[1] || '';
        address.house = match[2] || '';
        address.flat = match[3] || '';
    }

    result.push(address);
});

module.exports = result;