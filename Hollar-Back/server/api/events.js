const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { User , Event },

} = require("../db");
module.exports = router;

router.get("/", async (req,res,next) => {
  try {
    console.log("new Date(): ", new Date())
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);
    const dateFormat = year + "-" + month + "-" + date

    const events = await Event.findAll({
      where: {
        attendanceDate: {
          [Op.gte]: dateFormat
        }
      }
    })
    console.log("events", events)
    res.json (events);
  } catch (error) {
    next(error)
  }
} )

router.get("/:id", async (req,res,next) => {
  try {
    //console.log("userId in backend", req.params.id);
    const user = await User.findByPk(req.params.id);

    res.send (await user.getEvents());
  } catch (error) {
    //console.log('stuffs broke yo' + error);
    next(error)
  }
} )

router.post("/", async (req,res,next) => {
  try {
    const newEvent = await Event.create(req.body)
    await newEvent.addUser(req.query.user)
    res.json (newEvent);
  } catch (error) {
    next(error)
  }
} )

