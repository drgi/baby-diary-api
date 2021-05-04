const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/baby-diary';

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB conection error: '));


