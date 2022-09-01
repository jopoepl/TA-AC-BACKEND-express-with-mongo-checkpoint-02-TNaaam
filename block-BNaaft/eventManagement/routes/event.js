var express = require(`express`)
var router = express.Router()
var Event = require(`../models/event`)
var Remark = require(`../models/remark`)
var Category = require(`../models/category`)


//handling all events
router.get(`/`, (req, res) => {
    var categories =``
    let array = [];
    Event.find({}, (err, events) => {
        Category.find({}, (err, categories) => {
            if(err) console.log(err)
            events.forEach(async event => {
                if(!array.includes(event.host)){
                array.push(event.host)}
            })
            res.render(`allEvents`, {events, categories, array})
            })
                
        
        
        
    })
})

//handling adding events

router.get(`/add`, (req, res) => {
        res.render(`addEvent`)
})

router.post(`/:id/edit`, (req, res) => {
    let id = req.params.id;
    Event.findByIdAndUpdate(id, req.body, (err, event) => {
        res.render(`singleEvent`, {event})
    })
})

router.get(`/:id/edit`, (req, res) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        res.render(`updateEvent`, {event})
    })
})






router.post(`/add`, (req,res, next) => {
    Event.create(req.body, (err, event) => {
        if(err) next(err)
        const allPromises = Object.keys(event.toJSON()).map(async (key) => {
            if(event[key] === `on`){
                if( await Category.find({content:key}).count() === 0){
                return Category.create({content: key, event: event._id})
            }   else {
                Category.findOneAndUpdate({content:key}, {$push:{event: event._id}}, (err) => {     
                })
            }
            } 
        })
        Promise.all(allPromises).then(() => {
            res.redirect(`/event`)
        })
    })
})

//handling single event page

router.get(`/:id`, (req, res) => {
    let id = req.params.id
    Event.findById(id, (err, event) => {
        Remark.find({event: id}, (err, remark) => {
            if(err) console.log(err)
            console.log(remark)
            res.render(`singleEvent`, {event: event, remark: remark})
        })

    })
})

//handling location based events

router.get(`/location/:id`, (req, res) => {
    let location = req.params.id
    Event.find({location: location}, (err, events) => {
        Category.find({}, (err, categories) => {
            if(err) console.log(err)
            events.forEach(async event => {
                if(!array.includes(event.host)){
                array.push(event.host)}
            })
            res.render(`allEvents`, {events, categories, array})
            })
    })
})

//handling likes on an event 
router.get(`/:id/like`, (req, res) => {
    let id = req.params.id
    Event.findById(id, (err, event) => {
        if(err) console.log(err)
        console.log(event, "LIKES")
        let likes = event.likes
        Event.findByIdAndUpdate(id, {likes: likes+1}, (err, updatedEvent) => {
            res.redirect(`/event/` + id)
        })
    })
})


//deleting a single event

router.get(`/:id/delete`, (req, res) => {
    let id = req.params.id
    Event.findByIdAndDelete(id, (err, event) => {
        if(err) console.log(err)
        res.redirect(`/event`)
    })
})


//handling categories inside event


router.get(`/:category/`, (req, res) => {
    let category = req.params.category
    Event.find({}, {$exists: {category}}, (err, events) => {
        if(err) console.log(err)
        res.render(`eventByCategory`, {events: events, category: category})
    })

})


module.exports = router