const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PdfSchema = new Schema({
    HebPDF: String,
    EngPDF: String,
    language: String
    , linkedin: String
})

const pdf = mongoose.model("pdf", PdfSchema)
module.exports = pdf



