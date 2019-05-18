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
            current_recipes: [],
            recipe_name: '',
            ingredients: [],
            instructions: ''
        }
    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        const { current_recipes, recipe_name, ingredients, instructions } = this.state;
        
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <h1>hello world</h1>
                                    <img src={logo} />
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