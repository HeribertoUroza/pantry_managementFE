import React from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase';
import Clock from 'react-live-clock';





//CONTEXT
import AuthContext from '../../context/auth'

//CSS
import './dashboard.css'

//SERVICES
//import { postUser, postUserPrefTopics, postUserPrefTV } from '../services/main';
import ImageService from '../../services/ImageServices'
import Upload from '../../services/Upload';


//COMPONENTS
import Header from '../../components/Header/Header'
import WeekRecipe from '../../components/WeekRecipeView/WeekRecipeView'




class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Jane Doe',
            recipes: [],
            dietaryPref: [],
            foodAllergies: [],
            firebaseUID: '',
            date: new Date(),
        }
    }



    componentDidUpdate() {

        /* readUser(email)
             .then((response) => {
                 
                     })
                     .catch((error) => {
                         console.log(error)
                     })
             })*/

    }




    render() {
        var offset = new Date().getTimezoneOffset()
        console.log(offset)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (<>
                                <div className="container-fluid">
                                    <Header />
                                        <div className="row" style={{backgroundColor: "black", color: "white"}}>
                                            <span className="col text-left align-middle " style={{height: "50px"}}>
                                                <p style={{fontSize: "25px"}}>Welcome Back {this.state.name}</p>
                                            </span>
                                            <span className="col text-right align-middle">
                                                <Clock
                                                    format={' dddd, MMMM Mo, YYYY HH:mm:ss'}
                                                    ticking={true}
                                                     />
                                            </span>
                                        </div>
                                        <WeekRecipe/>
                                </div>
                            </>)
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(Dashboard);