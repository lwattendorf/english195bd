const SET_SETTINGS = 'SET_SETTINGS';
const SET_SHOW_TOOLTIP = 'SET_SHOW_TOOLTIP';

const initialState = {
    settings: ['cursor', 'timer'],
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
        default:
            return state;
    }
}
