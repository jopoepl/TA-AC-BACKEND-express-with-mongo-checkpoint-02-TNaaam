var mongoose = require(`mongoose`)
var Schema = mongoose.Schema


var categorySchema = new Schema({
    content: String,
    event: [{type: Schema.Types.ObjectId, ref: "event"}]
}, {timestamps: true})

module.exports = mongoose.model(`Category`, categorySchema)