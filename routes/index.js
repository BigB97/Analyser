var express = require('express');
var router = express.Router();
var gplay = require('google-play-scraper').memoized();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express', style: 'style' });
});

/* Search Playstore */
router.post('/search', async (req, res) => {
  const appName = req.body.app;
  try {
    const result = await gplay.search({ term: appName, num: 5, throttle: 10 });
    res.render('index', { result: result, style: 'style' });
    // return res.json(result);
  } catch (error) {
    return res.send(error);
  }
});

router.get('/app/:appid', async (req, res) => {
  const appIds = req.params.appid;
  const findAPP = await gplay.app({ appId: appIds, throttle: 10});
  // console.log(findAPP);
  res.send(findAPP.comments);
});

module.exports = router;
