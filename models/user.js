const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const userSchema = mongoose.Schema({

    image : String,
    email : String,
    name : String
})

module.exports = mongoose.model('user',userSchema);
