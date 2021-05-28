const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  fullName : {
    type : String,
    required: true
  },
  email : {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  programmingLanguage: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  status: {
    type: String,
  },
  hired: {
    type: Boolean
  },
  tasks: [{ title: String, description: String, dateOfCreation: Date, deadline: Date }],
  doneTasks: [{ title: String, description: String, dateOfCreation: Date, deadline: Date }],
  actualTasks: [{ title: String, description: String, dateOfCreation: Date, deadline: Date }]
})

const Programmerdb = mongoose.model('programmerdb', schema);

module.exports = Programmerdb;