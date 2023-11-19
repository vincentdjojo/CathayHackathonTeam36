// userModel.js, this file will be used to handle documents specifically related to our Users

const mongoose = require('mongoose') // Initialize Mongoose

// Schema for our User model in Mongodb Collection.
const locationSchema = mongoose.Schema({
    address: {
        type: String
    },
    essid: {
        type: String,
    },
    mode: {
        type: String,
    },
    signal: {
        type: String,
    },
    encryption: {
        type: String,
    }
},  {
    timestamps: true
})

// Exports the model we defined based on our above Schema.. Named Bims below..
module.exports = mongoose.model('Locations', locationSchema)