const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    id: { type: Number, required: true }
}, { collection: 'data'});

module.exports = mongoose.model('data', dataSchema);