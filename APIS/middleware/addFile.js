//import cloudinary related modules
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')



//configure cloudinary
cloudinary.config({
    cloud_name: 'dgwdk3b83',
    api_key: '415169195819767',
    api_secret: 'uZbLS3eELXGezaEwpjR3OPeb9-s'
});

//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'Pragya',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})

//export
module.exports=multerObj;