const mongoose = require("mongoose");
//// this could be group or could be personal chat coz personal chat is nothing but a group of two member
const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);