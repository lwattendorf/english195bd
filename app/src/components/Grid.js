import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

function GridRow() {
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    React.useEffect(() => {
        if (!width || !height) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        const handleWindowResize = (event) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleWindowResize);
    }, [width,height]);

    return [...Array(Math.floor(height / 10))].map((v, i) => (
        <div
            key={i}
            style={{
                background: 'rgba(255, 0, 0, 0.2)',
                width: `${width}px`,
                height: '1px',
                position: 'absolute',
                top: `${i * 10}px`,
                left: `${0}px`,
            }}
        ></div>
    ));
}

function GridColumn() {
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    React.useEffect(() => {
        if (!width || !height) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        const handleWindowResize = (event) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleWindowResize);
    }, [width, height]);

    return [...Array(Math.floor(width/10))].map((v, i) => (
        <div
            key={i}
            style={{
                background: 'rgba(0, 0, 255, 0.2)',
                height: `${height}px`,
                width: '1px',
                position: 'absolute',
                left: `${i * 10}px`,
                top: `${0}px`,
            }}
        ></div>
    ));
}

export default function Grid() {
    const [width, setWidth] = React.useState(null);
    const [height, setHeight] = React.useState(null);
    const settings = useSelector((state) => state.app.settings);
    const [showGrid, setShowGrid] = React.useState(settings && settings.includes('grid'))

    React.useEffect(() => {
        setShowGrid(settings && settings.includes('grid'));
        
        if (!width || !height) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        const handleWindowResize = (event) => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        
        window.addEventListener('resize', handleWindowResize);
    }, [settings, width, height]);

    return (
        showGrid ? <div>
            <GridRow />
            <GridColumn />
            <div
                style={{
                    position: 'absolute',
                    top: `${0}px`,
                    left: `${width - 100}px`,
                    margin: '10px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >
                    (
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {width}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {0}
                    </Typography>
                    )
                </Typography>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: `${height - 50}px`,
                    left: `${width - 100}px`,
                    margin: '10px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >
                    (
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {width}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {height}
                    </Typography>
                    )
                </Typography>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: `${0}px`,
                    left: `${0}px`,
                    margin: '10px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >
                    (
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {0}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {0}
                    </Typography>
                    )
                </Typography>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: `${height - 50}px`,
                    left: `${0}px`,
                    margin: '10px',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ display: 'flex', alignItems: 'baseline' }}
                >
                    (
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'blue', paddingRight: '2px' }}
                    >
                        {0}
                    </Typography>
                    ,
                    <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ color: 'red', paddingLeft: '2px' }}
                    >
                        {height}
                    </Typography>
                    )
                </Typography>
            </div>
        </div> : <div></div>
    );
}
