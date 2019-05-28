import axios from 'axios';

const port = 9999;

//USERS
    //READ
    const readUser = (email) => {
        return axios({
            method: 'get',
            url: `http://localhost:${port}/user/email/${email}`,
        });
    };

    //POST
    const postUser = (name, username, email, dob, phone_number, diet_preference, food_limitations, food_allergies,firebaseUID) => {
        return axios({
            method: 'post',
            url: `http://localhost:${port}/user/`,
            data: {
                name: name,
                username: username,
                email: email, 
                dob: dob, 
                phone_number: phone_number,
                diet_preference: diet_preference,
                food_limitations: food_limitations, 
                food_allergies: food_allergies, 
            }
        });
    };

//MEAL SCHEDULE
    //READ
    const readMealSchedule = (user_id) => {
        return axios({
            method: 'get',
            url: `http://localhost:${port}/mealSchedule/user/${user_id}`,
        });
    };

//INGREDIENT
    //READ
    const readIngredient = (recipe_id) => {
        return axios({
            method: 'get',
            url: `http://localhost:${port}/ingredient/recipe/${recipe_id}`,
        });
    };


//RECIPES
    //READ 
    const readRecipes = (user_id) => {
        return axios({
            method: 'get',
            url: `http://localhost:${port}/recipe/user/${user_id}`,
        });
    };

export {
    postUser,
    readUser,
    readMealSchedule,
    readIngredient,
    readRecipes
}