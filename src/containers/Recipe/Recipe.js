import React from 'react';
import firebase from '../../firebase';
import { Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './recipe.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'



class Recipe extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            db_ingredients: [],
            new_ingredients: [
                {
                    ingredient_name: 'cheese',
                    ingredient_weight: '2',
                    ingredient_type: 'oz'
                },
                {
                    ingredient_name: 'mac',
                    ingredient_weight: '10',
                    ingredient_type: 'lb'
                }
            ],
            recipe_name: '',
            recipe_ID: ''
        }
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    handleSubmit = (e) => {
        // 
        e.preventDefault();

    }

    render() {
        const { ingredients, recipe_ID } = this.state;
        console.log(this.state)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (
                                <>
                                    <div className='container'>
                                        <div className="row">
                                            <div className="col s12">
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <i className="material-icons prefix"></i>
                                                        <input type="text" name='recipe_name' id="autocomplete-input" className="autocomplete" onChange={this.handleChange} />
                                                        <label HTMLFor="autocomplete-input">Recipe Name</label>
                                                    </div>
                                                </div>
                                                {/* Input Fields */}
                                                
                                                <div className="row">
                                                    <form className="col s12">
                                                        <div className="row">
                                                            <div className="input-field col s10">
                                                                <input id="first_name" type="text" className="validate" />
                                                                    <label htmlFor="first_name">First Name</label>
                                                            </div>
                                                                <div className="input-field col s2">
                                                                    <input id="last_name" type="text" className="validate" />
                                                                        <label htmlFor="last_name">Last Name</label>
                                                                </div>
                                                            </div>
                                                        
                                                            {/* <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a> */}
                                                            <select></select>
                                                            {/* <ul id='dropdown1' class='dropdown-content'>
                                                                <li><a href="#!">one</a></li>
                                                                <li><a href="#!">two</a></li>
                                                                <li><a href="#!">three</a></li>
                                                                <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                                                                <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
                                                            </ul> */}
                                                    </form>
                                                    </div>

                                                        {/* List of Ingregients */}
                                                        <ul class="collection with-header">
                                                        <li class="collection-header"><h3>Ingredients</h3></li>
                                                            {
                                                                this.state.new_ingredients.map( (e, i) => {
                                                                    return (
                                                                        <li class="collection-item"><div>{e.ingredient_name} - {e.ingredient_weight} {e.ingredient_type}<a href="#!" className="secondary-content"><i class="material-icons"></i></a></div></li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>

                                                <div class="row">
                                                    <div class="input-field col s12">
                                                        <textarea id="textarea2" class="materialize-textarea" data-length="120"></textarea>
                                                        <label for="textarea2">Directions/Instructions</label>
                                                    </div>
                                                </div>
                                            </div>
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
                            
export default withRouter( Recipe )