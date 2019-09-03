import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const baseJSON = {};
  res.jsonp(baseJSON);
});

export default router;
