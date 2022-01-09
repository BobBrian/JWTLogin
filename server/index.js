const express = require("express")
const app =  express();
const cors = require("cors")

//middleware
app.use(express.json())
app.use(cors())

//routes
//We need to specify the location of the routes themeselves
app.use("/auth", require("./routes/jwtAuth"));

//dashboard
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () =>{

    console.log("server is up and listening to port 5000");
});

