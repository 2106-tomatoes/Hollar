const router = require("express").Router();
const {
  models: { User, Event },
} = require("../db");

const Sequelize = require('sequelize')
const Op = Sequelize.Op;

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
    const userId = req.params.userId;
    const nonDmEvents = await Event.findAll({
      where: {
        eventObjectType: {
          [Op.or] : ['event', 'group']
        }
      },
      include: {
        model: User,
        where: {
          id: userId
        }
      }
    });

    res.send(nonDmEvents);

  } catch (error) {
    //console.log('stuffs broke yo' + error);
    next(error);
  }
});

// api/users/:userId/events/directMsg
router.post("/:userId/events/directMsg", async (req, res, next) => {
  const userId = req.params.userId;
  const { userToDm: { id: userToDmId } } = req.body.dmEventDetails;

  //Clean up the two user properties so we can use dmEventDetails for event creation 
  delete req.body.dmEventDetails.user;
  delete req.body.dmEventDetails.userToDm;


//   }
// });

// router.get("/:userId/events", async (req, res, next) => {

  try {
    const events = await Event.findAll({
      where: {
        eventObjectType: 'dm'
      },
      include: {
        model: User,
        where: {
          id: {
            [Op.or]: [userId, userToDmId]
          }
        }
      }
    });

    let dmEvent = events.find((event) => event.users.length === 2);
    if(dmEvent) {
      res.send(dmEvent);
    } else {
      const newDmEvent = await Event.create(req.body.dmEventDetails);
      await newDmEvent.addUser([userId, userToDmId]);
      res.send(newDmEvent);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/events/directMsg", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const dmEvents = await Event.findAll({
      where: {
        eventObjectType: 'dm'
      },
      include: {
        model: User,
        where: {
          id: userId
        }
      }
      
    });


    res.send(dmEvents);

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
