const fsHandle = require('./lib/fs'),
    streamHanle = require('./lib/stream');

module.exports = Object.assign(fsHandle, streamHanle);
