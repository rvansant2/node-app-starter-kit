import express from 'express';
const router = express.Router();

/* GET home page. */
router.get( '/', function( req, res, next ) {
  const baseJSON = {};
  res.json( baseJSON );
});

module.exports = router;
