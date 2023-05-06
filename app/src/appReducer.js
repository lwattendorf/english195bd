const SET_SETTINGS = 'SET_SETTINGS';
const SET_USER_SIGNED_IN = 'SET_USER_SIGNED_IN';
const SET_SHOW_TOOLTIP = 'SET_SHOW_TOOLTIP';

const initialState = {
    settings: ['cursor', 'timer'],
    userSignedIn: false,
    nameHovered: false
};

export const setSettings = (settings) => ({
    type: SET_SETTINGS,
    payload: settings,
});

export const setShowTooltip = (showTooltip) => ({
    type: SET_SHOW_TOOLTIP,
    payload: showTooltip,
});

export const setUserSignedIn = (userSignedIn) => ({
    type: SET_USER_SIGNED_IN,
    payload: userSignedIn,
});


// Use the initialState as a default value
export default function appReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case SET_SETTINGS: {
            return {
                ...state,
                settings: action.payload,
            };
        }
        case SET_SHOW_TOOLTIP: {
            return {
                ...state,
                showTooltip: action.payload,
            };
        }
        case SET_USER_SIGNED_IN: {
            return {
                ...state,
                userSignedIn: action.payload,
            };
        }
        default:
            return state;
    }
}
