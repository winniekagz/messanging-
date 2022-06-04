const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
const Article=require("./model/articles")

app.get("/", function(req, res) {
    res.render("heyy youu")
})


 
app.get("/login",(req,res)=>{
   res.render("login")
})

 
app.get("/register",(req,res)=>{
    res.render("register")
 })

const PORT = 4000
mongoose.connect('mongodb+srv://root:admin@cluster0.mkpfl.mongodb.net/udemytest?retryWrites=true&w=majority',  { useNewUrlParser: true, 
useUnifiedTopology: true})
.then(()=>console.log("db successfully connected"))
.catch((err)=>console.log("err]in db connection"))

app.listen(`${PORT}`, () => {
    console.log(`app running on port ${PORT}`)
})
