import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const isValidExt = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const isValidMimeType = fileTypes.test(file.mimetype);

    if (isValidExt && isValidMimeType) {
        return cb(null, true);
    } else {
        cb('Upload Image files only');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;
