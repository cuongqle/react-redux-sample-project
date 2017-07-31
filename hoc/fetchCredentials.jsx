import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCredentials} from '../services/Users.service';

export default function fetchCredentials(Component) {
    let mapStateToProps = (state) => ({
        token: state.auth.token,
        credentials: state.auth.credentials
    });

    let dispatchToPropsBinding = (dispatch, ownProps) => ({
        fetchCredentials: (token) => { getCredentials(token).then(dispatch); }
    });

    @connect(mapStateToProps, dispatchToPropsBinding)
    class FetchCredentials extends React.Component {
        componentWillMount() {
            this.props.fetchCredentials(this.props.token);
        }

        render() {
            return <Component {...this.props} />
        }
    }

    return FetchCredentials;
}