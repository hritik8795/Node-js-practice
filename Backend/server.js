const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const pool = require("./Config/db.js");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const setupSwagger = require("./Config/swagger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(bodyParser.json());


// app.get("/home",(req,res)=>{
//     res.send("hello this is the home page ")
// })

// app.use('/api/auth', authRoutes);
app.use("/users", userRoutes);

setupSwagger(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
