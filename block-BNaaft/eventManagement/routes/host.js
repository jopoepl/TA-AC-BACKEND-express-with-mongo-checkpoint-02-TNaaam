var express = require(`express`)
const category = require("../models/category")
var router = express.Router()
var Category = require(`../models/category`)
var Event = require(`../models/event`)


//handling categories inside event


// router.get(`/:host/`, (req, res) => {
//     let host = req.params.category
//     Category.findOne({content: category}).populate("event").exec((err, category) => {
//         if(err) console.log(err)
//         console.log(category, "category")
//     let events = category.event
//     res.render(`eventByCategory`, {events: events, category: category})
//     })
// })


// Event.find({category: {$exists: true} }, (err, events) => {
//     if(err) console.log(err)
//     res.render(`eventByCategory`, {events: events, category: category})
// })

router.get(`/`, (req, res) => {
    res.send("HOST LOADED")
})

router.get(`/:host/`, (req, res) => {
    let host = req.params.host.toUpperCase()
    Event.find({host: host}).exec((err, events) => {
        if(err) console.log(err)
        let category= {content: host};
    res.render(`eventByCategory`, {events: events, category})
    })
})

router.post(`/`, (req, res) => {
    res.redirect(req.body.host)
})





module.exports = router