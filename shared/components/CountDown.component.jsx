/**
 * Created by kanguyen on 11/1/16.
 */
import React, {Component, PropTypes} from 'react';
import moment from 'moment';

/**
 * Count down module
 * A simple count down component.
 **/
export default class CountDown extends Component {

    constructor(props) {
        super(props)
        this.state = {remaining: null}
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    DateBetween(startDate, endDate) {
        let second = 1000;
        let minute = second * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let distance = endDate - startDate;
        if (distance < 0) {
            return "CLOSED";
        }

        let days = Math.floor(distance / day);
        let hours = Math.floor((distance % day) / hour);
        let minutes = Math.floor((distance % hour) / minute);
        let seconds = Math.floor((distance % minute) / second);

        var day_description;
        var hour_description;
        var min_description;
        var sec_description;

        if (days == 1) {
            day_description = ' D ' + this.props.seperate + ' ';
        } else {
            day_description = ' D ' + this.props.seperate + ' ';
        }

        if (hours == 1) {
            hour_description = ' H ' + this.props.seperate + ' ';
        } else {
            hour_description = ' H ' + this.props.seperate + ' ';
        }

        if (minutes == 1) {
            min_description = ' M ' + this.props.seperate + ' ';
        } else {
            min_description = ' M ' + this.props.seperate + ' ';
        }

        if (seconds == 1) {
            sec_description = ' S';
        } else {
            sec_description = ' S';
        }

        let between = days + day_description;
        between += hours + hour_description;
        between += minutes + min_description;
        between += seconds + sec_description;

        return between;
    }

    tick() {
        let startDate = moment().valueOf();
        let endDate = moment(this.props.options.endDate).unix() * 1000;
        let remaining = '';
        if (!!endDate) {
            remaining = this.DateBetween(startDate, endDate)
        }
        this.setState({remaining: remaining});
        if (this.state.remaining == 'CLOSED') {
            clearInterval(this.interval);
            if (!!this.props.handleAfterCountDownFinish) {
                this.props.handleAfterCountDownFinish();
            }
        }

    }

    render() {
        return (
            <div className="react-count-down">
                <i className="agr-clock"></i>
                <span className="date"> {this.state.remaining}&nbsp;</span>
                {this.state.remaining != 'CLOSED' ? <span className="prefix"> {this.props.options.prefix}</span> : ''}
            </div>
        )
    };
}

CountDown.defaultProps = {
    seperate: '-'
}
