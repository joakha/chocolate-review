import express from "express"
import { createComment, getComments } from "../controllers/commentController";
import { validateJWT } from "../middleware/validateAppUser";

const commentRouter = express.Router();

commentRouter.post("/postComment",
    validateJWT,
    createComment
)

commentRouter.get("/:id",
    getComments
)

export default commentRouter