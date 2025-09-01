require("dotenv").config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
const express = require('express');
const app = express();
var cors = require('cors');
const connectToMongo = require('./db');
const port = process.env.PORT||5000;

connectToMongo();

app.use(cors({
  origin: `https://notiva-r58d.vercel.app/`, // replace later
  credentials: true
}));

app.use(express.json());

app.use('/auth',require('./routes/auth'));
app.use('/note',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})