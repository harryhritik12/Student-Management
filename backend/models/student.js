import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
    firstName: { type:String, required:true},
    lastName: { type:String, required:true},
    email: { type:String, required:true, unique:true, 
        validate:{
        validator:function(value){
            return /\b[A-Za-z0-9._%+-]+@iiitg\.ac\.in\b/.test(value);
        },
        message: props => `${props.value} is not a valid IIITG email address!`
    }
},
    password: { type:String, required:true, minlength:8, maxlength:100 },
    rollNumber: { type:String, required:true, unique:true},
    branch: { type:String, required:true},
    batch: {type:String, required:true},
    graduationYear: { type:Number, required:true},
    program: { type:String, required:true},
    enrolledCourses: {type: Array, default:[]},
    otp: { code: String, createdAt: Date }
})

const StudentModel = mongoose.model('registerStudent',StudentSchema);
export default StudentModel;

// implement batch in front-end