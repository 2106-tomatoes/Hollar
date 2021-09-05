const router = require("express").Router();
const { Op } = require("sequelize");

const {
  models: { User , Event, Attendees },

} = require("../db");
module.exports = router;

router.get("/", async (req,res,next) => {
  try {
    console.log('date',req.query.date)
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // prints date in YYYY-MM-DD format

    const dateFormat = year + "-" + month + "-" + date


    const events = await Event.findAll({
      where: {
        attendanceDate: {
          [Op.gte]: req.query.date
        },
        eventObjectType: 'event'
      },
      include:{
        model:User
      }
    })
  
    res.json (events);
  } catch (error) {
    next(error)
  }
} )

router.get("/:eventId", async (req,res,next) => {
  try {

    const event = await Event.findOne({
      where:{
        id:req.params.eventId
      },
      include:{
        model:User
      }
    });
    

    res.send (event);
  } catch (error) {

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

router.put("/:eventId", async (req,res,next) => {
  try {
    console.log("req.body", req.body)
    const event = await Event.findByPk(req.params.eventId)
    await event.update(req.body)
    res.json(event)
  } catch (error) {
    next(error)
  }
})

router.delete("/:eventId", async (req,res,next) =>{
  try {
    const event = await Event.findByPk(req.params.eventId)
    await event.destroy()
    res.json(event)
  } catch (error) {
    next(error)
  }
})



