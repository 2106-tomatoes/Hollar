const router = require("express").Router();
const {
  models: { User, Event },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.headers.username,
        password: req.headers.password,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/events", async (req, res, next) => {
  try {
    //console.log("userId in backend", req.params.id);
    const user = await User.findByPk(req.params.userId);

    res.send(await user.getEvents());
  } catch (error) {
    //console.log('stuffs broke yo' + error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    console.log("newUser", newUser);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/events/:eventId", async (req, res, next) => {
  try {
    //console.log("userId in backend", req.params.id);
    const event = await Event.findByPk(req.params.eventId);

    await event.addUser(req.params.userId);
    const newEvent = await Event.findOne({
      where: {
        id: req.params.eventId,
      },
      include: {
        model: User,
      },
    });

    res.send(newEvent);
  } catch (error) {
    //console.log('stuffs broke yo' + error);
    next(error);
  }
});
