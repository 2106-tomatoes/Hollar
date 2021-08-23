const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxAttendees: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  eventObjectType: {
    type: Sequelize.ENUM("dm", "group", "event"),
    allowNull: false,
  },
  //Add Tags Here
});

module.exports = Event;
