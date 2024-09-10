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

// I have entered this '0.0.0.0', so that using IP address also we can be able to get the data from backend
app.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log(`Server connected: ${process.env.PORT}`)
})
