//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const Event = require("./models/Event");
const Message = require("./models/Message");
//associations could go here!

User.hasMany(Message);
Message.belongsTo(User);

Event.hasMany(Message);
Message.belongsTo(Event);

User.belongsToMany(Event, {through: 'Attendees'});
Event.belongsToMany(User, {through: 'Attendees'});


module.exports = {
  db,
  models: {
    User,
    Event,
    Message,
  },
};
