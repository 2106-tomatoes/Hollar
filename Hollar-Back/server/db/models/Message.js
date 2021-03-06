const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  messageContent: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Message;
