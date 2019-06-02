import React from 'react';
import { identifier } from '@babel/types';

const WeekdayDisplay = (props) => {

    const { weekday_id } = props;
    let dayName = '';
    if (weekday_id === 1) {
        dayName = 'Monday'
    }
    if (weekday_id === 2) {
        dayName = 'Tuesday'
    }
    if (weekday_id === 3) {
        dayName = 'Wednesday'
    }
    if (weekday_id === 4) {
        dayName = 'Thursday'
    }
    if (weekday_id === 5) {
        dayName = 'Friday'
    }
    return <>
        <div class="row">
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Add your meal for {dayName}!</h1>
        </div>
    </>
}

export { WeekdayDisplay };