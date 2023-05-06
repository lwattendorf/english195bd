import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridOnIcon from '@mui/icons-material/GridOn';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useDispatch, useSelector } from 'react-redux';
import { setSettings } from '../appReducer';

let ALL_SETTINGS = ['glitch', 'grid', 'cursor', 'timer', 'code']

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

export default function SettingToggleButtons() {
    const settingsState = useSelector((state) => state.app.settings);
    const [selectedSettings, setSelectedSettings] =
        React.useState(settingsState);
    const dispatch = useDispatch();
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const [showLogs, setShowLogs] = React.useState(settingsState && settingsState.includes('code'));

    const handleSetting = (event, settings) => {
        setSelectedSettings(settings);
        dispatch(setSettings(settings));
    };

    React.useEffect(() => {
        setShowLogs(settingsState && settingsState.includes('code'));
        if (!width || !height) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        const handleWindowResize = (event) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleWindowResize);
    }, [width, height, settingsState]);

    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                top: '40px',
                left: `${width - 275}px`,
            }}
        >
            <Stack direction="row" spacing={4}>
                <StyledToggleButtonGroup
                    value={selectedSettings}
                    onChange={handleSetting}
                    aria-label="text alignment"
                >
                    <ToggleButton value="glitch" aria-label="glitch">
                        <HeartBrokenIcon />
                    </ToggleButton>
                    <ToggleButton value="grid" aria-label="grid">
                        <GridOnIcon />
                    </ToggleButton>
                    <ToggleButton value="cursor" aria-label="cursor">
                        <AdsClickIcon />
                    </ToggleButton>
                    <ToggleButton value="timer" aria-label="timer">
                        <TimerOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton value="code" aria-label="code">
                        <CodeOutlinedIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Stack>
            <Typography variant="subtitle1">
                {showLogs && `settings state: ${settingsState}`}
            </Typography>
        </div>
    );
}
