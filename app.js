const express = require('express')
const connectToDB=require("./config/connectToDB");
const { errorHandler, notFound } = require('./middlewares/error');
 require("dotenv").config();

//connection to database
connectToDB();

// init app
const app = express();

//middelwares
app.use(express.json());
 //routes
 app.use("/api/auth",require("./routes/authRoute"));
 app.use("/api/users",require("./routes/userRoute"));
 app.use("/api/posts", require("./routes/postsRoute"));

 // Error Handler Middleware
app.use(notFound);
app.use(errorHandler);



// create server
const PORT = process.env.PORT || 8081
app.listen(PORT, () =>   console.log("server is running on port: ", PORT))