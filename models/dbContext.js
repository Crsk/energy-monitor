const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/energy-monitor';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(() => console.log('db connected'))
    .catch(error => console.log(error));

module.exports = mongoose;