import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config("../.env")

const DB_URI = process.env.MONGO_DB;

const connectDB = () => {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB