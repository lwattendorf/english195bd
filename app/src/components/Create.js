import './Home.css';
import React from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Navbar';
import Tooltip from '@mui/material/Tooltip';
import { setShowTooltip } from '../appReducer';
import { useAuth } from '../useAuth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const settings = useSelector((state) => state.app.settings);
    const { user, auth } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHover, setIsHover] = React.useState(false);

    const [showLogs, setShowLogs] = React.useState(
        settings && settings.includes('code')
    );
    const [displayName, setDisplayName] = React.useState(null);
    const [profilePic, setProfilePic] = React.useState(null);

    const handleMouseEnterName = () => {
        dispatch(setShowTooltip(true));
    };
    const handleMouseLeaveName = () => {
        dispatch(setShowTooltip(false));
    };

    const handleMouseEnter = () => {
        setIsHover(true);
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

    React.useEffect(() => {
        setShowLogs(settings && settings.includes('code'));

        if (user !== null && user !== undefined) {
            setDisplayName(user.displayName);
            user.providerData.forEach((profile) => {
                setProfilePic(profile.photoURL);
            }); //this will give you all the urls once there is user data
        }
    }, [settings, user, profilePic, auth]);

    return user ? (
        <div className="flexContainer">
            <Navbar selected="create"></Navbar>
        </div>
    ) : (
        <Typography noWrap variant="subtitle2">
            Logging you in...
            <Button
                size="large"
                className="button"
                variant="contained"
                disableElevation
                onClick={handleSignOut}
            >
                Logout
            </Button>
        </Typography>
    );
}
