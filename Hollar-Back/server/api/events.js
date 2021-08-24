const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/:id", async (req,res,next) => {
  try {
    //console.log("userId in backend", req.params.id);
    const user = await User.findByPk(req.params.id);
    // console.log(`user`, user);
    res.send (await user.getEvents());
  } catch (error) {
    //console.log('stuffs broke yo' + error);
    next(error)
  }
} )