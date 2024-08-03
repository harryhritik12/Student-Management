import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import WidgetWrapper from '../WidgetWrapper';
import FlexBetween from '../FlexBetween';

export function UserDetails() {
  const userData = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.primary.main;
  const medium = palette.neutral.medium;

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
          PROFILE
        </Typography>
      </Box>

      {userData && (
        <>
          <FlexBetween>
            <Typography color={medium} variant="body1" m="1rem 0" fontSize="0.95rem" >
              NAME: {userData.firstName} {userData.lastName}
            </Typography>
          </FlexBetween>
          <FlexBetween >

            <Typography color={medium} variant="body1" m="1rem 0" fontSize="0.95rem">
              STAFF ID: {userData.staffID}
            </Typography>
          </FlexBetween>

          <FlexBetween>
            <Typography color={medium} variant="body1" m="1rem 0" fontSize="0.95rem">
              YEAR OF JOINING: {userData.yearOfJoining}
            </Typography>
          </FlexBetween>

          <FlexBetween>
            <Typography color={medium} variant="body1" m="1rem 0" fontSize="0.95rem">
              EMAIL: {userData.email}
            </Typography>
          </FlexBetween>


        </>
      )}
    </WidgetWrapper>
  );
}

