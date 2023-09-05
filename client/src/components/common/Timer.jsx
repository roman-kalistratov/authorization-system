import { Typography } from '@mui/material'
import React, { useEffect } from 'react'

const Timer = ({ timeLeft, setTimeLeft }) => {
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft >= 1) {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            } else {
                clearInterval(interval);
                setTimeLeft(0);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timeLeft, setTimeLeft]);


    return (
        <Typography variant="h4" color="text.secondary" align="center" sx={{ mt: 2 }}>
            {timeLeft >= 0 ? formatTime(timeLeft) : '0:00'}
            {timeLeft === 0 && <Typography>code expired, try again later</Typography>}
        </Typography>
    )
}

export default Timer