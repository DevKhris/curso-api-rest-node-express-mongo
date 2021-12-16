const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    validate: (value) => validator.isEmail(value)
  },
  created_at: {
    type: Date,
    default: new Date()
  },

  updated_at: {
    type: Date,
  }
})

contactSchema.methods.getFullName = function (err, cb) {
  if (err) {
    console.error(err)
  } else {
    return `${this.firstName} ${this.lastName}`
  }
}

module.exports = mongoose.model('Contact', contactSchema, 'contacts')
