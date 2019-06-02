import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
            error: ''
        }
    }

    componentDidMount() {
        M.AutoInit();
        //const user_id = this.props.id;
        console.log('token', this.props.token)
        axios.get(`http://localhost:11235/recipe/user/1`)
            .then((response) => {
                const data = response.data.data;
                this.setState({ recipes: data });
                return data;
            })
            .then((data) => {
                console.log(data);
            })
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
        if (weekday > 4) {
            this.setState({ weekday_id: 1 })
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
                    day_id: weekdays[i].weekday_id
                };
                axios.post('http://localhost:11235/mealSchedule/', requestBody)
                .then((res)=>{
                    console.log(res)
                })
            }
        }
    }

    render() {
        const { weekdays, queryResults, weekday_id } = this.state;

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container' style={{ marginTop: "40px" }}>
                                        <div><h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Plan your meals for the upcoming week!</h1></div>
                                        <div className='row'>
                                            <Weekdays weekdays={weekdays} />
                                        </div>
                                        <div className='container'>
                                            <WeekdayDisplay weekday_id={weekday_id} />
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <SearchForm onChange={this.handleOnChange} />
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

