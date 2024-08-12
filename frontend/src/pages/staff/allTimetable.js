import React, { useState, useEffect } from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PersistentDrawerLeft } from '../../components/staff/navbar';
import WidgetWrapper from '../../components/WidgetWrapper';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import FlexBetween from '../../components/FlexBetween';

export const GetAllTimetable = () => {
    const [timetables, setTimetables] = useState([]);
    const userId = useSelector((state) => state.user.staffID);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    const { palette } = useTheme();
    const main = palette.primary.main;
    const medium = palette.neutral.medium;

    useEffect(() => {
        const fetchTimetables = async () => {
            try {
                const response = await fetch(`https://student-management-server-jozx.onrender.com/staff/${userId}/timetable/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch timetables');
                }

                const data = await response.json(); // Extract JSON content
                setTimetables(data);
            } catch (error) {
                console.error('Error fetching timetables:', error);
            }
        };

        fetchTimetables();
    }, []);

    const handleTimetableClick = (timetableId) => {
        navigate(`/staff/${userId}/timetable/${timetableId}`);
    };

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box m={2}>
                        <Box marginBottom="2rem">
                            <Typography color={main}
                                variant="h3"
                                fontWeight="500"
                                align='center'
                            >
                                ALL TIMETABLES
                            </Typography>
                        </Box>
                        {timetables?.map((timetable, index) => (
                            <Box
                                bgcolor="#e6f8f9"
                                p="1rem 2rem"
                                borderRadius="0.5rem"
                                mb="1rem"
                                key={index}
                                onClick={() => handleTimetableClick(timetable._id)}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Box display="flex" alignItems="center" gap={1} mb="0.5rem">
                                    <KeyboardDoubleArrowRightOutlinedIcon fontSize='large' />
                                    <Typography
                                        color="lightcoral"
                                        fontWeight="500"
                                        fontSize="1.32rem"
                                        sx={{
                                            "&:hover": {
                                                color: "#A3A3A3",
                                                cursor: 'pointer',
                                            },
                                        }}
                                    >
                                        {timetable.program}
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" justifyContent="space-evenly" padding="0 2.4rem">
                                    <Typography fontWeight="500" >BRANCH: {timetable.branch}</Typography>
                                    <Typography fontWeight="500" >BATCH: {timetable.batch}</Typography>
                                    <Typography fontWeight="500" >SEMESTER: {timetable.semester}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </WidgetWrapper>

            </Box>
        </Box>
    );
};
