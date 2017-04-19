const fs = require('fs'),
    { dataToString } = require('./util');

const baseFile = type => (...item) =>
    new Promise((resolve, reject) => {
        item.push((err, data) => {
            if (err) reject(err);
            resolve(data);
        });
        fs[type].apply(fs, item);
    });

const readFile = baseFile('readFile'),
    writeFile = baseFile('writeFile'),
    stat = baseFile('stat');

exports.fileStat = async path => {
    try {
        return await stat(path);
    } catch(err) {
        return null;
    }
};

exports.readSmallFile = async (path, type = 'utf8') => {
    const buf = await readFile(path);
    return buf.toString(type);
};

exports.writeSmallFile = async (path, content, type = 'utf8') => {
    content = dataToString(content);
    await writeFile(path, content, type);
};
