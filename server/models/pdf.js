import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PdfSchema = new Schema({
    HebPDF: String,
    EngPDF: String,
    language: String,
    linkedin: String
})

const Pdf = mongoose.model("pdf", PdfSchema)
module.exports = Pdf



