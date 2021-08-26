const router = require("express").Router();
const {
  models: { User , Event },

} = require("../db");
module.exports = router;

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
