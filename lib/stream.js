const fs = require('fs'),
    { dataToString } = require('./util');

const readStream = path =>
    new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path),
            list = [];
        let len = 0;
        stream.on('data', chunk => {
            list.push(chunk);
            len += chunk.length;
        });
        stream.on('end', () => {
            resolve(Buffer.concat(list, len).toString());
        });
        stream.on('error', (err) => reject(err));
    });

const writeStream = (path, data, type) =>
    new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(path);
        stream.write(data, type);
        stream.end();
        stream.on('finish', () => resolve(true));
        stream.on('error', (err) => reject(err));
    });

exports.fileTofile = (source, target) => {
    const readStream = fs.createReadStream(source),
        writeStream = fs.createWriteStream(target);
    readStream.pipe(writeStream);
    return true;
};
exports.readBigFile = async path => await readStream(path);
exports.writeBigFile = async (path, data, type = 'utf8') => {
    data = dataToString(data);
    return await writeStream(path, data, type);
};
