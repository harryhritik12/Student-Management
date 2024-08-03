// Import necessary modules and controllers
import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addAdditionalCourse, deleteAdditionalCourse , getAdditionalCourseById,getAllCoursesByFacultyId} from '../controllers/additionalCourse.js';
import { getFacultyProfile } from '../controllers/profile.js';
const router = express.Router();


router.get('/:id/profile', verifyToken,getFacultyProfile);
router.get('/:id/additionalCourse/all', verifyToken,getAllCoursesByFacultyId);
router.get('/:id/additionalCourse/:courseId', verifyToken, getAdditionalCourseById);

/* POST */

// additionalCourses Controllers
router.post('/:id/additionalCourse/add', verifyToken, addAdditionalCourse);
router.patch('/:id/additionalCourse/delete/:courseId', verifyToken, deleteAdditionalCourse);

export default router;