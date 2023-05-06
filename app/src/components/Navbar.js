import './Home.css';
import React from 'react';
import { Typography, Button, ButtonGroup } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAuth } from '../useAuth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ selected }) {
    const settings = useSelector((state) => state.app.settings);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [isHover, setIsHover] = React.useState(false);

    const [showLogs, setShowLogs] = React.useState(
        settings && settings.includes('code')
    );

    const handleMouseEnter = (button) => {
        setIsHover(button);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const handleSignOut = () => {
        navigate('/login');
        signOut(auth)
            .then(() => {
                console.log('Signed out.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleNavigate = (screen) => {
        navigate(screen);
    };

    React.useEffect(() => {
        setShowLogs(settings && settings.includes('code'));
    }, [settings]);

    return (
        <div className="flexContainer">
            <ButtonGroup variant="text" aria-label="text button group">
                <Button
                    onMouseEnter={() => handleMouseEnter('home')}
                    onMouseLeave={handleMouseLeave}
                    key={'home-button'}
                    onClick={() => handleNavigate('/')}
                    disabled={selected === 'home'}
                >
                    Home
                </Button>
                <Button
                    onMouseEnter={() => handleMouseEnter('glitch')}
                    onMouseLeave={handleMouseLeave}
                    key={'about-button'}
                    onClick={() => handleNavigate('/glitch')}
                    disabled={selected === 'about'}
                >
                    Legacy
                </Button>
                <Button
                    onMouseEnter={() => handleMouseEnter('logout')}
                    onMouseLeave={handleMouseLeave}
                    key={'logout-button'}
                    onClick={handleSignOut}
                >
                    Logout
                </Button>
            </ButtonGroup>
            {showLogs &&
                (isHover ? (
                    <Typography
                        variant="subtitle1"
                        sx={{ display: 'flex', alignItems: 'baseline' }}
                    >
                        navbar state changed: "hover over
                        <Typography
                            noWrap
                            variant="subtitle2"
                            sx={{ color: 'blue', paddingLeft: '4px' }}
                        >
                            {isHover + '-button'}
                        </Typography>
                        "
                    </Typography>
                ) : (
                    <Typography noWrap variant="subtitle1">
                        {'navbar state: no hover'}
                    </Typography>
                ))}
        </div>
    );
}
