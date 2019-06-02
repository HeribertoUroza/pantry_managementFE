import React from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../../firebase';
import Clock from 'react-live-clock';





//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './dashboard.css';
import '../../components/Header/header.css';

//SERVICES
import { readUser, readMealSchedule, readPantry } from '../../services/main';


//COMPONENTS
import Header from '../../components/Header/Header';
import WeekRecipe from '../../components/WeekRecipeView/WeekRecipeView';
import AddRecipe from '../AddRecipe/AddRecipe';
import { readdir } from 'fs';
import Recipes from '../Recipes/Recipes';
import Pantry from '../../components/Pantry/Pantry'

/*const productTestRed = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "50",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestOrange = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "100",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestYellow = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "180",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestBlue = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "250",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};

const productTestGreen = () => {
    let product = {
        name: "Jif Peanut Butter",
        original_weight: "400",
        current_weight: "350",
        image: "https://jetimages.jetcdn.net/md5/b5dd9b619c01f664ec255318d9092789?odnBound=500"
    }
    product.percentage = product.current_weight / product.original_weight
    return product
};*/



class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            user_id: 0,
            email: '',
            mealSchedule: [],
            dietaryPref: [],
            foodAllergies: [],
            date: new Date(),
            userRecipeDB: false,
            addRecipe: false,
            pantry: [],
            token: '',
            shopping_list: [],
        }
    }


    handleClickRecipeDB = () => {
        this.setState({ userRecipeDB: !this.state.userRecipeDB })
    }

    handleClickAddRecipe = () => {
        this.setState({ addRecipe: !this.state.addRecipe })
    }

    handleClickBack = () => {
        this.setState({
            addRecipe: false,
            userRecipeDB: false
        })
    }



    componentDidMount = () => {

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            // this.getFirebaseIdToken()
            firebase.auth().currentUser.getIdToken(false)
                .then((token) => {
                    this.setState({ token: token })
                })
                .then(() => {
                    readUser(this.state.token, user.email)
                        .then((response) => {
                            console.log("Boo", response.data.data)
                            const rootObj = response.data.data
                            this.setState({
                                diet_preference: rootObj.diet_preference,
                                food_allergies: rootObj.food_allergies,
                                food_limitations: rootObj.food_limitations,
                                name: rootObj.name,
                                user_id: rootObj.user_id,
                                username: rootObj.username,
                            })
                        })
                })

        })
    }



    componentWillUnmount() {
        this.unsubscribe();
    }

    getFirebaseIdToken = () => {
        firebase.auth().currentUser.getIdToken(false).then((token) => {
            this.setState({ token: token })
        }).catch((error) => {
            console.log(error.toString)
        });
    }


    render() {
        console.log(this.state)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (<div className="container-fluid">
                                <Header recipes={this.state.recipes} userName={this.state.name} email={this.state.email} id={this.state.user_id} click={this.handleClickRecipeDB} clickAddR={this.handleClickAddRecipe} clickDash={this.handleClickBack} pantry={this.state.pantry} />
                                <div className="container-fluid">
                                    {
                                        this.state.userRecipeDB ? <Recipes click={this.handleClickBack} id={this.state.user_id} />
                                            : this.state.addRecipe ? <AddRecipe click={this.handleClickBack} />
                                                : <>
                                                    <div className="row" style={{ marginBottom: "0px" }}>
                                                        <div className="col-9">
                                                            <div className="row" style={{
                                                                backgroundColor: "#3bb78f",
                                                                backgroundImage: "linear-gradient(315deg, #166D3B 0%, #000000 74%)", height: "35px",
                                                            }}>
                                                                <p className="m-auto" style={{ color: "white", fontSize: "22px" }} >Your Recipes For The Week Of...</p>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row align-middle ml-2" style={{
                                                                width: "15", height: "35px", backgroundColor: "#06174c", backgroundImage: "linear-gradient(315deg, #000000 0%, #06174c 74%)",
                                                                color: "white"
                                                            }}>
                                                                <Clock
                                                                    style={{ fontSize: "20px", fontFamily: "Raleway", textAlign: "center", paddingLeft: "25px" }}
                                                                    format={' dddd, MMMM Mo, YYYY HH:mm:ss'}
                                                                    ticking={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <WeekRecipe token={this.state.token} id={this.state.user_id} />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="card">
                                                                <div className="card-content">
                                                                    <h5 className="pt-1 card-title">Shopping List</h5>
                                                                    <a class="btn-floating halfway-fab waves-effect waves-light orange"><i class="material-icons">textsms</i></a>
                                                                    <ul>
                                                                        {
                                                                            this.state.shopping_list.map((ele, i) => {
                                                                                return <li style={{ fontSize: '.9rem' }} key={i}>{ele}</li>
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="card">
                                                                <div className="card-content">
                                                                    <h5 className="pt-1 card-title">Your Pantry</h5>
                                                                    <Pantry pantry={this.state.pantry} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                    }
                                </div>
                            </div>
                            )
                        }
                        else {
                            return <Redirect to='/login' />

                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(Dashboard);

/*<section class="shelf">
<div>

</div>
</section>
<section class="shelf">
<div>

</div>
</section>*/


/*
                                                <div className="row ml-2 headerContainer" style={{ scroll: "overflow", maxHeight: "469.172px" }}>
                                                    <div className="col">
                                                        {
                                                            this.state.pantry.length > 0 ? <> <Pantry pantry={this.state.pantry} />

                                                            </> : <p class="text-center" style={{ fontWeight: "bold" }}>No items in your pantry...</p>
                                                        }
                                                    </div>
                                                </div>
                                                */