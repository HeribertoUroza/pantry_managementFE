import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import axios from 'axios';
import { createRecipe, createProduct, createIngredient } from '../../services/main'
import cheerio from 'cheerio'
import request from 'request'

//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './addrecipe.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'

//MATERIALIZE
import M from 'materialize-css'

//SERVICES
import { readUser, } from '../../services/main';
import { async } from '@firebase/util';

const scrape = (url)=>{
request(url,
(error, response, html)=>{
    if(!error && response.statusCode === 200) {
        const obj = {}
       const rawHtml = cheerio.load(html)
       rawHtml('.main-section').map((el,i)=>{
           const name = rawHtml(i).find('.product-title-name').text().split(',')[0]
           const image = rawHtml(i).find('img').attr().src
           const price = rawHtml(i).find('.price-display').text()
           obj.name = name
           obj.image = image
           obj.price = price
           return obj
           
           }) 
        rawHtml('#desktopspecificationtabcontent').map((el, i)=>{
            const root = rawHtml(i).find('.specs-table-heading').next().text().split('H')
            const weight = root[root.length-1]
            obj.weight = weight
            return obj
        })
console.log(obj)    
}
    else{
        console.log("error", error)
    }

    })
}

class AddRecipe extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            current_userID: '',
            current_recipeID: '',
            current_productID: '',
            db_ingredients: [],
            h_tag: ['Select', 'Vegetarian', 'Vegan', 'Pescatarian', 'Sugar-Conscious', 'Paleo', 'Kosher', 'Keto-Friendly', 'Soy-Free', 'Red-Meat-Free', 'Pork-Free', 'Wheat-Free', 'Low-Sugar', 'Gluten-Free', 'Low-Potassium', 'Tree-Nut-Free', 'Shellfish-Free', 'Peanut-Free', 'Gluten-Free', 'Dairy-Free', 'Crustacean-Free', 'Alcohol-Free'],
            I_type: ['Select Measurement', 'Teaspoon', 'Tablespoon', 'Dessert Spoon', 'Fluid Ounce', 'Cup', 'Cup Liquid', 'Pint', 'Pint Liquid', 'Pound', 'Kilo', 'Litre', 'Gallon'],
            new_ingredients: [],
            recipe_name: '',
            ingredient_name: '',
            ingredient_weight: '',
            ingredient_type: '',
            recipe_ID: '',
            product_name: '',
            product_url: '',
            product_original_weight: '',
            product_original_weight_type: '',
            product_price: '',
            product_image: '',
            recipe_desc: '',
            health_tag: '',
            error: '',
            requestFailed: false,
        }
    }

    static contextType = AuthContext;

    componentDidMount = async () => {
        M.AutoInit();

        const userEmail = await this.context.email

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            firebase.auth().currentUser.getIdToken(false)
                .then((token) => {
                    console.log('token', token)
                    this.setState({ token: token })
                })
                .then(() => {
                    readUser(userEmail)
                        .then((response) => {
                            this.setState({
                                current_userID: response.data.data.user_id
                            })
                        })
                })
                .catch(err => {
                    console.log(err.toString())
                })

        })

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

     handleScrape = (e) => {
        if (e.target.name === "product_url") {

        }
        this.setState({ [e.target.name]: e.target.value });

    }

    handleFill = (e) => {
        this.setState({
            current_userID: '',
            current_recipeID: '',
            current_productID: '',
            db_ingredients: [],
            h_tag: ['Select', 'Vegetarian', 'Vegan', 'Pescatarian', 'Sugar-Conscious', 'Paleo', 'Kosher', 'Keto-Friendly', 'Soy-Free', 'Red-Meat-Free', 'Pork-Free', 'Wheat-Free', 'Low-Sugar', 'Gluten-Free', 'Low-Potassium', 'Tree-Nut-Free', 'Shellfish-Free', 'Peanut-Free', 'Gluten-Free', 'Dairy-Free', 'Crustacean-Free', 'Alcohol-Free'],
            I_type: ['Select Measurement', 'Teaspoon', 'Tablespoon', 'Dessert Spoon', 'Fluid Ounce', 'Cup', 'Cup Liquid', 'Pint', 'Pint Liquid', 'Pound', 'Kilo', 'Litre', 'Gallon'],
            new_ingredients: [],
            recipe_name: '',
            ingredient_name: '',
            ingredient_weight: '',
            ingredient_type: '',
            recipe_ID: '',
            product_name: '',
            product_url: '',
            product_original_weight: '',
            product_original_weight_type: '',
            product_price: '',
            product_image: '',
            recipe_desc: '',
            health_tag: '',
            scrape: [],
        })
    }

    handleRecipeSubmit = (e) => {
        e.preventDefault();
        const { recipe_name, health_tag, current_userID, recipe_desc } = this.state

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            firebase.auth().currentUser.getIdToken(false)
                .then((token) => {
                    this.setState({ token: token })
                })
                .then(() => {
                    return createRecipe(recipe_name, health_tag, current_userID, recipe_desc)
                })
                .then((res) => {
                    this.setState({
                        current_recipeID: res.data.data.recipe_id
                    })
                    return res.data.data
                })
                .then(async (recipe_id) => {
                    const { new_ingredients, } = this.state
                    for (let Ingredient of new_ingredients) {
                        const postProduct = await createProduct(Ingredient.product_name, Ingredient.product_url, current_userID, Ingredient.product_image, Ingredient.product_original_weight, Ingredient.product_original_weight_type, Ingredient.product_price)

                        const postIngredient = await createIngredient(Ingredient.ingredient_name, this.state.current_recipeID, postProduct.data.data.product_id.product_id, Ingredient.ingredient_weight, Ingredient.ingredient_type)
                    }
                })
                .then(() => {
                    this.setState({
                        recipe_name: ''
                    })
                    this.props.click()
                })
                .catch(err => {
                    console.log(err.toString())
                })
        })

    } 
    
    
    createIngredients = (e) => {
        e.preventDefault();
        const { ingredient_name, ingredient_weight, ingredient_type, product_name, product_url, product_original_weight, product_original_weight_type, product_price, product_image } = this.state
        let new_ingredientsArr = [...this.state.new_ingredients]
        let ingredient_obj = { ingredient_name, ingredient_weight, ingredient_type, product_name, product_url, product_original_weight, product_original_weight_type, product_price, product_image }

        new_ingredientsArr.push(ingredient_obj)
        if (ingredient_name === '' ||
            ingredient_weight === '' ||
            ingredient_type === '' ||
            product_name === '' ||
            product_url === '' ||
            product_original_weight === '' ||
            product_original_weight_type === '' ||
            product_price === ''
        ) {
            this.setState({
                error: 'Missing Ingredient Information or Product Information'
            })
        } else {
            this.setState({
                new_ingredients: new_ingredientsArr,
                ingredient_name: '',
                ingredient_weight: '',
                ingredient_type: 'Select Measurement',
                product_name: '',
                product_url: '',
                product_price: '',
                product_original_weight: '',
                product_image: '',
                product_original_weight_type: 'Select Measurement',
                error: '',
                scrape: [],
            })
        }
    }

    render() {
        console.log("thisState", this.state)
        console.log("Scrape", scrape('https://cors-anywhere.herokuapp.com/https://www.bjs.com/product/bumble-bee-solid-white-albacore-tuna-in-water-8-pk5-oz/3000000000000163059'))
        const { error } = this.state;
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='row mb-3'>
                                            {
                                                this.state.error !== '' ? { error } : null
                                            }
                                            <div className="col">
                                            <span onClick={this.props.click} style={{ cursor: "pointer", marginRight: "auto" }}><i className="material-icons">keyboard_backspace</i></span>
                                           </div>
                                           <div className="col-9"></div>
                                           <div className="col">
                                            <button className="btn waves-effect waves-light mt-1" type="submit" name="action" style={{ marginLeft: "auto", borderRadius: '50px', marginBottom: "0px" }} onClick={this.handleFill}>DEMO</button>
                                            </div>
                                    </div>
                                    <div className="row">
                                        <h1 class="mx-auto mb-2" style={{ fontWeight: "bold", fontSize: "40px" }}>ADD YOUR RECIPE</h1>
                                    </div>
                                        <div className="row">
                                        
                                            <div className="col-2"></div>
                                            <div className="col s10">
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
                                                            <div className="input-field col s3">
                                                                <input id="product_name" name='product_name' type="text" className="validate" value={this.state.product_name} onChange={this.handleChange} />
                                                                <label htmlFor="product_name">Product Name for {this.state.ingredient_name}</label>
                                                            </div>
                                                            <div className="input-field col s3">
                                                                <input id="Product Url" name='product_url' type="text" className="validate" value={this.state.product_url} onChange={this.handleChange} />
                                                                <label htmlFor="Product Url">Product Url for {this.state.product_name}</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Product Input Feilds */}
                                                {
                                                    this.state.error !== '' ? <div className='row'>
                                                    <div className='col s12'>
                                                        <div className='row'>
                                                            <div className="input-field col s3">
                                                                <input id="product_original_weight" name='product_original_weight' value={this.state.product_original_weight} type="number" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="product_original_weight">Product Original Weight</label>
                                                            </div>

                                                            <div className="input-field col s3">
                                                                <select name='product_original_weight_type' value={this.state.product_original_weight_type} onChange={this.handleChange}>
                                                                    {
                                                                        this.state.I_type.map((e, i) => {
                                                                            return (
                                                                                <option selected={e === 'Select Measurement'} key={i} value={e}>{e}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                                <label>Product Weight Type</label>
                                                            </div>

                                                            <div className="input-field col s3">
                                                                <input id="product_price" name='product_price' value={this.state.product_price} type="number" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="product_price">Product Price</label>
                                                            </div>
                                                            <div className="input-field col s3">
                                                                <input id="product_image" name='product_image' value={this.state.product_image} type="text" className="validate" onChange={this.handleChange} />
                                                                <label htmlFor="product_image">Product Image</label>
                                                            </div>

                                                        </div>
                                                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.createIngredients}>Add Ingredient and Product
                                                                <i className="material-icons right">send</i>
                                                        </button>
                                                    </div>
                                                </div>
                                                    : null

                                                }
  
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
                                            <div className="col-2"></div>
                                        </div>
                                        <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleRecipeSubmit}>Add Recipe
                                                <i className="material-icons right">send</i>
                                        </button>
                                   
                                    

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