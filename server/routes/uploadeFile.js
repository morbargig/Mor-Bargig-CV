// import multer from 'multer'

// const uploader = multer({
//     storage: multer.memoryStorage()
// });

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log(req, 1)
//         cb(null, 'public')
//     },
//     filename: function (req, file, cb) {
//         console.log(req, 2)
//         cb(null, 'temp.pdf')
//     }
// })

// var upload = multer({ storage: storage }).single('file')

// router.post('/uploadPdf', function (req, res) {
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json(err)
//         } else if (err) {
//             return res.status(500).json(err)
//         }
//         return res.status(200).send(req.file)
//     })
// })