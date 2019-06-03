import React from 'react';

const WeekdayDisplay = (props) => {

    const { weekday_id } = props;
    let dayName = '';
    let message = 'Add your meal for';

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
    if(weekday_id > 5) {
        message= 'Selection Completed!'
    }
    return <>
        <div class="row">
        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>{message} {dayName}!</h1>
        </div>
    </>
}

export { WeekdayDisplay };