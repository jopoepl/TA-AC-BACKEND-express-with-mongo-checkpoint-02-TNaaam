var express = require(`express`)
var router = express.Router()
var Category = require(`../models/category`)
var Event = require(`../models/event`)


//handling categories inside event


router.get(`/:category/`, (req, res) => {

    let category = req.params.category
    Category.findOne({content: category}).populate("event").exec((err, category) => {
        if(err) console.log(err)
        console.log(category, "category")
    let events = category.event
    res.render(`eventByCategory`, {events: events, category: category})
    })
})


// Event.find({category: {$exists: true} }, (err, events) => {
//     if(err) console.log(err)
//     res.render(`eventByCategory`, {events: events, category: category})
// })

router.post(`/`, (req, res) => {
    console.log(req.body)
    Event.find({category: {$exists: true} }, (err, events) => {
        if(err) console.log(err)
        res.redirect(req.body.category)
    })


})



module.exports = router