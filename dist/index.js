'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _settings = require('./config/settings');

var _settings2 = _interopRequireDefault(_settings);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpack3 = require('../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _reload = require('reload');

var _reload2 = _interopRequireDefault(_reload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (process.env.NODE_ENV === 'development') {
    var compiler = (0, _webpack2.default)(_webpack4.default);
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: _webpack4.default.output.publicPath
    }));
    app.use(require("webpack-hot-middleware")(compiler));
}

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.set('view engine', 'pug');
app.set('views', (0, _path.join)(__dirname, 'views'));
app.use(_express2.default.static((0, _path.join)(__dirname, 'public')));

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

if (process.env.NODE_ENV === 'development') (0, _reload2.default)(app);

app.listen(_settings2.default.server.port || 8080, function () {
    return console.log('Server is up!');
});