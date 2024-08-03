import React, { useState, useEffect } from 'react';
import { PersistentDrawerLeft } from '../../components/student/navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import WidgetWrapper from '../../components/WidgetWrapper';
import FlexBetween from '../../components/FlexBetween';
import { Typography, Box, useTheme, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import {setEnrolledCourse} from "../../states/index.js";


export const CoursePage = () => {
    const { palette } = useTheme();
    const {  courseId } = useParams();
    const [course, setCourse] = useState(null);
    const userId = useSelector((state) => state.user.rollNumber);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const [isRegistered, setIsRegistered] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:3001/student/${userId}/additionalCourse/${courseId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }); 
                if (!response.ok) {
                    throw new Error('Failed to fetch course');
                }
                const courseData = await response.json();
                setCourse(courseData);
                const userData = await fetch(`http://localhost:3001/student/${userId}/profile`,{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if(!userData.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const user = await userData.json();
                setIsRegistered(user.enrolledCourses.includes(courseData.courseID));
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
    }, [courseId]);


    const handleOnClickRegister = async () => {
        try {
            const response = await fetch(`http://localhost:3001/student/${userId}/additionalCourse/register/${course.courseID}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // if (!response.ok) {
            //     throw new Error('Failed to register student');
            // }
            
            if (response.status === 400){
                console.log(response);
                alert(response.message);
                throw new Error(response.message);
            }
            navigate(`/student/${userId}/additionalCourse/registered`);

        } catch (error) {
            console.error('Error registering:', error);
            // alert(error);
        }
    }
    const handleOnClickUnregister = async () => {
        try {
            const response = await fetch(`http://localhost:3001/student/${userId}/additionalCourse/unregister/${course.courseID}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to unregister student');
            }
            navigate(`/student/${userId}/additionalCourse/registered`);

        } catch (error) {
            console.error('Error unregistering:', error);
        }
    }

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box m={2}>
                        {course && (
                            <>
                                <FlexBetween mb="1rem">
                                    <Box>
                                        <Typography color="#00D5FA"
                                            fontSize="1.85rem"
                                            fontWeight="500"
                                        >
                                            {course?.courseName}
                                        </Typography>
                                    </Box>
                                    <Typography fontWeight="500" color={course.status === 'Ongoing' ? "lightgreen" : course.status === 'Completed' ? "lightcoral" : "skyblue"}>
                                        {course.status}
                                    </Typography>
                                </FlexBetween>

                                <FlexBetween
                                    bgcolor="#e6f8f9"
                                    p="1rem"
                                    borderRadius="0.5rem"
                                    mb="1rem"
                                >
                                    {course?.description}
                                </FlexBetween>

                                <FlexBetween>
                                    <Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <CalendarMonthIcon />
                                            <Typography>{course?.startDate} ~ {course?.endDate}</Typography>
                                        </Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <RoomRoundedIcon />
                                            <Typography>{course?.venue}</Typography>
                                        </Box>

                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <CalendarMonthIcon />
                                            {course?.day.map((day) => <Typography>{day}</Typography>)}
                                        </Box>
                                        <Box display="flex" gap="1rem" m="1.5rem 4rem">
                                            <AccessTimeOutlinedIcon />
                                            <Typography>{course?.timing}</Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Box display="flex" gap="1rem" m="2rem 4rem 2rem">
                                            <AccessibilityNewRoundedIcon />
                                            <Typography >Seats Left: {course?.availableSeats}</Typography>
                                        </Box>
                                        <Box>
                                            {!isRegistered ?
                                                (<Button

                                                    onClick={handleOnClickRegister}
                                                    sx={{
                                                        width: "100%",
                                                        p: "1rem",
                                                        backgroundColor: palette.primary.main,
                                                        color: palette.background.alt,
                                                        "&:hover": { color: palette.primary.main },
                                                    }}
                                                >
                                                    Register Now !
                                                </Button>)
                                                :
                                                (<Button

                                                    onClick={handleOnClickUnregister}
                                                    sx={{
                                                        width: "100%",
                                                        p: "1rem",
                                                        backgroundColor: "crimson",
                                                        color: palette.background.alt,
                                                        "&:hover": { color: "crimson" },
                                                    }}
                                                >
                                                    Unregister !!
                                                </Button>)
                                            }


                                        </Box>


                                    </Box>

                                </FlexBetween>



                            </>
                        )}
                    </Box>

                </WidgetWrapper>
            </Box>
        </Box>
    );
};
