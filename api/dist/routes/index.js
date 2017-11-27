var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = _express2['default'].Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var baseJSON = {};
  res.json(baseJSON);
});

module.exports = router;