const mongoose=require('mongoose');

const employeeScheme=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Employee=mongoose.model("Employee",employeeScheme);

module.exports=Employee;