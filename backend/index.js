require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
const express = require('express');
const app = express();
var cors = require('cors');
const connectToMongo = require('./db');
const port = 5000

connectToMongo();

app.use(cors())
app.use(express.json());

app.use('/auth',require('./routes/auth'));
app.use('/note',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})