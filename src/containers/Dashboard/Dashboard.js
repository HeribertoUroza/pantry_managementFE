import React from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../../firebase';
import Clock from 'react-live-clock';


//MATERIALIZE
import M from 'materialize-css'

//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './dashboard.css';
import '../../components/Header/header.css';

//SERVICES
import { readUser, readMealSchedule, readPantry, sendTextMessage } from '../../services/main';


//COMPONENTS
import Header from '../../components/Header/Header';
import WeekRecipe from '../../components/WeekRecipeView/WeekRecipeView';
import AddRecipe from '../AddRecipe/AddRecipe';
import Recipes from '../Recipes/Recipes';
import Pantry from '../../components/Pantry/Pantry'

//ASSETS


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
            phone_number: '',
            sms_alert: ''
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
            firebase.auth().currentUser.getIdToken(false)
                .then((token) => {
                    this.setState({ token: token })
                })
                .then(() => {
                    readUser(this.state.token, user.email)
                        .then((response) => {
                            const rootObj = response.data.data
                            this.setState({
                                diet_preference: rootObj.diet_preference,
                                food_allergies: rootObj.food_allergies,
                                food_limitations: rootObj.food_limitations,
                                name: rootObj.name,
                                user_id: rootObj.user_id,
                                username: rootObj.username,
                                phone_number: rootObj.phone_number
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

    handleText = e => {
        e.preventDefault();
        const { user_id, phone_number } = this.state

        return sendTextMessage(user_id, phone_number)
            .then( res => {
                console.log(res.data.message)
                this.setState({
                    sms_alert: res.data.message
                })
            })
            .then(() => {
                M.toast({ html: this.state.sms_alert, classes: 'toast-rounded' });
            })
            .catch(err => {
                console.log(err.toString())
            })
    }


    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (<div className="container">
                                <Header recipes={this.state.recipes} userName={this.state.name} email={this.state.email} id={this.state.user_id} click={this.handleClickRecipeDB} clickAddR={this.handleClickAddRecipe} clickDash={this.handleClickBack} pantry={this.state.pantry} token={this.state.token} />
                                <div class="jumbotron jumbotronBackground mb-0">
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-6"></div>
                                        <div className="col-4">
                                            <div className="py-5" style={{backgroundColor: "white", color: "black", border: "2px solid black"}}>
                                            <h3 className="text-center my-auto px-5" style={{fontSize: '25px', fontFamily: "Roboto Condensed", opacity: "1", fontWeight: "550"}}><i>SMALL STEPS</i>, <b>BIG CHANGES</b></h3>
                                            <hr/>
                                            <p className="text-center px-5"> By making <b><i>small changes</i></b> to your grocery shopping routine, you too can be part of the movement, that <b>ends</b></p>
                                             <ul className="text-center"><li> the <b>waste</b> of food... </li>  <li>the <b>waste</b> of valuable resources ...</li>  <li>and slows <b>climate change</b>...</li></ul>
                                            </div>
                                        </div>
                                        <div className="col"></div>
                                    </div>
                                </div>
                                <div className="container-fluid" style={{backgroundColor: "black"}}>
                                    {
                                        this.state.userRecipeDB ? <Recipes click={this.handleClickBack} id={this.state.user_id} />
                                            : this.state.addRecipe ? <AddRecipe click={this.handleClickBack} />
                                                : <>
                                                    <div className="row my-0">
                                                        <div className="col-7 my-0 pt-4">
                                                            <div className="row" style={{
                                                                backgroundColor: "#06174c",
                                                                backgroundImage: "linear-gradient(315deg, #06174c 0% ,#166D3B 45%, #000000 74%)", height: "35px",
                                                            }}>
                                                                <p className="m-auto" style={{ color: "white", fontSize: "22px", fontFamily: "Roboto Condensed"  }} >Your Recipes For The Week Of...</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-5 my-0 pt-4">
                                                            <div className="row align-middle" style={{
                                                                 height: "35px", backgroundColor: "#06174c", backgroundImage: "linear-gradient(315deg, #000000 0%, #06174c 74%)",
                                                                color: "white"
                                                            }}>
                                                                <Clock
                                                                    style={{ fontSize: "20px", textAlign: "center", paddingLeft: "25px" }}
                                                                    format={' dddd, MMMM Mo, YYYY HH:mm:ss'}
                                                                    ticking={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="my-0" style={{backgroundColor: "black"}}>
                                                        <WeekRecipe token={this.state.token} id={this.state.user_id} />
                                                    </div>
                                                    <div className="row my-0">
                                                        <div className="col-4">
                                                            <div style={{
                                                                backgroundColor: "#06174c", backgroundImage: "linear-gradient(315deg, #06174c 0%, #000000 74%)",
                                                                color: "white", height: "35px"
                                                            }}>
                                                                <h5 className="pt-1 card-title text-center" style={{ fontSize: "20px" }}>Shopping List</h5>
                                                            </div>
                                                            <div className="card">
                                                                <div className="card-content">

                                                                    <a class="btn-floating halfway-fab waves-effect waves-light" onClick={this.handleText}><i class="material-icons">textsms</i></a>
                                                                    <h5 className="pt-1 card-title">Shopping List</h5>
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
                                                        <div className="col-8">
                                                            <div style={{
                                                                backgroundColor: "#3bb78f",
                                                                backgroundImage: "linear-gradient(315deg, #000000 0%, #166D3B 74%)", height: "35px",
                                                                color: "white", height: "35px"
                                                            }}>
                                                                <h5 className="pt-1 card-title text-center" style={{ fontSize: "20px" }}>Your Pantry</h5>
                                                            </div>
                                                            <div className="card">
                                                                <div className="card-content" style={{ overflow: "scroll", width: "95%" }}>
                                                                    <Pantry id={this.state.user_id} token={this.state.token} />
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

