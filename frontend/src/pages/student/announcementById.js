import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { PersistentDrawerLeft } from '../../components/student/navbar';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import FlexBetween from '../../components/FlexBetween';

export const AnnouncementById = () => {
    const { userId, announcementId } = useParams(); // Get userId and announcementId from URL params
    const [announcement, setAnnouncement] = useState(null);
    const token = useSelector((state) => state.token);
    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/${userId}/announcement/${announcementId}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setAnnouncement(response.data);
            } catch (error) {
                console.error('Error fetching announcement:', error);
            }
        };

        fetchAnnouncement();
    }, [userId, announcementId]);

    if (!announcement) {
        return <p>Loading...</p>; // Display loading indicator while fetching data
    }

    const { title, description, date, filePath } = announcement;

    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
            >
                <WidgetWrapper>
                    <Box mb="1rem" display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap="1rem">
                            <Typography color="#00D5FA"
                                fontSize="1.85rem"
                                fontWeight="500"
                            >
                                {title}
                            </Typography>
                            <CampaignRoundedIcon fontSize='large' />
                        </Box>

                        <Typography color="#A3A3A3" variant="body1" fontSize="0.9rem">{new Date(date).toLocaleDateString()}</Typography>
                    </Box>
                    <FlexBetween
                        bgcolor="#e6f8f9"
                        p="1rem"
                        borderRadius="0.5rem"
                        mb="1rem"
                    >
                        <Typography fontSize="1rem">{description}</Typography>
                    </FlexBetween>
                    <Grid container spacing={2}> 
                        {filePath && filePath.map((file, index) => (
                            <Grid item xs={12} md={6} key={index}> {/* Set grid item to take full width on small screens and half width on medium screens */}
                                <iframe
                                    title={`File ${index + 1}`}
                                    style={{ width: '100%', height: '100px', borderRadius: '0.75rem', marginBottom: '0.75rem' }}
                                    src={`https://chaurasiyabuckets.s3.ap-south-1.amazonaws.com/public/assets/${file}`}
                                />
                            </Grid>
                        ))}
                    </Grid>


                </WidgetWrapper>
            </Box>
        </Box>
    );
};
