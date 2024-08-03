import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    enrolledCourses: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state,action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) =>{
            state.user = null;
            state.token = null;
        },
        // setEnrolledCourse: (state, action) =>{
        //     const updatedEnrolledCourses = state.enrolledCourses.map((courseID) => {
        //         if (courseID=== action.payload.course.courseID) return action.payload.course.courseID;
        //         return courseID;
        //       });
        //       state.enrolledCourses = updatedEnrolledCourses;
        // },
        setEnrolledCourse: (state, action) => {
            // Check if the course is already enrolled
            const isEnrolled = state.enrolledCourses.some(course => course === action.payload.course.courseID);
            if (!isEnrolled) {
                // If not enrolled, add the course to the enrolledCourses array
                state.enrolledCourses.push(action.payload.course.courseID);
            }
        },
    }
})

export const {setLogin, setLogout, setEnrolledCourse} = authSlice.actions;
export default authSlice.reducer;