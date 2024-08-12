import React, { useState, useEffect } from 'react';
import { PersistentDrawerLeft } from "../../components/staff/navbar";
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { TimetableComponent } from '../../components/staff/timetable.js';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import FlexBetween from '../../components/FlexBetween.js';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export const GetTimetableById = () => {
    const [timetableData, setTimetableData] = useState(null);
    const userId = useSelector((state) => state.user.staffID);
    const token = useSelector((state) => state.token);
    const { timetableID } = useParams();
    const navigate = useNavigate(); // Import useNavigate from 'react-router-dom'

    useEffect(() => {
        const fetchTimetableData = async () => {
            try {
                const response = await fetch(`https://student-management-server-jozx.onrender.com/staff/${userId}/timetable/${timetableID}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch timetable data');
                }
                const data = await response.json();
                setTimetableData(data);
            } catch (error) {
                console.error(error.message); // Log the error
                // You can handle the error globally or using other mechanisms as per your application's architecture
            }
        };

        fetchTimetableData();
    }, [userId, timetableID, token]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://student-management-server-jozx.onrender.com/staff/${userId}/timetable/delete/${timetableID}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete timetable');
            }

            // Navigate to all timetables page using navigate
            navigate(`/staff/${userId}/timetable/all`);
        } catch (error) {
            console.error(error.message);
            // Handle error
        }
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
                            <Typography color="#00D5FA"
                                variant="h3"
                                fontWeight="500"
                                align='center'
                            >
                                TIME-TABLE
                            </Typography>
                        </Box>
                        <Box>
                            {timetableData && <TimetableComponent data={timetableData} />}
                            <Button sx={{m:"2rem 50%"}} variant="contained" color="error" onClick={handleDelete}>
                                <DeleteIcon />
                            </Button>
                        </Box>
                    </Box>
                </WidgetWrapper>
            </Box>
        </Box>
    );
};
