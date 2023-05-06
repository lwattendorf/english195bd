import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Timer() {
    const [startTime, setStartTime] = React.useState(0);
    const [timer, setTimer] = React.useState(0);
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const settings = useSelector((state) => state.app.settings);
    const [showTimer, setShowTimer] = React.useState(
        settings && settings.includes('timer')
    );

    React.useEffect(() => {
        setShowTimer(settings && settings.includes('timer'));

        if (startTime === 0) {
            let now = Date.now();
            setStartTime(now);
            setTimer(setInterval(() => getTime(now), 1000));
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timer, startTime, settings, showTimer]);

    const getTime = (startTime) => {
        const time = Date.now() - startTime;

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    return showTimer ? (
        <div
            style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ display: 'flex', alignItems: 'baseline' }}
            >
                time:
                <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{ color: days > 0 ? 'red' : 'blue', padding: '4px' }}
                >
                    {days}
                </Typography>{' '}
                days,
                <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{ color: hours > 0 ? 'red' : 'blue', padding: '4px' }}
                >
                    {hours}
                </Typography>{' '}
                hours,
                <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{ color: minutes > 0 ? 'red' : 'blue', padding: '4px' }}
                >
                    {minutes}
                </Typography>{' '}
                minutes,
                <Typography
                    noWrap
                    variant="subtitle2"
                    sx={{ color: seconds > 0 ? 'red' : 'blue', padding: '4px' }}
                >
                    {seconds}
                </Typography>{' '}
                seconds
            </Typography>
        </div>
    ) : (
        <div></div>
    );
}
