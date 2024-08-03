import mongoose from 'mongoose';


const additionalCourseSchema = new mongoose.Schema({
    facultyID: { type:Number, required:true},
    courseName: { type:String, required:true},
    courseID: { type:String, required:true},
    description: { type:String, required:true},
    startDate: {type:String, required:true},
    endDate: {type:String, required:true},
    totalSeats: {type:Number, required:true},
    availableSeats: { type:Number, required:true},
    day: {type: [], required: true },
    venue: {type: String, required: true},
    timing: {type: String, required: true, unique: true},
    status: {type: String, default:'Comming Soon!' ,enum: ['Comming Soon!', 'Ongoing', 'Completed']}

})

const AdditionalCourseModel = mongoose.model('additionalCourse',additionalCourseSchema);
export default AdditionalCourseModel;