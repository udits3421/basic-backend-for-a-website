import { Router } from "express";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

const router = Router();

// RESTful and tutorial-friendly routes
router.route("/").get(getAllPosts).post(createPost);
router.route("/create").post(createPost);
router.route("/all").get(getAllPosts);

// Single post endpoints
router.route("/:id")
    .get(getPostById)
    .put(updatePost)
    .patch(updatePost)
    .delete(deletePost);

router.route("/update/:id").put(updatePost).post(updatePost);
router.route("/delete/:id").delete(deletePost).post(deletePost);

export default router;

