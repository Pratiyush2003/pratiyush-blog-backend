import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema.Types;

const NotesSchema = new Schema({
    user : {
        type : ObjectId,
        ref : "user"
    },
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    relatedtopic : {
        type : String,
        default : "General"
    },
    blogcontent : {
        type : String,
        default : Date.now
    }
})

export default model('Notes', NotesSchema)