import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'bulma/css/bulma.css'
import { Media, Image, Content } from 'reactbulma';
import axios from 'axios';


//CONTEXT
import AuthContext from '../../context/auth';


//MATERIALIZE
import M from 'materialize-css'


class RecipeSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: [],
            ingredients: [],
            display: [],
            inputValue: "",
            error: ''
        }
    }

    handleOnChange = (e) => {
        const query = e.target.value;
        console.log("query", query)

        const filterRecipeList = (query) => {
            const results = this.state.recipes.filter(recipes => recipes.recipe_name.toLowerCase().includes(query) /*recipes.toLowerCase().includes(list)*/)
            this.setState({ display: results, inputValue: query })
        }
        if (query.length === 0 || query === "" || Number(query)) {
            this.setState({ display: this.state.recipes, inputValue: "" })
        }
        else {
            filterRecipeList(query)
        }
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


    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (
                                <>
                                    <div className='container'>
                                        <div className="row">
                                            <div className="col"></div>
                                            <div className="col">
                                                <form>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <textarea id="search" className="materialize-textarea" onChange={this.handleOnChange}></textarea>
                                                            <label htmlFor="search">Search Your Recipes</label>
                                                            <i className="material-icons prefix">search</i>
                                                        </div>
                                                    </div>
                                                </form>
                                                {
                                                    this.state.display.map((recipe, i) => {
                                                        return <div className="row my-1">
                                                            <Media>
                                                                <Media.Left>
                                                                    {
                                                                        !recipe.image ? <Image is='64x64' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vegetarian_diet.jpg/250px-Vegetarian_diet.jpg' /> : <Image is='64x64' src={recipe.image} />
                                                                    }
                                                                </Media.Left>
                                                                <Media.Content>
                                                                    <Content >
                                                                        <p>
                                                                            <strong>{recipe.recipe_name}</strong>
                                                                            <br />
                                                                            {recipe.recipe_notes}
                                                                            {
                                                                                recipe.health_tags === "None" ? null :
                                                                                    recipe.health_tags.map((e, i) => {
                                                                                        return <span className="chip">
                                                                                            {recipe}
                                                                                        </span>
                                                                                    })
                                                                            }
                                                                            <br />
                                                                        </p>
                                                                    </Content>
                                                                </Media.Content>
                                                            </Media>
                                                        </div>
                                                    })
                                                }
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

export default withRouter(RecipeSearch)

