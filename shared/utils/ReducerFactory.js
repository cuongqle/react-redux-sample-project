export default (initialState, eventDomain, swicthCb = () => {
}) =>
(state = initialState, action) => {
    if (action.domain !== eventDomain) return state;
    let newState = swicthCb(state, action);
    if (newState) return newState;

    if (action.state) return action.state;
    return state;
};
