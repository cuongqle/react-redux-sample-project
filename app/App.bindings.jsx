export const AppPropsBindings = (state) => ({
    isLogged: state.auth.token ? true : false,
    notifications: state.notifications,
    popups: state.modals.popups
});