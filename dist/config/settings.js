'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
['NODE_ENV', 'PORT'].forEach(function (name) {
    if (!process.env[name]) {
        throw new Error('Environment variable ' + name + ' is missing');
    }
});

exports.default = {
    env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT)
    }
};