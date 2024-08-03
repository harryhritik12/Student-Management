import React, { useState } from 'react';
import { PersistentDrawerLeft } from "../../components/student/navbar";
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { TimetableComponent } from '../../components/student/timetable.js';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper.js';
import FlexBetween from '../../components/FlexBetween.js';


export const Timetable = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { palette } = useTheme();
    const main = palette.primary.main;
    const medium = palette.neutral.medium;
    const [timetableData, setTimetableData] = useState(null);
    const userId = useSelector((state) => state.user.rollNumber);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let semester = data.get('semester');

        try {
            const response = await fetch(`http://localhost:3001/student/${userId}/timetable`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ semester }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch timetable data');
            }

            const data = await response.json();
            setTimetableData(data);
        } catch (error) {
            console.error(error.message);
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
                    <Typography color={main}
                        variant="h3"
                        fontWeight="500"
                        align='center'
                        mb="2rem"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                            },
                        }}>
                        TIME-TABLE
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing="2rem"columnSpacing="5rem">
                            <Grid item xs={6}>
                                <TextField
                                    id="program"
                                    label="Program"
                                    name="program"
                                    defaultValue={user.program}
                                    sx={{ 
                                        ml: "5rem",
                                        width: "80%" }}
                                    variant="filled"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="branch"
                                    label="Branch"
                                    name="branch"
                                    defaultValue={user.branch}
                                    sx={{ width: "80%" }}
                                    variant="filled"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="batch"
                                    label="Batch"
                                    name="batch"
                                    defaultValue={user.batch}
                                    sx={{ ml: "5rem",width: "80%" }}
                                    variant="filled"
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Semester"
                                    variant="outlined"
                                    name="semester"
                                    id="semester"
                                    sx={{ width: "80%" }}
                                />
                            </Grid>
                      
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    sx={{
                                        width: "82%",
                                        ml: "5rem",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": { color: palette.primary.main },
                                    }}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>

                    <FlexBetween mt="4rem">
                        {timetableData && <TimetableComponent data={timetableData} />}
                    </FlexBetween>
                </WidgetWrapper>
            </Box>
        </Box>
    );
};
