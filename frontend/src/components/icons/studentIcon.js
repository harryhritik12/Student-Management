import { Box } from "@mui/material"

export const StudentIcon = () => {
    return(
        <Box component="img" sx = {{height:100, width:100, maxHeight:{xs:233, md:167}, maxWidth:{xs:350, md:250}}}
            alt="Student"
            src="../../static/images/student.png"
        />
    );
}