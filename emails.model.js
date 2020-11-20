var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const Schema = mongoose.Schema;

const Emails = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

module.exports = mongoose.model("Emails", Emails);