import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Mouse() {
    const [mousePos, setMousePos] = React.useState({});
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const settings = useSelector((state) => state.app.settings);
    const showTooltip = useSelector((state) => state.app.showTooltip);
    const [showCursor, setShowCursor] = React.useState(
        settings && settings.includes('cursor') && !showTooltip
    );
    const [abbreviateCursor, setAbbreviateCursor] = React.useState(false);

    React.useEffect(() => {
        setShowCursor(settings && settings.includes('cursor') && !showTooltip);

        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        if (!mousePos.x || !mousePos.y) {
            setShowCursor(false);
        }
        if (!width || !height) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        } else {
            if (mousePos.x > width - 150) {
                setAbbreviateCursor(true);
            } else {
                setAbbreviateCursor(false);
            }
            if (mousePos.x < 10 || mousePos.x > width - 20) {
                setShowCursor(false);
            }
            if (mousePos.y < 10 || mousePos.y > height - 40) {
                setShowCursor(false);
            }
        }
        const handleWindowResize = (event) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [mousePos, width, height, settings, showTooltip, showCursor]);

    return showCursor ? (
        !abbreviateCursor ? (
            <div
                style={{
                    position: 'absolute',
                    top: `${mousePos.y + 10}px`,
                    left: `${mousePos.x + 20}px`,
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >
                    mouse @ position (
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {mousePos.x}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {mousePos.y}
                    </Typography>
                    )
                </Typography>
            </div>
        ) : (
            <div
                style={{
                    position: 'absolute',
                    top: `${mousePos.y + 10}px`,
                    left: `${mousePos.x - 60}px`,
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >(
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {mousePos.x}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {mousePos.y}
                    </Typography>
                    )
                </Typography>
            </div>
        )
    ) : (
        <div></div>
    );
}
