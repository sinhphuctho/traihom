'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _spdy = require('spdy');

var _spdy2 = _interopRequireDefault(_spdy);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _spdy2.default.createServer({
  key: _fs2.default.readFileSync(_path2.default.join(__dirname, '/../server.key')),
  cert: _fs2.default.readFileSync(_path2.default.join(__dirname, '/../server.crt'))
}, app);

app.use((0, _compression2.default)());
app.use((0, _helmet2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, '/../build')));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
server.listen(3000);