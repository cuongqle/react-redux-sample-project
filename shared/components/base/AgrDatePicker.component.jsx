import React, {Component} from 'react';
import {DateRange, Calendar} from 'react-date-range';


const agoraTheme = {
    Day: {fontSize: "15px", fontWeight: "300"},
    DaySelected: {background: "#0036ff", color: "#fff"},
    DayInRange: {background: "#f6f6f6", color: "#000"},
    DateRange: {
        width: "570px",
        position: "absolute",
        top: "55px",
        right: "0",
        zIndex: "9999",
        border: "1px solid #ccc"
    },
    DayHover: {
        background: "#ffffff",
        color: "#7f8c8d",
        transform: "scale(1.1) translateY(-10%)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.4)"
    },
    MonthAndYear: {color: "#535353", fontSize: "18px", fontWeight: "700", lineHeight: "18px"},
    MonthButton: {background: "#fff"}
};

// const formattedToday = () => {
//     let today = new Date();
//     let day = today.getDate();
//     let month = today.getMonth() + 1; // January is 0
//     let year = today.getFullYear();
//
//     if (day < 10) {
//         day = '0' + day
//     }
//     if (month < 10) {
//         month = '0' + month
//     }
//     return month + '/' + day  + '/' + year;
// };

export class AgoraDateRange extends Component {

    render() {
        return (
            <DateRange
                theme={agoraTheme}
                {...this.props}
            />
        )
    }
}

export class AgoraCalendar extends Component {

    render() {
        return (
            <Calendar
                theme={agoraTheme}
                {...this.props}
            />
        )
    }
}

[AgoraDateRange, AgoraCalendar].map((component) => {
    component.propTypes = {
        style: React.PropTypes.object,
        date: React.PropTypes.string,
        startDate: React.PropTypes.string,
        endDate: React.PropTypes.string,
        linkedCalendars: React.PropTypes.bool,
        onInit: React.PropTypes.func,
        onChange: React.PropTypes.func,
        format: React.PropTypes.string
    };

    component.defaultProps = {
        format: "MM/DD/YYYY"
    };
});

