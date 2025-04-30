import multer from "multer"

const pictureStorage = multer.memoryStorage()
const pictureUpload = multer({
    storage: pictureStorage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export {
    pictureUpload
}