import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { Weekdays } from '../../components/RecipeSearch/WeekdaysContainer';
import { SearchResults } from '../../components/RecipeSearch/SearchResults';


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
                { weekday_name: 'Monday', weekday_id: 1, date: 'June 1, 2019', scheduled: false },
                { weekday_name: 'Tuesday', weekday_id: 2, date: 'June 1, 2019', scheduled: false },
                { weekday_name: 'Wednesday', weekday_id: 3, date: 'June 1, 2019', scheduled: false },
                { weekday_name: 'Thursday', weekday_id: 4, date: 'June 1, 2019', scheduled: false },
                { weekday_name: 'Friday', weekday_id: 5, date: 'June 1, 2019', scheduled: false }
            ],
            inputValue: "",
            error: ''
        }
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

    componentDidMount() {
        M.AutoInit();
        //const user_id = this.props.id;
        axios.get(`http://localhost:11235/recipe/user/1`)
            .then((response) => {
                const data = response.data.data
                this.setState({ recipes: data })
                return data;
            })
            .then((data) => {
                console.log(data);
            })
    }

    addRecipeToWeek = (recipe) => {
        console.log(recipe);
    }


    render() {
        const { weekdays, queryResults } = this.state;

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container' style={{ marginTop: "40px" }}>
                                        <div><h1 style={{ fontWeight: "bold", fontSize: "30px" }}>Plan your meals</h1></div>
                                        <div className='row'>
                                            <Weekdays weekdays={weekdays} />
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <form>
                                            <div class="row">
                                                <div className="input-field col s12">
                                                    <textarea id="search" className="materialize-textarea" onChange={this.handleOnChange}></textarea>
                                                    <label htmlFor="search">Search Your Recipes</label>
                                                    <i className="material-icons prefix">search</i>
                                                </div>
                                            </div>
                                        </form>
                                        <SearchResults queryResults={queryResults} onClick={this.addRecipeToWeek} />
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

