const mongoose = require('mongoose');
const universitySchema = new mongoose.Schema({
    university: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String, // Change from Number to String
        required: true
    }
});

module.exports = mongoose.model('University', universitySchema);
