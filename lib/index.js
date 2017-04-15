const fs = require('fs'),
    { readFile, stat, writeFile } = require('./util');

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
    if (content instanceof Object) {
        content = JSON.stringify(content, null, 2);
    }
    content = content.toString();
    await writeFile(path, content, type);
};
