import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {  // cb = callback file ki jagah we use localFilePath and req hame user se milega
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalName)
    }
  })
  
 export const upload = multer({ storage: storage })