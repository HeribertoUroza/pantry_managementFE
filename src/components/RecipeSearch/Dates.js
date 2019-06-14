import React from 'react';
import Moment from 'react-moment';

export default class MyComponent extends React.Component {

    render() {
        const date = new Date();
        const day = date.getDay();
        let daysToAdd = 0;
        let daysToEnd = 4;
        if (day === 0) {
            daysToAdd = 1;
            daysToEnd = 5;
        }
        if (day === 2) {
            daysToAdd = 6;
            daysToEnd = 10;
        }
        if (day === 3) {
            daysToAdd = 5;
            daysToEnd = 9;
        }
        if (day === 4) {
            daysToAdd = 4;
            daysToEnd = 8;
        }
        if (day === 5) {
            daysToAdd = 3;
            daysToEnd = 7;
        }
        if (day === 6) {
            daysToAdd = 2;
            daysToEnd = 6;
        }

        return (
            <>
                <div style={{ marginTop: "30px" }} >
                    <div className='row'>
                        <div className="col s12 m7">
                            <h5 style={{ fontWeight: "bold" }}>Start of the week:</h5>
                            <Moment format="MMMM DD, YYYY" add={{ days: daysToAdd }} id="day1">{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align">
                            <h1 style={{ color: "white" }}>. </h1>
                            <Moment format="MMMM DD, YYYY" add={{ days: daysToAdd + 1 }} id="day2">{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align">
                            <h1 style={{ color: "white" }}>. </h1>
                            <Moment format="MMMM DD, YYYY" add={{ days: daysToAdd + 2 }} id="day3">{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align">
                            <h1 style={{ color: "white" }}>. </h1>
                            <Moment format="MMMM DD, YYYY" add={{ days: daysToAdd + 3 }} id="day4">{date}</Moment>
                        </div>
                        <div className="col s12 m7 right-align">
                            <h5 style={{ fontWeight: "bold" }}>End of the week:</h5>
                            <Moment format="MMMM DD, YYYY" add={{ days: daysToEnd }} id="day5">{date}</Moment>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}
