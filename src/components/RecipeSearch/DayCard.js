import React from 'react';

const DayCard = (props) => {
    const { day } = props;

    return <>
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='...' />
                        <span className="card-title" style={{ fontWeight: "bolder", fontSize: "28px", textShadow: "2px 2px #000000" }}>{day.weekday_name}</span>
                    </div>
                    <div className="card-content">
                        <p>{day.recipe.recipe_name}</p>
                        <p>{day.recipe.recipe_notes}</p>
                    </div>
                    <div className="card-action">
                        {/* this link is not working yet */}
                        <a href="#" style={{color:"green"}}>See details</a>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export { DayCard };