import multer from 'multer';
import path from 'path'


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.resolve('./backend/public/uploads/users/'))
    },
    filename:function(req,file,cb){
        const fileName = `image-${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

function fileFilter(req,file,cb){
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false);
        return cb(new Error("File type should be of png, jpg, jpeg"))
    }
}


export const upload = multer({
    storage:storage,
    fileFilter:fileFilter
})


