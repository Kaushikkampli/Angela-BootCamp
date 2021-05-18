const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")

app.use(bodyParser.urlencoded( {extended : true}))
app.set("view engine", "ejs")

mongoose.connect("mongodb://localhost:27017/restdB", {useNewUrlParser: true, useUnifiedTopology: true})

const restSchema = new mongoose.Schema({
    title: String,
    artist: String,
    rating: Number
})

const Song = new mongoose.model("Song", restSchema)

app.route("/songs")
    
    .get(function(req, res){
        //fetch all docs
        
        Song.find({}, function(err, docs)
        {
            res.send(docs)
        })
    })

    .post(function(req, res){
        //add one doc to docs

        let newSong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            rating: req.body.rating
        })

        newSong.save(function(err){
            if(!err)
                console.log("added")
            else
                console.log(err)
        })
    })

    .delete(function(req, res){
        //delete all docs

        Song.deleteMany({}, function(err){
            if(!err)
                console.log("Scrubbed")
            else
                console.log(err)
        })
    })


app.route("/songs/:songName")
    
    .get(function(req, res){
        //fetch deails of certain doc

        Song.findOne({title: req.params.songName}, function(err, song){
            if(!err)
                res.send(song)
            else
                console.log(err)
        })
    })

    .patch(function(req, res){
        //update contents of a certain doc
        
        Song.updateOne({title: req.params.songName},req.body, function(err){
            if(!err)
                console.log("updated")
            else
                console.log(err)
        })
    })

    .put(function(req, res){
        //rewrite all the contents of a certain doc

        Song.replaceOne({title: req.params.songName},{title: req.body.title, artist: req.body.artist}, function(err){
            if(!err)
                console.log("overwriiten")
            else
                console.log(err)
        })
    })

    .delete(function(req, res){
        //delete certain doc

        Song.deleteOne({title: req.params.songName}, function(err){
            if(!err)
                res.send("deleted")
            else
                console.log(err)
        })
    })


app.listen(3000, function(req, res)
{
    console.log("listening")
})