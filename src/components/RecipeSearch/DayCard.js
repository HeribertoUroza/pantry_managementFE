import React from 'react';
import { IngredientsList } from './IngredientsList';

const DayCard = (props) => {
    const { day, } = props;
    const  ingredients = day.recipe.ingredients;

    return <>
        <div className="row">
            <div className="col s12 m6">
                <div className="card s12" style={{ height: "auto" }}>
                    <div className="card-image" style={{ overflow: "hidden" }}>
                        {
                            !day.recipe.recipe_image_url ? <img src='https://images.pexels.com/photos/6205/eating-table-kitchen-silver.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500' /> : <img src={day.recipe.recipe_image_url} />
                        }
                        <span className="card-title" style={{ fontWeight: "bolder", fontSize: "28px", textShadow: "2px 2px #000000" }}>{day.weekday_name}</span>
                    </div>
                    <div className="card-content">
                        <p style={{ fontWeight: "bold" }}>{day.recipe.recipe_name}</p>
                        <p>{day.recipe.recipe_notes}</p>
                    </div>
                    <div className="card-action">
                        <ul class="collapsible">
                            <li>
                                <div class="collapsible-header"><i class="material-icons">kitchen</i>Details</div>
                                <div class="collapsible-body"><IngredientsList ingredients={ingredients}/></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export { DayCard };