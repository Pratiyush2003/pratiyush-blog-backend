import mongoose, {model} from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true,
    },
    userPassword : {
        type : String,
        required : true,
    },
    Date : {
        type : Date,
        default : Date.now()
    }
})

const User = model("user", userSchema)
User.createIndexes();
export default User;