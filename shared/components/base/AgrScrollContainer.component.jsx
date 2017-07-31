import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {throttle} from 'lodash';

export default class AgrScrollContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            scrolledToBottom: false
        };

        this._win = window;
        this._doc = document;
        this._scrollListener = null;
        this.containerHeight = 0;
    }

    calculateTopPosition(el) {
        if(!el) {
            return 0;
        }
        return el.offsetTop + this.calculateTopPosition(el.offsetParent);
    }

    scrollListener() {
        if (!this._element) return;
        let _scrollTop = typeof this._win.pageYOffset !== 'undefined' ?
            this._win.pageYOffset :
            (this._doc.documentElement || this._doc.body.parentNode || this._doc.body).scrollTop;
        let offset = this.calculateTopPosition(this._element) + this._element.offsetHeight - _scrollTop - this._win.innerHeight;

        if (offset < Number(this.props.threshold)) {
            this.containerHeight = this._element.clientHeight;
            let nextPageIndex = this.state.pageIndex + 1;
            this.setState({
                pageIndex: this.state.scrolledToBottom ? this.state.pageIndex : nextPageIndex,
                scrolledToBottom: true
            });
        }

        if (this.containerHeight !== this._element.clientHeight && this.state.scrolledToBottom) {
            this.setState({
                scrolledToBottom: false
            })
        }
    }

    setScroll(bool) {
        this.setState({
            scrolledToBottom: bool
        })
    }

    attachListener() {
        this._scrollListener = throttle(::this.scrollListener, 3000);
        this._win.addEventListener('scroll', this._scrollListener);
        this._win.addEventListener('resize', this._scrollListener);
        if (this.props.initialRun) this._scrollListener();
    }

    detachListener() {
        this._win.removeEventListener('scroll', this._scrollListener);
        this._win.removeEventListener('resize', this._scrollListener);
        this._scrollListener = null;
    }

    componentDidMount() {
        try {
            window.setTimeout(() => {
                this.attachListener();
            }, this.props.initialRun ? 0 : 5000)
        } catch (e) {
            this.attachListener();
        }
    }

    componentWillUnmount() {
        this.detachListener();
    }

    render() {

        return (
            <div
                className="agora-scroll-container"
                ref={(e) => this._element = e}
            >
                {
                    React.cloneElement(
                        this.props.children,
                        {
                            ...this.props.children.props,
                            ...this.props,
                            setScroll: ::this.setScroll,
                            pageIndex: this.state.pageIndex,
                            scrolledToBottom: this.state.scrolledToBottom
                        }
                    )
                }
            </div>
        )
    }
}

AgrScrollContainer.propTypes = {};

AgrScrollContainer.defaultProps = {
    threshold: 20,
    initialRun: false
};