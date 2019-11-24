const mongoose = require('mongoose');

// Map global promises
mongoose.Promise = global.Promise;

// db connect
mongoose.connect('mongodb+srv://chintan:chintan@cluster0-88sin.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongooseDB Connection'))
.catch(err => console.log(err));