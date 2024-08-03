import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    firstName: { type:String, required:true},
    lastName: { type:String, required:true},
    email: { type:String, required:true,
        validate:{
        validator:function(value){
            return /\b[A-Za-z0-9._%+-]+@iiitg\.ac\.in\b/.test(value);
        },
        message: props => `${props.value} is not a valid IIITG email address!`
    }
},
    password: { type:String, required:true, minlength:8, maxlength:100 },
    staffID: { type:String, required:true,unique:true},
    yearOfJoining: { type:Number, required:true},
    otp: { code: String, createdAt: Date }
})

const StaffModel = mongoose.model('registerStaff',StaffSchema);
export default StaffModel;