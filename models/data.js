const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    value: { type: Number, required: true },
    date: { type: Date, required: false }
}, { collection: 'data'});

module.exports = mongoose.model('data', dataSchema);