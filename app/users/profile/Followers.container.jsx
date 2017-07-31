import React, {Component} from 'react';
import UserRowDetails from '../../home/suggestList/UserRowDetails.component';
import {connect} from 'react-redux';
import {clearFollowersFollows} from '../../../services/Users.service';

const dispatchPropsToBinding = (dispatch, ownProps) => ({
    clearFollowersFollows: () => dispatch(clearFollowersFollows())
});

@connect(null, dispatchPropsToBinding)
export default class Followers extends Component {
    constructor() {
        super();
        this.state = {
            listUser: [],
            listInfinityUser: []
        };
        this.scrolledNwaitForUpdate = false;
    }

    componentWillMount() {
        this.props.clearFollowersFollows();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if (!this.scrolledNwaitForUpdate) {
                this.scrolledNwaitForUpdate = true;
                this.infinitiScrollHandle();
            }
        }
    }

    infinitiScrollHandle() {
        this.setState({
            listUser: this.state.listUser.concat(this.state.listInfinityUser)
        }, () => this.scrolledNwaitForUpdate = false);
    }

    render() {
        return (<div id="user-list" className="followers-list">
            {this.props.followers.map((user, key) => {
                return <UserRowDetails key={key} userDetails={user}/>
            })}
        </div>);
    }
}