import mongoose from "mongoose";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createPost = async (req, res) => {
    try {
        const { title, description, content, author } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Post title is required" });
        }

        const bodyContent = content || description;
        if (!bodyContent) {
            return res.status(400).json({ message: "Post content or description is required" });
        }

        let authorId = null;
        if (author) {
            if (mongoose.Types.ObjectId.isValid(author)) {
                authorId = author;
            } else {
                // If author was passed as email or username
                const user = await User.findOne({
                    $or: [
                        { email: author.toString().toLowerCase() },
                        { username: author.toString().toLowerCase() }
                    ]
                });
                if (user) {
                    authorId = user._id;
                }
            }
        }

        const newPost = await Post.create({
            title: title.trim(),
            content: bodyContent.trim(),
            description: (description || content).trim(),
            author: authorId
        });

        res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Posts fetched successfully",
            count: posts.length,
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(id).populate("author", "username email");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post fetched successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const updateData = {};
        if (title !== undefined) updateData.title = title.trim();
        if (content !== undefined) updateData.content = content.trim();
        if (description !== undefined) updateData.description = description.trim();

        // Keep content and description in sync if one was provided
        if (updateData.content && !updateData.description) {
            updateData.description = updateData.content;
        } else if (updateData.description && !updateData.content) {
            updateData.content = updateData.description;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, returnDocument: "after", runValidators: true }
        ).populate("author", "username email");

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
