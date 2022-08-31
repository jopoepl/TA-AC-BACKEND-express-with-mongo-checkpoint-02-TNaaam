var express = require(`express`)
var router = express.Router()
var Event = require(`../models/event`)
var Remark = require(`../models/remark`)
var Category = require(`../models/category`)
const remark = require("../models/remark")


//adding new remark
router.post(`/:id/add`, (req, res) => {
    let id = req.params.id
    req.body.event = id;
    Remark.create(req.body, (err, remark)=> {
        if(err) console.log(err)
        Event.findByIdAndUpdate(id, {$push: {remark: remark._id}}, (err, event) => {
            if(err) console.log(err)
            res.redirect(`/event/` + id)
        })
    })
} )


//handling likes on remark

router.get(`/:id/like`, (req, res) => {
    let id = req.params.id
    Remark.findById(id, (err, remark) => {
        if(err) console.log(err)
        console.log(remark, "LIKES")
        let likes = remark.likes
        Remark.findByIdAndUpdate(id, {likes: likes+1}, (err, updatedEvent) => {
            res.redirect(`/event/` + remark.event)
        })
    })
})

//deleting remark

router.get(`/:id/delete`, (req, res) => {
    let id = req.params.id;
    Remark.findByIdAndDelete(id, (err, remark) => {
        if(err) console.log(err)
        res.redirect(`/event/` + remark.event)
    })
})

module.exports = router