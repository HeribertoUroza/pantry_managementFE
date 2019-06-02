import React from 'react';

const DayCard = (props) => {
    const { day } = props;

    return <>
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                        <span className="card-title" style={{ fontWeight: "bolder", fontSize: "28px", textShadow: "2px 2px #000000" }}>{day.weekday_name}</span>
                    </div>
                    <div className="card-content">
                        <p>Recipe Notes</p>
                    </div>
                    <div className="card-action">
                        {/* <a href="#">This is a link</a> */}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export { DayCard };