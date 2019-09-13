const express = require('express')
const router = express.Router()
const Pdf = require('../models/pdf')


const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// router.post('/addnewuser', function (req, res) {
let firstPdf = {
    _id: '5d7b9d93307b441570c17b36',
    pdf: 'https://firebasestorage.googleapis.com/v0/b/morbargig-a81d2.appspot.com/o/BargigShopUsers%2FMor%20Bargig%20CV.pdf?alt=media&token=f6881d50-a3f8-494f-a715-791709b555f4'
}

addFirstPdf = function () {
    let p1 = new Pdf(firstPdf)
    p1.save()
}

addFirstPdf()

router.get('/getPdf', (req, res) => {
    Pdf.find({}, function (err, pdf) {
        res.send(pdf)
        console.log(pdf)
    })
})

router.put('/upDatePdf', function (req, res) {
    let id = '5d7b9d93307b441570c17b36'
    let updatedData = req.body
    Pdf.findOneAndUpdate({ "_id": id }, updatedData, function () {
        res.end()
        console.log(updatedData, id)

    })

})


module.exports = router
