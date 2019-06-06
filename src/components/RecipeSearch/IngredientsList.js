import React from 'react';



const IngredientsList = (props) => {

    const IngredientsList = props.ingredients;
    if (IngredientsList.length === 0) {
        return <span>No recipe selected.</span>
    }

    return IngredientsList.map((ingredient, index) => {
        return <li style={{listStyleType: "circle"}} key={index}><span>{ingredient.ingredient_name}  {ingredient.ingredient_weight} {ingredient.ingredient_weight_type}</span></li>
    })
}

export { IngredientsList };