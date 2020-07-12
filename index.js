const express = require('express');
const app = express();
const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/users');
const posts = require('./routes/posts');

// setup environment
dotenv.config()

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

// mongo db connect
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/tclone';
mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Twitter's Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/posts', posts);

// run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Twitter-clone's server is running on port ${PORT}`));