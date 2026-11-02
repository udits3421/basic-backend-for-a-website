import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

postSchema.pre("validate", function () {
    if (!this.content && this.description) {
        this.content = this.description;
    } else if (!this.description && this.content) {
        this.description = this.content;
    }
    if (!this.content && !this.description) {
        this.invalidate("content", "Content or description is required");
    }
});

export const Post = mongoose.model("Post", postSchema);

