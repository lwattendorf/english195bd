import './Home.css';
import React from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    signInWithPopup,
    GoogleAuthProvider,
    getAdditionalUserInfo,
} from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

export default function Login() {
    const settings = useSelector((state) => state.app.settings);
    const navigate = useNavigate();

    const [isHover, setIsHover] = React.useState(false);
    const [showLogs, setShowLogs] = React.useState(
        settings && settings.includes('code')
    );
    const [user, setUser] = React.useState(auth.currentUser);

    React.useEffect(() => {
        setShowLogs(settings && settings.includes('code'));
        setUser(auth.currentUser);
    }, [settings, user]);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const other = getAdditionalUserInfo(result);
                console.log({ credential, user, token, other });
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate('/');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log({
                    errorCode,
                    errorMessage,
                    email,
                    credential,
                });
                // ...
            });
    };

    return (
        <div className="flexContainer">
            <Typography variant="h4" sx={{ paddingTop: '16px' }}>
                Welcome to
            </Typography>
            <Typography variant="h3" sx={{ paddingBottom: '16px' }}>
                GlitchMe
            </Typography>
            <div
                className="buttonContainer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Button
                    size="large"
                    className="button"
                    variant="contained"
                    disableElevation
                    onClick={signIn}
                >
                    Enter
                </Button>
            </div>
            <Typography variant="subtitle1">
                {showLogs
                    ? isHover
                        ? 'state changed: "mouse enter"'
                        : 'state: "mouse exit"'
                    : ' '}
            </Typography>
        </div>
    );
}
