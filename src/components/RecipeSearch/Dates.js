import React from 'react';
import Moment from 'react-moment';

export default class MyComponent extends React.Component {

    render() {
        const date = new Date();
        const day = date.getDay();
        const weekday_id = this.props.weekday_id;
        console.log('weeee', weekday_id)
        let daysToAdd = 0;
        let daysToEnd = 5;
        if (day === 0) { //sunday
            daysToAdd = 1;
            daysToEnd = 5;
            console.log(day)
        }
        if (day === 2) {//Tuesday
            daysToAdd = 6;
            daysToEnd = 11;
        }
        if (day === 3) {//Wednesday
            daysToAdd = 5;
            daysToEnd = 10;
        }
        if (day === 4) {//Thursday
            daysToAdd = 4;
            daysToEnd = 9;
        }
        if (day === 5) {//Friday
            daysToAdd = 3;
            daysToEnd = 8;
        }
        if (day === 6) {//Saturday
            daysToAdd = 2;
            daysToEnd = 7;
        }

        return (
            <>
                <div style={{ marginTop: "30px" }} >
                    <div className='row'>
                        <div className="col s12 m7">
                            <h5 style={{ fontWeight: "bold" }}>Start of the week:</h5>
                            <Moment format="dddd MMMM DD, YYYY" add={{ days: daysToAdd }}>{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align">
                        <h1 style={{color:"white"}}>. </h1>
                            <Moment format="dddd MMMM DD, YYYY" add={{ days: daysToAdd + 1 }}>{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align"> 
                        <h1 style={{color:"white"}}>. </h1>                          
                            <Moment format="dddd MMMM DD, YYYY" add={{ days: daysToAdd + 2 }}>{date}</Moment>
                        </div>
                        <div className="col s12 m7 hide-on-med-and-down center-align">
                            <h1 style={{color:"white"}}>. </h1>
                            <Moment format="dddd MMMM DD, YYYY" add={{ days: daysToAdd + 3 }}>{date}</Moment>
                        </div>
                        <div className="col s12 m7 right-align">
                            <h5 style={{ fontWeight: "bold" }}>End of the week:</h5>
                            <Moment format="dddd MMMM DD, YYYY" add={{ days: daysToEnd }}>{date}</Moment>
                        </div>
                    </div>
                </div>
            </>

        )}
}
