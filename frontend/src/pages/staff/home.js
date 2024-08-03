import { AllComplainComponent } from '../../components/staff/allComplainComponent.js';
import { UserDetails } from '../../components/staff/details.js';
import { PersistentDrawerLeft } from '../../components/staff/navbar.js';
import { Box, useMediaQuery } from "@mui/material";
import { Typography, useTheme } from "@mui/material";

export const StaffHome = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
        <Box>
            <PersistentDrawerLeft />
            <Box
                width="100%"
                padding="2rem 17%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="space-between"
            >

                <Box
                    flexBasis={isNonMobileScreens ? "50%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}>
                    <UserDetails />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "50%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <AllComplainComponent/>
                </Box>

            </Box>

        </Box>
    )
}