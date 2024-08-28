const express = require("express");
const { connectDB } = require("./DB");
const { router } = require("./routes/index");
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/v1', router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server connected: ${process.env.PORT}`)
})
