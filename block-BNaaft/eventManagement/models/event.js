var mongoose = require(`mongoose`)
var Schema = mongoose.Schema


var eventSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    host: String,
    start_date: Date,
    end_date: Date,
    sports: String,
    cultural: String,
    tech: String,
    coding: String,
    location: String,
    likes: {type: Number, default: 0},
    remark: [{type: Schema.Types.ObjectId, ref:"remark"}]
}, {timestamps: true})

module.exports = mongoose.model(`Event`, eventSchema)