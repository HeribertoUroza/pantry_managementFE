import React from 'react';

const DayCard = (props) => {
    const { day } = props;

    return <>
        <div className="card" style={{width: "18rem"}}>
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{day.weekday_name}</h5>
                <p className="card-text">Recipe Name</p>
            </div>
        </div>
    </>
}

export { DayCard };