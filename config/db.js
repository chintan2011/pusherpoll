const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

// db connect
mongoose.connect(/* add your mongodb url here */)
.then(() => console.log('MongooseDB Connection'))
.catch(err => console.log(err));