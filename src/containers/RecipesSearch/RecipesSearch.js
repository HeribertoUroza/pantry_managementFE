import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';

//COMPONENTS
import { Weekdays } from '../../components/RecipeSearch/WeekdaysContainer';
import { SearchResults } from '../../components/RecipeSearch/SearchResults';
import { SearchForm } from '../../components/RecipeSearch/SearchForm';
import { WeekdayDisplay } from '../../components/RecipeSearch/WeekdayDisplay';
import Dates from '../../components/RecipeSearch/Dates';

//CONTEXT
import AuthContext from '../../context/auth';

//MATERIALIZE
import M from 'materialize-css'

class RecipesSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: [],
            user_id: null,
            queryResults: [],
            token: '',
            current_week: '',
            weekday_id: 1,
            weekdays: [
                { weekday_name: 'Monday', weekday_id: 1, recipe: { ingredients: [] } },
                { weekday_name: 'Tuesday', weekday_id: 2, recipe: { ingredients: [] } },
                { weekday_name: 'Wednesday', weekday_id: 3, recipe: { ingredients: [] } },
                { weekday_name: 'Thursday', weekday_id: 4, recipe: { ingredients: [] } },
                { weekday_name: 'Friday', weekday_id: 5, recipe: { ingredients: [] } }
            ],
            inputValue: "",
            showAlert: false,
            alertMessage: '',
            token: '',
            startDate: new Date(),
            selectedIngredients: [],
            saveAlert: false,
        }
    }

    componentDidMount() {
        M.AutoInit();
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // ..... DO YOUR LOGGED IN LOGIC
                this.setState({ userEmail: user.email, userId: user.uid, user_id: this.props.id }, () => {

                    firebase.auth().currentUser.getIdToken(false)
                        .then((token) => {
                            this.setState({ token });
                            return token;
                        })
                        .then((token) => {
                            this.getAllUserRecipes(token)
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            }
        })
    }

    getAllUserRecipes = (token) => {
        return axios({
            method: 'get',
            url: `http://localhost:11235/recipe/user/${this.props.id}`,
            headers: { 'token': token }
        })
            .then((response) => {
                const data = response.data.data;
                this.setState({ recipes: data });
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }


    filterListByQuery = (query) => {
        if (query.length === 0 || query === "" || Number(query)) {
            this.setState({ queryResults: [], inputValue: "" });
        }
        else {
            const results = this.state.recipes.filter(recipes => recipes.recipe_name.toLowerCase().includes(query))
            this.setState({ queryResults: results, inputValue: query });
        }
    }

    handleOnChange = (e) => {
        const query = e.target.value;
        this.filterListByQuery(query);
    }

    addRecipeToWeek = (recipe) => {
        const weekday = this.state.weekday_id - 1;
        const weekdays = this.state.weekdays;
        const newWeekdays = weekdays;
        if (this.state.weekday_id > 5) {
            this.setState({ weekday_id: 1, inputValue: "", queryResults: [], showAlert: true, alertMessage: 'You have a full week scheduled! Save your selections!', saveAlert: true })
        } else {
            this.getIngredientsByRecipeID(recipe.recipe_id)
                .then((ingredients) => {
                    newWeekdays[weekday].recipe = recipe;
                    return ingredients

                })
                .then((ingredients) => {
                    newWeekdays[weekday].recipe.ingredients = ingredients;
                    this.setState({ weekdays: newWeekdays, weekday_id: weekday + 2, selectedIngredients: ingredients })
                })
        }
    }

    getIngredientsByRecipeID = (recipeID) => {
        return axios({
            method: 'get',
            url: `http://localhost:11235/ingredient/recipe/${recipeID}`
        })
            .then((response) => {
                const data = response.data.data;
                this.setState({ selectedIngredients: data });
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    saveMealSchedule = () => {
        const weekdays = this.state.weekdays;
        for (let i = 0; i < weekdays.length; i++) {
            if (weekdays[i].recipe.recipe_name) {
                const dayDate = document.getElementById(`day${weekdays[i].weekday_id}`).innerText;
                const requestBody = {
                    user_id: this.state.user_id,
                    recipe_id: weekdays[i].recipe.recipe_id,
                    day_id: weekdays[i].weekday_id,
                    date: dayDate,
                    cooked: false,
                    current_week: false,
                };
                axios({
                    method: 'post',
                    url: 'http://localhost:11235/mealSchedule/',
                    headers: { 'token': this.state.token },
                    data: requestBody
                })
                    .then((res) => {
                        console.log(res)
                        this.setState({ alertMessage: 'You have succesfully scheduled your meals!', showAlert: true, inputValue: "", saveAlert: false })
                    })
            }
        }
    }

    render() {
        const { weekdays, queryResults, weekday_id, showAlert, alertMessage, inputValue, saveAlert } = this.state;
        const alert = <div className="alert alert-success" role="alert">
            {alertMessage}</div>

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container-fluid' style={{ marginTop: "40px" }}>
                                        <span onClick={this.props.click} style={{ cursor: "pointer", marginRight: "auto" }}><i className="material-icons">keyboard_backspace</i></span>
                                        <div><h1 style={{ fontWeight: "bold", fontSize: "50px", textAlign: "center" }}>Plan your meals for the new week!</h1>
                                            <Dates></Dates>
                                        </div>
                                        <div className='row'>
                                            <Weekdays weekdays={weekdays} />
                                        </div>
                                        <div className='row'>
                                            <WeekdayDisplay className="text-center" weekday_id={weekday_id} />
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <div className="row">
                                            {showAlert ? alert : <br></br>}
                                        </div>
                                        <div className="row">
                                            <div className="col-3">
                                                <SearchForm onChange={this.handleOnChange} inputValue={inputValue} />

                                            </div>
                                            <div className="col-5">
                                                <SearchResults queryResults={queryResults} onClick={this.addRecipeToWeek} />
                                            </div>
                                            <div className="col-3">
                                                <div className="row">
                                                    {
                                                        saveAlert === true ? <a className="btn-small black pulse" onClick={this.saveMealSchedule} style={{ color: "white" }}>SUBMIT WEEK</a> :
                                                            <a className="btn-small black" style={{ color: "white" }} onClick={this.saveMealSchedule}>SUBMIT WEEK<i className="large material-icons" style={{ color: "white" }}></i></a>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col"></div>
                                        </div>

                                    </div>
                                </>
                            )
                        }
                    }
                }
            </AuthContext.Consumer>

        );
    }
}

export default withRouter(RecipesSearch)

