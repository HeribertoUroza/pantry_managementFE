import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './addrecipe.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'

//MATERIALIZE
import M from 'materialize-css'

class AddRecipe extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            current_userID: '',
            current_recipeID: '',
            current_productID: '',
            db_ingredients: [],
            h_tag: ['Select','Vegetarian', 'Vegan', 'Pescatarian', 'Sugar-Conscious', 'Paleo', 'Kosher', 'Keto-Friendly', 'Soy-Free', 'Red-Meat-Free', 'Pork-Free', 'Wheat-Free', 'Low-Sugar', 'Gluten-Free', 'Low-Potassium', 'Tree-Nut-Free', 'Shellfish-Free', 'Peanut-Free', 'Gluten-Free', 'Dairy-Free', 'Crustacean-Free', 'Alcohol-Free'],
            I_type: ['Select Measurement','Teaspoon', 'Tablespoon', 'Dessert Spoon', 'Fluid Ounce', 'Cup', 'Cup Liquid', 'Pint', 'Pint Liquid', 'Pound', 'Kilo', 'Litre', 'Gallon'],
            new_ingredients: [],
            recipe_name: '',
            ingredient_name: '',
            ingredient_weight: '',
            ingredient_type: '',
            recipe_ID: '',
            product_url: '',
            recipe_desc: '',
            health_tag: '',
            error: ''
        }
    }

    static contextType = AuthContext;
    
    componentDidMount = async() => {
        M.AutoInit();
        
        const userEmail = await this.context.email
        console.log(userEmail)
        axios.get(`http://localhost:11235/user/email/heribertouroza@pursuit.org`)
            .then(res => {
                this.setState({
                    current_userID: res.data.data.user_id
                })
            })
            .catch(err => {
                console.log(err.toString())
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleRecipeSubmit = (e) => {
        e.preventDefault();
        const { recipe_name, health_tag, current_userID, recipe_desc } = this.state
        
        axios.post(`http://localhost:11235/recipe/`, {
            recipe_name: recipe_name,
            health_tags: health_tag,
            recipe_owner: current_userID,
            recipe_notes: recipe_desc

        })
        .then(res => {
            this.setState({
                current_recipeID: res.data.data.recipe_id
            })
        })
        .then( _=> {
            const { new_ingredients, current_userID } = this.state
            new_ingredients.map( (e,i) => {
                return axios.post(`http://localhost:11235/product/`, {
                    product_name: e.ingredient_name,
                    product_url: e.product_url,
                    product_owner: current_userID
                })
                .then(res => {
                    const { current_recipeID } = this.state
                    
                    return axios.post(`http://localhost:11235/ingredient/`, {
                        ingredient_name: e.ingredient_name,
                        recipe_id: current_recipeID,
                        product_id: res.data.data.product_id,
                        ingredient_weight: e.ingredient_weight,
                        ingredient_weight_type: e.ingredient_type
                    })
                })
                .catch(err => {
                    console.log(err.toString())
                })
            })
        })
        .then(res => {
            this.props.history.push('/recipe') //to be routed to all recipes
        })
        .catch(err => {
            console.log(err.toString())
        })
        
    }

    createIngredients = (e) => {
        e.preventDefault();
        const { ingredient_name, ingredient_weight, ingredient_type, product_url } = this.state
        let new_ingredientsArr = [...this.state.new_ingredients]
        let ingredient_obj = { ingredient_name, ingredient_weight, ingredient_type, product_url }

        new_ingredientsArr.push(ingredient_obj)
        if(ingredient_name === '' || ingredient_weight === '' || ingredient_type === '' || product_url === '') {
            this.setState({
                error: 'Please Enter Ingredient Information'
            })
        } else {
            this.setState({
                new_ingredients: new_ingredientsArr,
                ingredient_name: '',
                ingredient_weight: '',
                product_url: '',
                ingredient_type: 'Select Measurement',
                error: ''
            })
        }
    }

    render() {
        const { error } = this.state;
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    {error}
                                    <div className='container-fluid'>
                                        <div className="row">
                                        <span onClick={this.props.click} style={{cursor: "pointer"}}><i class="material-icons">keyboard_backspace</i></span>
                                        </div>
                                    </div>
                                    <div className='container'>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="row">
                                                    <div className="input-field col s11">
                                                        <i className="material-icons prefix"></i>
                                                        <input type="text" name='recipe_name' id="Recipe Name" className="" onChange={this.handleChange} />
                                                        <label htmlFor="Recipe Name">Recipe Name</label>
                                                    </div>

                                                    <div className="input-field col s1">
                                                        <select name='health_tag' value={this.state.health_tag} onChange={this.handleChange}>
                                                            {
                                                                this.state.h_tag.map((e, i) => {
                                                                    return (
                                                                        <option disabled={e === 'Select'} key={i} value={e}>{e}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <label>Health Tag</label>
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
                                                                                <option disabled={e === 'Select Measurement'} key={i} value={e}>{e}</option>
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