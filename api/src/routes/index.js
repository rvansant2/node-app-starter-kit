import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const baseJSON = {};
  res.send(200).jsonp(baseJSON);
});

export default router;
