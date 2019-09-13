const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PdfSchema = new Schema({
    pdf: String,
})

const pdf = mongoose.model("pdf", PdfSchema)
module.exports = pdf



