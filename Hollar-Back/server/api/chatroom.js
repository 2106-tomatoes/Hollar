const router = require("express").Router();
const {
  models: { User, Message },
} = require("../db");
module.exports = router;

router.get("/:id", async (req,res,next) => {
    try {
      
      const messages = await Message.findAll({
          where: {
              eventId:req.params.id
          },
          include: {
              model: User
          }
      })
      res.send(messages)
     
    } catch (error) {
      //console.log('stuffs broke yo' + error);
      next(error)
    }
  } )

router.post("/:id", async(req,res,next)=>{
    try{
        console.log('req',req.body)
        res.status(201).send(await Message.create(req.body))
    }
    catch(err){
        console.log('this error is happening')
        next(err)

    }
})