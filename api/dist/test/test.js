require('babel-polyfill');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

describe('Initial Test', function () {
  describe('First Test', function () {
    it('should return true when the value is true.', function () {
      _assert2['default'].equal(true, true);
    });
  });
});