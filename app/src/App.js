import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-mono';
import Home from './components/Home.js';
import Timer from './components/Timer.js';
import Mouse from './components/Mouse.js';
import Grid from './components/Grid.js';
import Login from './components/Login.js';
import Create from './components/Create.js';
import PrivateRoute from './components/PrivateRoute.js';
import SettingToggleButtons from './components/SettingToggleButtons.js';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Grid></Grid>
            <Timer></Timer>
            <Router>
                <React.Fragment>
                    <Routes>
                        <Route exact path="/" element={<PrivateRoute />}>
                            <Route exact path="/" element={<Home />} />
                        </Route>
                        <Route exact path="/" element={<PrivateRoute />}>
                            <Route exact path="/create" element={<Create />} />
                        </Route>
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </React.Fragment>
            </Router>
            <Mouse></Mouse>
            <SettingToggleButtons></SettingToggleButtons>
        </ThemeProvider>
    );
}

const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: 12,
            fontFamily: 'roboto mono',
        },
        subtitle2: {
            fontSize: 12,
            fontFamily: 'roboto mono',
            color: 'red',
        },
        body1: {
            fontFamily: 'roboto',
        },
        h4: {
            fontFamily: 'roboto',
        },
        button: {
            padding: '10px 50px 10px 50px',
        },
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: 12,
                    fontFamily: 'roboto mono',
                    backgroundColor: 'white',
                    color: 'red',
                    border: '1px solid #dadde9',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: '#606060',
                    },
                },
            },
        },
    },
});

export default App;
