import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AuthDispatchBindings} from "./Auth.bindings";

@connect(null, AuthDispatchBindings)
export default class Logout extends Component {
    componentWillMount() {
        this.props.onLogout();
    }

    render() {
        return (<div></div>);
    }
}