import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import FlexBetween from '../FlexBetween';
import { useNavigate } from 'react-router-dom';
import WidgetWrapper from '../WidgetWrapper';

export const AllComplainComponent = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

    const { palette } = useTheme();
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const dark = palette.primary.dark;
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user.staffID);
    const token = useSelector((state) => state.token);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch(`http://localhost:3001/staff/${userId}/eComplaint/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch complaints');
                }
                const data = await response.json();
                setComplaints(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching complaints:', error);
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <WidgetWrapper>
            <Box marginBottom="2rem">
                <Typography color={main}
                    variant="h3"
                    fontWeight="500"
                    align='center'
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                        },
                    }}>
                    ALL COMPLAINTS
                </Typography>
            </Box>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                complaints.map(complaint => (
                    <Box
                        bgcolor="#e6f8f9"
                        p="1rem"
                        borderRadius="0.5rem"
                        mb="1rem"
                    >
                        <FlexBetween
                            onClick={() => navigate(`/staff/${userId}/eComplaint/${complaint._id}`)}
                            sx={{
                                "&:hover": {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <Typography fontWeight="500" variant="body1" m="1rem 0" fontSize="0.95rem" sx={{
                                "&:hover": {
                                    color: { medium },
                                },
                            }}>
                                {complaint.title}
                            </Typography>
                            <Typography fontWeight="500" color={complaint.status === 'Accepted' ? "lightgreen" : complaint.status === 'Successful' ? "skyblue" : "lightcoral"}>
                                {complaint.status}
                            </Typography>
                            <Typography variant="body1"
                                color="#A3A3A3"

                            >
                                {`${formatDate(complaint.date)}`}
                            </Typography>
                        </FlexBetween>
                    </Box>
                ))
            )}

        </WidgetWrapper>

    );
};
