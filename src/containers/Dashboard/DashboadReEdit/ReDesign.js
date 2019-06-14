import React from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../../../firebase';
import Clock from 'react-live-clock';



//MATERIALIZE
import M from 'materialize-css'

//CONTEXT
import AuthContext from '../../../context/auth';

//CSS
import '../dashboard.css';
import '../../../components/Header/header.css';

//SERVICES
import { readUser, readMealSchedule, readPantry, sendTextMessage } from '../../../services/main';

//COMPONENTS
import Header from '../../../components/Header/Header';
import WeekRecipe from '../../../components/WeekRecipeView/WeekRecipeView';
import AddRecipe from '../../AddRecipe/AddRecipe';
import RecipesSearch from '../..//RecipesSearch/RecipesSearch';
import Pantry from '../../../components/Pantry/Pantry'
import ShoppingList from '../../../components/Shopping_List/ShoppingList'
import SideNav from '../../../components/SideNav/SideNav';

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
            sms_alert: '',
            pantryUpdates: 0,

        }
    }


    handleClickRecipeDB = () => {
        this.setState({ userRecipeDB: true, addRecipe: false })
    }

    handleClickAddRecipe = () => {
        this.setState({ addRecipe: true, userRecipeDB: false })
    }

    handleClickBack = () => {
        this.setState({
            addRecipe: false,
            userRecipeDB: false
        })
    }



    componentDidMount = () => {

        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            readUser(user.email)
                .then((response) => {
                    const rootObj = response.data.data
                    if (response.data.data) {
                        this.setState({
                            diet_preference: rootObj.diet_preference,
                            food_allergies: rootObj.food_allergies,
                            food_limitations: rootObj.food_limitations,
                            name: rootObj.name,
                            user_id: rootObj.user_id,
                            username: rootObj.username,
                            phone_number: rootObj.phone_number
                        })
                    }
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
            .then(res => {
                this.setState({
                    sms_alert: res.data.message
                })
            })
            .then(() => {
                M.toast({ html: this.state.sms_alert, classes: 'toast-rounded black' });
            })
            .catch(err => {
                console.log(err.toString())
            })
    }

    updatePantry = _ => {
        const { pantryUpdates, } = this.state;
        this.setState(() => ({
            pantryUpdates: pantryUpdates + 1,
        }));
    };

    render() {
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <div className="container-fluid m-0 p-0" style={{ backgroundColor: "white" }}>
                                    <div className="row my-0 mx-0">
                                        <div className="col-2">
                                            <SideNav userName={this.state.name} email={this.state.email} id={this.state.user_id} clickRDB={this.handleClickRecipeDB} clickAddR={this.handleClickAddRecipe} clickDash={this.handleClickBack} pantry={this.state.pantry} token={this.state.token} />
                                        </div>
                                        <div className="col-10 pl-5" style={{ overflow: "scroll", width: "100%" }}>
                                            <div className="row" style={{ backgroundColor: "black" }}>
                                                <div className="col"></div>
                                                <div className="col"></div>
                                                <div className="col">
                                                    <Clock
                                                        style={{ fontSize: "20px", textAlign: "right", paddingLeft: "25px", color: "white" }}
                                                        format={' dddd, MMMM Mo, YYYY HH:mm:ss'}
                                                        ticking={true}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                this.state.userRecipeDB ? <RecipesSearch click={this.handleClickBack} id={this.state.user_id} />
                                                    : this.state.addRecipe ? <AddRecipe click={this.handleClickBack} id={this.state.user_id} />
                                                        : <>

                                                            <div className="row">
                                                                <div className="col-1" style={{
                                                                    backgroundColor: "#63d471",
                                                                    backgroundImage: "linear-gradient(315deg, #63d471 0%, #233329 74%)"
                                                                }}>
                                                                    <a class="btn-floating btn-large waves-effect waves-light transparent mt-3 mx-auto"><i class="material-icons">restaurant_menu</i></a>

                                                                    <p className="mt-5" style={{ transform: "rotate(270deg)", color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>MENU</p>
                                                                </div>
                                                                <div className="col-11">
                                                                    <WeekRecipe id={this.state.user_id} updatePantry={this.updatePantry} />
                                                                </div>
                                                            </div>
                                                            <div className="row py-0 my-0">
                                                                <div className="col-1" style={{
                                                                    backgroundColor: "#ff4e00",
                                                                    backgroundImage: "linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%)",
                                                                }}>
                                                                    <a class="btn-floating btn-large waves-effect waves-light transparent mt-3 mx-auto" onClick={this.handleText}><i class="material-icons">sms</i></a>
                                                                    <p className="mt-5 mx-auto" style={{ transform: "rotate(270deg)", color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>NEED</p>
                                                                </div>
                                                                <div className="col-5" style={{ height: "526px", overflow: "scroll" }}>

                                                                    <ShoppingList id={this.state.user_id} />
                                                                </div>
                                                                <div className="col-1" style={{
                                                                    backgroundColor: "#d3d3d3",
                                                                    backgroundImage: "linear-gradient(315deg, #d3d3d3 0%, #57606f 74%)"

                                                                }}>
                                                                    <a class="btn-floating btn-large waves-effect waves-light transparent mt-3 mx-auto"><i class="material-icons">storage</i></a>

                                                                    <p className="mt-5" style={{ transform: "rotate(270deg)", color: "white", fontWeight: "bold", fontSize: "1.5rem", marginTop: "25px" }}> HAVE</p>
                                                                </div>
                                                                <div className="col-5" style={{ height: "526px", overflow: "scroll" }}>
                                                                    <Pantry id={this.state.user_id} updates={this.state.pantryUpdates} />
                                                                </div>
                                                            </div>
                                                        </>
                                            }
                                        </div>
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