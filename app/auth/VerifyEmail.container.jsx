import React, {Component} from 'react';
import {connect} from 'react-redux';
import {verifyEmail} from "../../services/Users.service";

const dispatchToPropsBinding = (dispatch, ownProps) => ({
    verifyEmail: (token) => dispatch(verifyEmail(token))
});

@connect(null, dispatchToPropsBinding)
export default class VerifyEmail extends Component {
    componentWillMount() {
        if (this.props.location.query.token) {
            this.props.verifyEmail(this.props.location.query.token);
        }
    }

    render() {
        return (<div></div>);
    }
}