import React from 'react';
import firebase from '../../firebase';
import { Redirect, Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './landing.css'

//ASSETS
import logo from '../../assets/Branding/LogoRedesignClearBackground.png';
//import video from '../../assets/Videos/FoodPack1_04_Videvo.mov'
import video from '../../assets/Videos/FoodPack1_01_Videvo.mov'


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

    handleSubmitSignup = (e) => {
        e.preventDefault();
            this.props.history.push('/signup')
    }
    handleSubmitLogin = (e) => {
        e.preventDefault();
            this.props.history.push('/login')
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
                                        <div className="col" style={{margin: "100px" }}>
                                            <div className="row" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                                                <div className="col"></div>
                                                <div className="col my-auto">
                                                    <img src={logo} style={{height: "300%", width: "auto"}}/>
                                                </div>
                                                <div className="col whiteText py-5">
                                                                    <h1 className="text-center my-auto" style={{ fontSize: '35px', fontFamily: "Roboto Condensed", fontWeight: "550" }}><i>SMALL STEPS</i> <br/> <b>BIG CHANGES</b></h1>
                                                                    <hr />
                                                                    <p className="text-center px-2"> By making <b><i>small changes</i></b> to your grocery shopping routine, you too can be part of the movement, that <b>ENDS</b></p>
                                                                    <ul className="text-center"><li> the <b>waste</b> of food... </li>  <li>the <b>waste</b> of valuable resources ...</li>  <li>and slows <b>climate change</b>...</li></ul>
                                                                </div>
                                                <div className="col"></div>
                                            </div>
                                            <div className="row" style={{backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                                                <div className="col my-auto text-center">
                                                    <Link to='/signup'><button className="btn waves-effect waves-light black my-3 mr-4" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px', color: "white" }} onClick={this.handleSubmitSignup}>SIGN UP
                                                    </button></Link>
                                                    <button className="btn waves-effect waves-light green my-3" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px', color: "white" }} onClick={this.handleSubmitLogin}>LOGIN
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        else {
                            return (<Redirect to='/dashboard' />)
                        }
                    }
                }
            </AuthContext.Consumer>

        );
    }
}

export default withRouter(Login)

