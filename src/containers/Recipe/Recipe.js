import React from 'react';
import firebase from '../../firebase';
import { Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './recipe.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'

//MATERIALIZE
import M from 'materialize-css'

class AddRecipe extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            db_ingredients: [],
            health_tag: ['vegetarian', 'vegan', 'pescatarian', 'sugar-conscious', 'paleo', 'kosher', 'keto-friendly', 'soy-free', 'red-meat-free', 'pork-free', 'wheat-free', 'low-sugar', 'gluten-free', 'low-potassium', 'tree-nut-free', 'shellfish-free', 'peanut-free', 'gluten-free', 'dairy-free', 'crustacean-free', 'alcohol-free'],
            I_type: ['Select Measurement','teaspoon', 'tablespoon', 'dessertspoon', 'fluid ounce', 'cup', 'cup liquid', 'pint', 'pint liquid', 'pound', 'kilo', 'litre', 'gallon'],
            new_ingredients: [],
            recipe_name: '',
            ingredient_name: '',
            ingredient_weight: '',
            ingredient_type: '',
            recipe_ID: '',
            product_url: '',
            recipe_desc: ''
        }
    }
    
    componentDidMount() {
        M.AutoInit()
        
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleRecipeSubmit = (e) => {
        e.preventDefault();

    }

    createIngredients = (e) => {
        e.preventDefault();
        const { ingredient_name, ingredient_weight, ingredient_type } = this.state
        let new_ingredientsArr = [...this.state.new_ingredients]
        let ingredient_obj = { ingredient_name, ingredient_weight, ingredient_type }

        new_ingredientsArr.push(ingredient_obj)

        this.setState({
            new_ingredients: new_ingredientsArr,
            ingredient_name: '',
            ingredient_weight: '',
            ingredient_type: 'Select Measurement'
        })
    }

    render() {
        const { ingredients, recipe_ID } = this.state;
        console.log(this.state)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container'>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <i className="material-icons prefix"></i>
                                                        <input type="text" name='recipe_name' id="Recipe Name" className="" onChange={this.handleChange} />
                                                        <label htmlFor="Recipe Name">Recipe Name</label>
                                                    </div>
                                                </div>
                                                {/* Input Fields */}

                                                <div className="row">
                                                    <form className="col s12">
                                                        <div className="row">
                                                            <div className="input-field col s7">
                                                                <input id="Ingredient Name" name='ingredient_name' value={this.state.ingredient_name} type="text" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="Ingredient Name">Ingredient Name</label>
                                                            </div>
                                                            <div className="input-field col s2">
                                                                <input id="Ingredient Weight" name='ingredient_weight' value={this.state.ingredient_weight} type="number" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="Ingredient Weight">Ingredient Weight</label>
                                                            </div>

                                                            <div className="input-field col s3">
                                                                <select name='ingredient_type' value={this.state.ingredient_type} onChange={this.handleChange}>

                                                                    {
                                                                        this.state.I_type.map((e, i) => {
                                                                            return (
                                                                                <option disabled={e === 'Selected Measurement'} key={i} value={e}>{e}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                <label>Ingredient Type</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className='row'>
                                                    <div className='col s12'>
                                                        <div className='row'>
                                                            <div className="input-field col s6">
                                                                <input id="Product Url" name='product_url' type="text" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="Product Url">Product Url for {this.state.ingredient_name}</label>
                                                            </div>
                                                            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.createIngredients}>Add Ingredient
                                                                <i className="material-icons right">send</i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>

                                                {/* List of Ingregients */}
                                                <ul className="collection with-header">
                                                    <li className="collection-header"><h3>Ingredients</h3></li>
                                                    {
                                                        this.state.new_ingredients.map((e, i) => {
                                                            return (
                                                                <li className="collection-item" key={i}><div>{e.ingredient_name} - {e.ingredient_weight} {e.ingredient_type}<a href="#!" className="secondary-content"><i className="material-icons"></i></a></div></li>
                                                            )
                                                        })
                                                    }
                                                </ul>

                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <textarea id="recipe_desc" name='recipe_desc' className="materialize-textarea" data-length="420" onChange={this.handleChange}></textarea>
                                                        <label htmlFor="recipe_desc">Directions/Instructions</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleRecipeSubmit}>Add Recipe
                                                <i className="material-icons right">send</i>
                                        </button>
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

export default withRouter(AddRecipe)