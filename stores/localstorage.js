export const loadState = () => {
    let serializedState = {};

    try {
        serializedState = localStorage.getItem('state');
        !!serializedState && (serializedState = JSON.parse(serializedState))
    } catch (err) {
        console.log('Error loading from localStorage');
    }

    return serializedState;
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log('Error saving to localStorage');
    }
};