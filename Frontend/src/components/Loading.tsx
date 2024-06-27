import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
    return (
        <Box className="flex justify-center items-center min-h-screen">
            <CircularProgress color="primary" size={50} disableShrink />
        </Box>
    );
};

export default Loading;
