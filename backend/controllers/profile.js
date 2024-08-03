import Student from '../models/student.js';
import Staff from '../models/staff.js';
import Faculty from '../models/faculty.js';

export const getStudentProfile = async (req,res)=>{
    try{
        const id = req.params.id;
        const student = await Student.findOne({rollNumber:id});
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        delete student.password;
        res.status(200).json(student);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getStaffProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const staff = await Staff.findOne({ staffID: id });
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        delete staff.password;
        res.status(200).json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getFacultyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const faculty = await Faculty.findOne({ facultyID: id });
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }
        delete faculty.password;
        res.status(200).json(faculty);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
