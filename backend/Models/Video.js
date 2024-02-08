import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({
    name : String,
    path : String,
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;