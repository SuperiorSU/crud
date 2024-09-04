const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    contact: {
        type: Number,
        required: true
    },
    semester: {
        type: String,
        enum: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth'],
        required: true,
    },
    year: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    batch: {
        type: String,
        enum: ['The Uniques', 'Academics', 'Super60'],
        required: true
    },
    university: {
        type: String,
       
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
