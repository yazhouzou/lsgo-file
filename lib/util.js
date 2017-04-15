const fs = require('fs');

const baseFile = type => (...item) =>
    new Promise((resolve, reject) => {
        item.push((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
        fs[type].apply(fs, item);
    });

exports.readFile = baseFile('readFile');
exports.writeFile = baseFile('writeFile');
exports.stat = baseFile('stat');
