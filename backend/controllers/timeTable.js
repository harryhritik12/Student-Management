// Import necessary models
import Timetable from '../models/timetable.js';
import Student from '../models/student.js';
import Staff from '../models/staff.js';


export const getTimetable = async (req, res) => {
  try {
      const userId = req.params.id;
      const student = await Student.findOne({ rollNumber: userId });
      const semester = req.body.semester;

      if (!student) {
        return res.status(404).json({ error: `Student not found ${userId}`});
      }

      const branch = student.branch;
      const program = student.program;
      const batch = student.batch;
      
      const timetable = await Timetable.findOne({ program, branch, batch, semester });

      if (!timetable) {
          return res.status(404).json({ message: "Timetable not found!" });
      }
      res.json(timetable);  // Return the entire timetable object (including days)
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving timetable!" });
  }
};



export const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving timetables!" });
  }
};


export const getTimetableById = async (req, res) => {
  try {
    const tableId = req.params.timetableID;
    const timetable = await Timetable.findById(tableId);
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    res.json(timetable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving timetable!" });
  }
};



export const createTimetable = async (req, res) => {
    try {
        const staffID = req.params.id;
        const { program, branch, batch, semester, timetable } = req.body;

        console.log(timetable);
    
        // Create a new additional course instance
        const newTimetable = new Timetable({
            program,
            branch,
            batch,
            semester,
            days:timetable
        });
        
        const staff = Staff.findOne({staffID});
        if (!staff) {
          return res.status(404).json({ error: 'Staff not found' });
        }
        // Save the additional course to the database
        await newTimetable.save();
        res.status(201).json({ message: "Timetable created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating timetable!" });
    }
};



export const deleteTimetable = async (req, res) => {
    const staffID = req.params.id;
    const timetableID = req.params.timetableID;
    try {
        const staff = Staff.findOne({staffID});
        if (!staff) {
          return res.status(404).json({ error: 'Staff not found' });
        }
        await Timetable.findByIdAndDelete(timetableID);
        res.json({ message: "Timetable deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting timetable!" });
    }
};
