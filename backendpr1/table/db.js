const mongoose=require ("mongoose");
require("dotenv").config()
mongoose.connect(process.env.URL);
const UserSchema=new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true,  
      },
    name:{
        type:String,
        require:true
    },
    email:{
       type:String,
       require:true,
       unique:true
    },
    password:{
        type:String
    }
})
const NotesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    title:{
    type:String,
    require:true,
    },
    desc:{
        type:String,
        require:true
    },
    tag:{
          type:String,
          default:"todo"
    }
})
const User=new mongoose.model("user",UserSchema);
const Notes=new mongoose.model("notes",NotesSchema);
module.exports={
    User,
    Notes
}