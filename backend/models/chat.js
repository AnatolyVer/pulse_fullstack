const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    messages:{
        type:[Object],
        default:[]
    },
    members:{
        type:[Schema.Types.ObjectId],
        default:[]
    },
    type:{
        type: String,
        required:true
    }
});

module.exports =  mongoose.model('chat', userSchema)