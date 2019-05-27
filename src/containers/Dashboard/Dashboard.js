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
import { readUser, readMealSchedule, readIngredient } from '../../services/main';


//COMPONENTS
import Header from '../../components/Header/Header';
import WeekRecipe from '../../components/WeekRecipeView/WeekRecipeView';
import Pantry from '../../components/Pantry/Pantry';
import { readdir } from 'fs';


const productTestRed = () => {
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
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            user_id: 0,
            email: '',
            recipes: [],
            dietaryPref: [],
            foodAllergies: [],
            date: new Date(),
            userRecipeDB: false,
            pantry: [productTestOrange(), productTestRed(), productTestYellow(), productTestBlue(), productTestGreen(), productTestGreen(), productTestGreen()],
        }
    }


    handleClickRecipeDB = () => {
        this.setState({ userRecipeDB: !this.state.userRecipeDB })
    }



    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            readUser(user.email)
                .then((response) => {
                    const rootObj = response.data.data
                    this.setState({
                        diet_preference: rootObj.diet_preference,
                        food_allergies: rootObj.food_allergies,
                        food_limitations: rootObj.food_limitations,
                        name: rootObj.name,
                        user_id: rootObj.user_id,
                        username: rootObj.username,
                    }, () => {
                        readMealSchedule(this.state.user_id)
                            .then((resp) => {
                                this.setState({ recipes: resp.data.data })
                            })
                    })
                })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }




    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (<div className="container-fluid">
                                <Header recipes={this.state.recipes} userName={this.state.name} email={this.state.email} click={this.handleClickRecipeDB} />
                                <div className="container-fluid">
                                    {
                                        this.state.userRecipeDB ? <>
                                        </> : <>
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
                                                    <WeekRecipe />
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