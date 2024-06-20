import mongoose from "mongoose";

const blogPost = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        username : {
            type: String,
            required: true,
        },
        email : {
            type: String,
            required: true,
        }
    },
    date: {
        type: String,
        required: true,
    }
});

export default mongoose.model('BlogPost', blogPost);