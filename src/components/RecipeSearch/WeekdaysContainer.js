import React from 'react';
import { DayCard } from './DayCard';


const Weekdays = (props) => {

    const weekdays = props.weekdays;

    return weekdays.map((day, index) => {
        return <div className="col s12 m6" style={{width:"100%", height:"auto"}} key={index}>
            <DayCard day={day}/>
        </div>
    })
}

export { Weekdays };
