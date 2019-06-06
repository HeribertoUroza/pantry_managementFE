import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import 'bulma/css/bulma.css'
import { Media, Image, Content } from 'reactbulma';
import firebase from '../../firebase';

//CONTEXT
import AuthContext from '../../context/auth';


//MATERIALIZE
import M from 'materialize-css'

//SERVICES
import { readRecipes, readIngredient } from '../../services/main'

class AddRecipe extends React.Component {
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

    handletyping = (e) => {
        const type = e.target.value;
        console.log("type", type)
        
        const filterRecipeList = (list) => {
            const results = this.state.recipes.filter(recipes => recipes.recipe_name.toLowerCase().includes(list) /*recipes.toLowerCase().includes(list)*/)
            this.setState({ display: results, inputValue: type })
        }
      if (type.length === 0 || type === "" || Number(type)) {
            this.setState({ display: this.state.recipes, inputValue: "" })
        }
        else {
            filterRecipeList(type)
        }
    }

    componentDidMount() {
        M.AutoInit();

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            firebase.auth().currentUser.getIdToken(false)
                .then((token) => {
                    this.setState({ token: token })
                })
                .then(() => {
                    readRecipes(this.state.token, this.props.id)
                        .then((response) => {
                            this.setState({ recipes: response.data.data })
                        })
                        .catch( error => {
                            console.log(error.toString())
                        })
                })

        })
    }


    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className='container-fluid'>
                                        <div className="row">
                                            <span onClick={this.props.click} style={{ cursor: "pointer" }}><i class="material-icons">keyboard_backspace</i></span>
                                        </div>
                                    </div>
                                    <div className='container'>
                                            <div class="row">
                                            <div className="col"></div>
                                            <div className="col">
                                                <form>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <textarea id="search" class="materialize-textarea" onChange={this.handletyping}></textarea>
                                                            <label for="search">Search Your Recipes</label>
                                                            <i class="material-icons prefix">search</i>
                                                        </div>
                                                    </div>
                                                </form>
                                                {
                                                    this.state.display.map((e,i)=>{
                                                       return <div className="row my-1">
                                                       <Media>
                                                        <Media.Left>
                                                            {
                                                                !e.image ? <Image is='64x64' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vegetarian_diet.jpg/250px-Vegetarian_diet.jpg' /> : <Image is='64x64' src={e.image} />
                                                            }
                                                        </Media.Left>
                                                        <Media.Content>
                                                            <Content >
                                                                <p>
                                                                    <strong>{e.recipe_name}</strong> 
                                                                    <br />
                                                                    {e.recipe_notes}
                                                                    {
                                                                        e.health_tags ==="None" ? null :
                                                                        e.health_tags.map((e,i)=>{
                                                                            return <span class="chip">
                                                                             {e}
                                                                           </span>
                                                                    })
                                                                }
                                                                <div className="row ml-1">
                                                                    <div style={{fontWeight: "bold"}}>Ingredients</div>
                                                                        {
                                                                        Object.keys(e).map((key, ind)=>{
                                                                        })
                                                                        }
                                                                        </div>
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

export default withRouter(AddRecipe)

