const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: { type: String},
  code: { type: Number  },
  refer: { type: Number, require: true }, 
  point: { type: Number}, 
}, {
  timestamps: true,
});


module.exports = mongoose.model('Member', MemberSchema);