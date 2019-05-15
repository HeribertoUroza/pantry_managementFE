import React from 'react';
import firebase from '../../firebase';
import { Redirect, Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './landing.css'

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'
import video from '../../assets/Videos/Pexels_Videos_1494297.mp4';


class Login extends React.Component {

    state = {
        email: '',
        password: '',
        error: '',
        videoURL: video,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Returns: ', response);
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }

    render() {
        const { email, password, error } = this.state;
        const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user === null) {
                            return (
                                <>
                                    <video id="myVideo" loop muted autoPlay>
                                        <source src={this.state.videoURL} type="video/mp4" />
                                    </video>
                                    <div className="row">
                                        <div className="col" style={{ border: "white 2px solid", margin: "20px" }}>
                                            <div className="row">
                                                <div className="col"></div>
                                                <div className="col pt-5">
                                                    <img src={logo} className="landingLogo" />
                                                </div>
                                                <div className="col whiteText text-center" style={{ height: "100%", marginTop: "300px" }}>
                                                    <h2>Know What You Need...</h2>
                                                    <h3>Simplify Your Life...</h3>
                                                    <h4>Save The Planet...</h4>
                                                    <h5>The Choice Is Yours...</h5>
                                                    <h6>Possible Pantry</h6>
                                                </div>
                                                <div className="col"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-center">
                                                    <button className="btn waves-effect waves-light brown mt-5 mr-4" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>SIGN UP
                                                        <i className="material-icons right">send</i>
                                                    </button>
                                                    <button className="btn waves-effect waves-light navy mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>SIGN UP
                                                        <i className="material-icons right">send</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (<Redirect to='/' />)
                        }
                    }
                }
            </AuthContext.Consumer>

        );
    }
}

export default withRouter(Login)

