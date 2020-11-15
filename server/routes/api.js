import { Router } from 'express'
const router = Router()
import Pdf from '../models/pdf'


import { json, urlencoded } from 'body-parser'
router.use(json())
router.use(urlencoded({ extended: false }))

router.get('/isAlive', (req, res) => {
    res.send(200)
})

router.get('/getPdf', (req, res) => {
    Pdf.find({}, function (err, pdf) {
        res.send(pdf)
        // console.log(pdf)
    })
})

router.put('/updatePdf', function (req, res) {
    let id = '5d7b9d93307b441570c17b36'
    let updatedData = req.body
    Pdf.findOneAndUpdate({ "_id": id }, updatedData, function () {
        res.end()
        // console.log(updatedData, id)
    })
})


router.get('/newPdf', function (req, res) {
    let id = '5d7b9d93307b441570c17b36'
    const pdf = new Pdf({
        _id: id,
        HebPDF: '',
        EngPDF: '',
        language: 'EngPDF',
        linkedin: "",
    });
    pdf.save()
    find({}, function (err, pdf) {
        res.send(pdf)
    })
})


export default router
