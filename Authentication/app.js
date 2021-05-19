require('dotenv').config()
const express = require("express")
const bodyparser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const encrypt = require("mongoose-encryption")
const md5 = require("md5")
const bcrypt = require("bcrypt")

const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("static"))
app.set("view engine", "ejs")

const url = "mongodb://localhost:27017/authdB"
mongoose.connect(url)

const dbschema = new mongoose.Schema({
    email: String,
    password: String
})

//encryption
// const key = process.env.Key
// dbschema.plugin(encrypt, {secret: key, encryptedFields: ["password"]})

//hashing
//md5()

//hashing and salting with bcrypt
const saltRounds = 10;

const User = new mongoose.model("User", dbschema)

app.route("/")
    .get(function(req, res){
        res.render("home", {})
    })

app.route("/register")
    .get(function(req, res){
        res.render("register", {})
    })

    .post(function(req, res){

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let newUser = new User({
                email: req.body.email,
                password: hash
            })

            newUser.save(function(err){
                if(!err)
                    res.send("Registered Successfully")
            })
        })
    })

app.route("/login")
    .get(function(req, res){
        res.render("login", {})
    })

    .post(function(req, res){
        
        //let passwd = md5(req.body.password)
        User.findOne({email: req.body.email}, function(err, user){
            if(!err)
            {
                if(user)
                {
                    bcrypt.compare(req.body.password, user.password, function(err, result) {
                        // result == true
                        if(result)
                            res.send("Logged in")
                        else
                            res.send("wrong passwd")
                        })
                }
                else
                    res.send("user does not exist")
            }
        })
    })

app.listen(3000 , function(req, res){
    console.log("server running")
})