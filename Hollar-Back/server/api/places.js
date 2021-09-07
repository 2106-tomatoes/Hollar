const router = require("express").Router();
const axios = require("axios")

module.exports = router;


router.get('/', async (req,res,next) => {
  try {
    let config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.headers.location}&types=geocode&key=${process.env.GOOGLE_MAPS_APIKEY}`,
      headers: { }
    };
    const {data} = await axios(config)
    res.json(data.predictions)
  } catch (error) {
    next(error)
  }
})
