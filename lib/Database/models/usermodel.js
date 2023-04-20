const mongoose = require("mongoose");

const authschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  header: String,
  content: String,
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: Array,
    required: true,
    default: [],
  },
  todel: Boolean, //TO DELETE DEVELOPMENT DATA
});
module.exports = mongoose.models.users || mongoose.model("users", authschema);
