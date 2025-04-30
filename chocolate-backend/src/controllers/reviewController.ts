import { Request, Response } from "express"
import cloudinary from "cloudinary"

const createReview = async (req: Request, res: Response) => {
    try {
        const pictures = req.files as Express.Multer.File[];
        const review = req.body;

        const promises = pictures.map(async (picture) => {
            const b64 = Buffer.from(picture.buffer).toString("base64");

            let URI = `data${picture.mimetype};base64${b64},`;
            const res = await cloudinary.v2.uploader.upload(URI);

            return res.url;
        })

        const pictureURLs = await Promise.all(promises)
    } catch (error) {
        console.error("Error occurred when creating a new review: ", error);
        return res.status(500).json({ message: "Server error!" });
    }
}