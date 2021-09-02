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
    //console.log("userId in backend", req.params.id);
    // const user = await User.findByPk(req.params.userId);

    // res.send(await user.getEvents());

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
  // console.log('users api, req.body:', req.body);
  // console.log('users api, userToDmId:', userToDmId);

  //Clean up the two user properties so we can use dmEventDetails for event creation 
  delete req.body.dmEventDetails.user;
  delete req.body.dmEventDetails.userToDm;
  // console.log('req.body.dmEventDetails after delete:', req.body.dmEventDetails);

  try {
    const events = await Event.findAll({
      where: {
        eventObjectType: 'dm' //change back to dm later
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

    // console.log('users api, events:', events);
    let dmEvent = events.find((event) => event.users.length === 2);
    console.log('users api, dmEvent:', dmEvent);
    if(dmEvent) {
      res.send(dmEvent);
    } else {
      const newDmEvent = await Event.create(req.body.dmEventDetails);
      await newDmEvent.addUser([userId, userToDmId]);
      res.send(newDmEvent);
    }
    // res.send(events);
  } catch (error) {
    //console.log('stuffs broke yo' + error);
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

// router.get('/:id', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'username']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

router.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    console.log("newUser", newUser);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});
