import mongoose from 'mongoose';


// const classTimeTableBtechSchema = new mongoose.Schema({

//     courseID: { type:Number, required:true},
//     day: { type:String, required:true},
//     time: { type:String, required:true},
//     venue: { type:String, required:true},
//     semester: { type:Number, required:true},
//     section: { type:String, required:true},
//     stream: { type:String, required:true},
// },)


const TimetableSchema = new mongoose.Schema({
    program: {
      type: String,
      required: true,
      enum: ['BTech', 'MTech']  // Allowed program types
    },
    branch: {
      type: String,
      enum: ['CSE', 'ECE', null]  // Allowed specializations (null for programs without them)
    },
    batch: {
      type: String,
      default: null
    },
    semester: {
      type: String,
      required: true
    },
    days: {
      type: Object,
      required: true
    }
  });

const TimetableModel = mongoose.model('Timetable',TimetableSchema);
export default TimetableModel;









// {
//   "program": "BTech",  // or "MTech", "PhD" depending on program type
//   "specialization": "CSE", // or "ECE" or null if not applicable
//   "batch": "CS31",  // Batch ID relevant to program and specialization
//   "semester": 1,  // Semester number (e.g., 1, 2, 3, etc.)
//   "days": {
//     "Monday": [
//       {"subject": "Math", "time": "10:00-11:00", "room": "201"},
//       {"subject": "Physics", "time": "11:00-12:00", "room": "302"}
//     ],
//     "Tuesday": [
//       // ... similar structure for other days and classes
//     ]
//   }
// }




