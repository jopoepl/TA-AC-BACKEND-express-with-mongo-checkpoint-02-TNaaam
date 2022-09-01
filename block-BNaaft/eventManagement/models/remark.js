var mongoose = require(`mongoose`)
var Schema = mongoose.Schema


var remarkSchema = new Schema({
    content: String,
    event: {type: Schema.Types.ObjectId, ref: "event"},
    likes: {type: Number, default: 0}
}, {timestamps: true})

module.exports = mongoose.model(`Remark`, remarkSchema)