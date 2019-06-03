import React  from 'react';
import Moment from 'react-moment';
 
export default class MyComponent extends React.Component {
    render() {
        const date = new Date();
        const day = date.getDay();
        let daysToAdd = 0;
        let daysToEnd = 5;
        if(day === 0){ //sunday
            daysToAdd =1;
            daysToEnd =5;
        }
        if(day === 2){//Tuesday
            daysToAdd =6;
            daysToEnd =11;
        }
        if(day === 3){//Wednesday
            daysToAdd =5;
            daysToEnd =10;
        }
        if(day === 4){//Thursday
            daysToAdd =4;
            daysToEnd =9;
        }
        if(day === 5){//Friday
            daysToAdd =3;
            daysToEnd =8;
        }
        if(day === 6){//Saturday
            daysToAdd =2;
            daysToEnd =7;
        }

        return (
            <div>
                <h5>Start of the Week:</h5>
                <Moment add={{ days: daysToAdd}}>{date}</Moment>
                <h5>End of the Week:</h5>
                <Moment add={{ days: daysToEnd}}>{date}</Moment>
            </div>
        );
    }
}
