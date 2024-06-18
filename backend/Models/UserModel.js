import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Enter username']
    },
    email : {
        type : String,
        required : [true, "Enter email"]
    },
    password : {
        type : String,
        required : [true, 'Enter password']
    },
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Course',
        rated : {
            type : Boolean,
            default : false
        },
    }]
})

const Users = mongoose.model('Users', userSchema);

export default Users;