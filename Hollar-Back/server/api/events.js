const router = require("express").Router();
const { Op } = require("sequelize");
const axios = require("axios");

const {
  models: { User, Event, Attendees },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    let radius = req.headers.radius;
    let latitude = req.headers.latitude
    let longitude = req.headers.longitude


    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format

    const dateFormat = year + "-" + month + "-" + date;

    const openEvents = await Event.findAll({
      where: {
        attendanceDate: {
          [Op.gte]: req.query.date,
        },
        eventObjectType: "event",
      },
      include: {
        model: User,
      },
    });

    //COMMENT THIS LINE OUT WHEN USING GOOGLE API!!!
    // res.json(openEvents)

    //UNCOMMENT TO USE GOOGLE API!!!

    const latLng = openEvents.map((event) => {
      const lat = event.latitude;
      const lng = event.longitude;
      return { lat, lng };
    });
    const combineLatLng = [];

    latLng.forEach((coords) => {
      return combineLatLng.push(`${coords.lat},${coords.lng}`);
    });
    console.log('combineLatLng final', combineLatLng.join('|'))

    const config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
        latitude + "," + longitude
      }&destinations=${combineLatLng.join("|")}&key=${process.env.GOOGLE_MAPS_APIKEY}`,
      headers: {},
    };
    const { data } = await axios(config);
    console.log("data", data)

    const availableEvents = [];

    for (let i = 0; i < openEvents.length; i++) {
      // console.log("inisde for loop")
      const poi = data.rows[0].elements[i];
      // console.log("poi is", poi)
      const mileValue = (0.6214 * poi.distance.value) / 1000;
      // console.log("mileValue", mileValue)
      if (mileValue <= radius) {
        availableEvents.push(openEvents[i]);
      }
    }

    res.json(availableEvents);
  } catch (error) {
    next(error);
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {
        id: req.params.eventId,
      },
      include: {
        model: User,
      },
    });

    res.send(event);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);

    await newEvent.addUser(req.query.user);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

router.put("/:eventId", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const event = await Event.findByPk(req.params.eventId);
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    next(error);
  }
});

router.delete("/:eventId", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    await event.destroy();
    res.json(event);
  } catch (error) {
    next(error);
  }
});
