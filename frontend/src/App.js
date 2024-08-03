
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from './pages/home.js';
import { Login } from './pages/login.js';
import { StudentSignup } from './pages/student/signUp.js';
import { FacultySignup } from './pages/faculty/signUp.js';
import { StaffSignup } from './pages/staff/signUp.js';
import { StaffHome } from './pages/staff/home.js';
import { StudentHome } from './pages/student/home.js';
import { FacultyHome } from './pages/faculty/home.js';
import { Navbar } from './components/navbar.js';
import { useSelector } from 'react-redux';
import { AllCoursesPage } from './pages/student/allCourses.js';
import { CoursePage } from './pages/student/courseById.js';
import { RegisteredCoursePage } from './pages/student/registeredCourses.js';
import { NewComplainPage } from './pages/student/newComplain.js';
import { RegisteredComplainPage } from './pages/student/registeredComplain.js';
import { Timetable } from './pages/student/timetable.js';
import { AnnouncementById } from './pages/student/announcementById.js';
import { CreateAnnouncement } from './pages/staff/createAnnouncement.js';
import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js'
import { ComplaintById } from './pages/student/complainById.js';
import { AllRegisteredCourse } from './pages/faculty/allRegisteredCourse.js';
import { AddCourses } from './pages/faculty/addCourse.js';
import { CourseById } from './pages/faculty/coursebyId.js';
import { GetAllAnnouncements } from './pages/staff/allAnnouncement.js';
import { CreateNewTimetable } from './pages/staff/createNewTimetable.js';
import { GetAllTimetable } from './pages/staff/allTimetable.js';
import { GetTimetableById } from './pages/staff/getTimetableById.js';
import { ComplaintByIdStaff } from './pages/staff/getComplainById.js';
import { AnnouncementByIdStaff } from './pages/staff/getAnnouncementById.js';
import CustomLayout from './components/CustomLayout.js';


function App() {
  const [value, setValue] = useState(0);
  const isAuth = Boolean(useSelector((state) => state.token));
  const theme = useMemo(() => createTheme(themeSettings()));

  return (
    <div className="App">    
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <CustomLayout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/login" element={< Login value={value} />} />
              <Route path="/signup/student" element={<StudentSignup value={value} setValue={setValue} />} />
              <Route path="/signup/faculty" element={<FacultySignup value={value} setValue={setValue} />} />
              <Route path="/signup/staff" element={<StaffSignup value={value} setValue={setValue} />} />
              <Route path='/staff/:id' element={isAuth ? <StaffHome /> : <Navigate to="/" />} />
              <Route path='/student/:id' element={isAuth ? <StudentHome /> : <Navigate to="/" />} />
              <Route path='/faculty/:id' element={isAuth ? <FacultyHome /> : <Navigate to="/" />} />
              <Route path='/student/:id/additionalCourse/all' element={isAuth ? <AllCoursesPage /> : <Navigate to="/" />} />
              <Route path='/student/:id/additionalCourse/registered' element={isAuth ? <RegisteredCoursePage /> : <Navigate to="/" />} />
              <Route path='/student/:id/additionalCourse/:courseId' element={isAuth ? <CoursePage /> : <Navigate to="/" />} />
              <Route path='/student/:id/eComplaint/submit' element={isAuth ? <NewComplainPage /> : <Navigate to="/" />} />
              <Route path='/student/:id/eComplaint/all' element={isAuth ? <RegisteredComplainPage /> : <Navigate to="/" />} />
              <Route path='/student/:id/eComplaint/:complaintID' element={isAuth ? <ComplaintById /> : <Navigate to="/" />} />
              <Route path='/student/:id/timetable' element={isAuth ? <Timetable /> : <Navigate to="/" />} />
              <Route path='/student/:id/announcement/:announcementId' element={isAuth ? <AnnouncementById /> : <Navigate to="/" />} />
              <Route path='/faculty/:id/additionalCourse/all' element={isAuth ? <AllRegisteredCourse /> : <Navigate to="/" />} />
              <Route path='/faculty/:id/additionalCourse/add' element={isAuth ? <AddCourses /> : <Navigate to="/" />} />
              <Route path='/faculty/:id/additionalCourse/:courseId' element={isAuth ? <CourseById /> : <Navigate to="/" />} />
              <Route path='/staff/:id/announcement/submit' element={isAuth ? <CreateAnnouncement /> : <Navigate to="/" />} />
              <Route path='/staff/:id/announcement/all' element={isAuth ? <GetAllAnnouncements /> : <Navigate to="/" />} />
              <Route path='/staff/:id/timetable/create' element={isAuth ? <CreateNewTimetable /> : <Navigate to="/" />} />
              <Route path='/staff/:id/timetable/all' element={isAuth ? <GetAllTimetable /> : <Navigate to="/" />} />
              <Route path='/staff/:id/timetable/:timetableID' element={isAuth ? <GetTimetableById /> : <Navigate to="/" />} />
              <Route path='/staff/:id/eComplaint/:complaintID' element={isAuth ? <ComplaintByIdStaff /> : <Navigate to="/" />} />
              <Route path='/staff/:id/announcement/:announcementId' element={isAuth ? <AnnouncementByIdStaff /> : <Navigate to="/" />} />
            </Routes>
            </CustomLayout>
          </Router>

        </ThemeProvider>

    </div>
  );
}

export default App;


