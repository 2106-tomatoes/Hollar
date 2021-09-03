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
  longitude:{
    type: Sequelize.FLOAT
  },
  latitude:{
    type: Sequelize.FLOAT
  },
  attendanceDate:{
    type: Sequelize.DATEONLY,
    allowNull:false

  },
  hostId:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  time:{
    type: Sequelize.STRING
  }
});

module.exports = Event;
