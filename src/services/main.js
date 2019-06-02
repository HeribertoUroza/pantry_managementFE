import axios from 'axios';

const port = 11235;

//USERS
    //READ
    const readUser = (token, email) => {
        return axios({
            method: 'get',
            headers: {'token': token},
            url: `http://localhost:${port}/user/email/${email}`,
        });
    };

    //POST
    const postUser = (name, username, email, dob, phone_number, diet_preference, food_limitations, food_allergies,firebase_uid) => {
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
                firebase_uid: firebase_uid
            }
        });
    };

//MEAL SCHEDULE
    //READ
    const readMealSchedule = (user_id) => {
        return axios({
            method: 'get',
            url: `http://localhost:${port}/mealSchedule/user/${user_id}
            `,
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

//PANTRY
    //READ
        const readPantry = (id) =>{
            return axios({
                method: 'get',
                url: `http://localhost:${port}/currentPantry/user/${id}`,
            });
        }

export {
    postUser,
    readUser,
    readMealSchedule,
    readIngredient,
    readRecipes,
    readPantry
}