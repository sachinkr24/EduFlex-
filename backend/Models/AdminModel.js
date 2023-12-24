import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username missing"]
    },
    email : {
        type : String,
        required : [true, "email required"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "Empty password field"]
    },
    myCourses : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Course' 
    }]
})

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;