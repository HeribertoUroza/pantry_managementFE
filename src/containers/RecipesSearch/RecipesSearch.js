import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase';

//COMPONENTS
import { Weekdays } from '../../components/RecipeSearch/WeekdaysContainer';
import { SearchResults } from '../../components/RecipeSearch/SearchResults';
import { SearchForm } from '../../components/RecipeSearch/SearchForm';
import { WeekdayDisplay } from '../../components/RecipeSearch/WeekdayDisplay';

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
                { weekday_name: 'Monday', weekday_id: 1, date: 'June 1, 2019', scheduled: false, recipe: {} },
                { weekday_name: 'Tuesday', weekday_id: 2, date: 'June 1, 2019', scheduled: false, recipe: {} },
                { weekday_name: 'Wednesday', weekday_id: 3, date: 'June 1, 2019', scheduled: false, recipe: {} },
                { weekday_name: 'Thursday', weekday_id: 4, date: 'June 1, 2019', scheduled: false, recipe: {} },
                { weekday_name: 'Friday', weekday_id: 5, date: 'June 1, 2019', scheduled: false, recipe: {} }
            ],
            inputValue: "",
            error: '',
            showAlert: false,
            alertMessage: '',
            token: ''
        }
    }

    componentDidMount() {
        M.AutoInit();
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // ..... DO YOUR LOGGED IN LOGIC
                this.setState({ userEmail: user.email, userId: user.uid }, () => {

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
            url: `http://localhost:11235/recipe/user/1`,
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
            const results = this.state.recipes.filter(recipes => recipes.recipe_name.toLowerCase().includes(query) /*recipes.toLowerCase().includes(list)*/)
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
            this.setState({ weekday_id: 1, inputValue: "", queryResults: [], showAlert: true, alertMessage: 'You have a full week scheduled! Save your selections!' })
        } else {
            newWeekdays[weekday].recipe = recipe;
            this.setState({ weekdays: newWeekdays, weekday_id: weekday + 2 })
        }
    }

    saveMealSchedule = () => {
        const weekdays = this.state.weekdays;
        for (let i = 0; i < weekdays.length; i++) {
            if (weekdays[i].recipe.recipe_name) {
                const requestBody = {
                    user_id: 1,
                    recipe_id: weekdays[i].recipe.recipe_id,
                    day_id: weekdays[i].weekday_id,
                    date: '06/02/2019',
                    cooked: false,
                };
                axios({
                    method: 'post',
                    url: 'http://localhost:11235/mealSchedule/',
                    headers: { 'token': this.state.token },
                    data:  requestBody 
                })
                    .then((res) => {
                        console.log(res)
                        this.setState({ alertMessage: 'You have succesfully scheduled your meals!', showAlert: true })
                    })
            }
        }
    }

    render() {
        const { weekdays, queryResults, weekday_id, showAlert, alertMessage, inputValue } = this.state;
        const alert = <div className="alert alert-success" role="alert">
            {alertMessage}</div>

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container fluid' style={{ marginTop: "40px" }}>
                                        <div><h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Plan your meals for the upcoming week!</h1></div>
                                        <div className='row'>
                                            <Weekdays weekdays={weekdays} />
                                        </div>
                                        <div className='container'>
                                            <WeekdayDisplay weekday_id={weekday_id} />
                                        </div>
                                    </div>
                                    <div className='container'>
                                        {showAlert ? alert : <br></br>}
                                        <SearchForm onChange={this.handleOnChange} inputValue={inputValue} />
                                        <SearchResults queryResults={queryResults} onClick={this.addRecipeToWeek} />
                                    </div>
                                    <div className="fixed-action-btn">
                                        <a className="btn-floating btn-large red">
                                            <i className="large material-icons" onClick={this.saveMealSchedule}>mode_edit</i>
                                        </a>
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

