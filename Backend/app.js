const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser=require('cookie-parser')
const connectToDb = require("./db/db");
const userRoutes=require('./routes/user.route.js')
const captainRoutes=require('./routes/captain.routes.js')
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes.js')

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/ride',rideRoutes);

module.exports = app;
