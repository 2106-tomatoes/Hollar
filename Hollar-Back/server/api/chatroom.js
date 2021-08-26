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

// api/chatroom/eventId
router.post("/:id", async(req,res,next)=>{
    try{
        const newMessage = await Message.create(req.body)
        const sendMessage = await Message.findOne({
          where: {
            id: newMessage.id
          },
          include: {
            model: User
          }
        })
        console.log("send message", sendMessage.messageContent);
        res.status(201).send(sendMessage);
    }
    catch(err){
        console.log('this error is happening')
        next(err)

    }
})