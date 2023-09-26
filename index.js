const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const userRouter = require("./routes/user.route")
// const userModel = require("./models/user.model")
const cors = require("cors")
// const mongoose = require ("mongoose")

const mongoose = require ("mongoose")

let URI = "mongodb+srv://bammytoye:Talneted1234@cluster0.7eebsf5.mongodb.net/August_db?retryWrites=true&w=majority";

mongoose.connect(URI)
    .then(() => console.log("Mongoose Connected"))
    .catch((err) => {
        console.log(err, "database not connected");
    })

app.use(cors())
app.use(express.json()); //recieve data from frontend
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter )



app.listen(PORT, () => {
    console.log("server Running on Port " + PORT);
})