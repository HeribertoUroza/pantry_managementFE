import React from 'react';
import firebase from '../../firebase';
import { Redirect, Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './login.css'

//ASSETS
import logo from '../../assets/Branding/LogoRedesignClearBackground.png'
import video from '../../assets/Videos/FoodPack1_04_Videvo.mov';
//import video from '../../assets/Videos/FoodPack1_01_Videvo.mov';



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

  handleFill = (e) => {
    this.setState({
      email: "joserodriguez@pursuit.org",
      password: "123123"
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/dashboard')
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
            if (!user) {
              return (
                <>
                  <video id="myVideo" loop muted autoPlay>
                    <source src={this.state.videoURL} type="video/mp4" />
                  </video>
                  <div className="row">
                    <div className="col" style={{ margin: "20px" }}>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col" style={{ marginTop: "200px" }}>
                          <img src={logo} />
                        </div>
                        <div className="col">
                          <div className="text-center" style={{ marginTop: "200px" }}>
                            {displayError}
                            <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="whiteText boldText">EMAIL</label>
                                <input type="email" className="form-control whiteForm" id="signupinputemail" aria-describedby="emailHelp" name="email" value={email} onChange={this.handleChange} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="whiteText boldText">PASSWORD</label>
                                <input type="password" className="form-control" id="signupinputpassword" value={password} name="password" onChange={this.handleChange} />
                              </div>
                              <button className="btn waves-effect waves-light navy mt-5 black" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px', color: "white" }} onClick={this.handleSubmit}>LOGIN
                              </button>
                              <p className="mt-3" style={{color: "black"}}>Don't have an account? <Link to='/signup' style={{color: "yellow", fontWeight: "bold"}}>Sign Up</Link></p>
                            </form>
                          </div>
                        </div>
                        <div className="col">
                          <button className="btn waves-effect waves-light mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleFill}>DEMO
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

/*                      <div className="col">
                        <div className="text-center" style={{ marginTop: "200px" }}>
                          {displayError}
                          <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1" className="whiteText boldText">EMAIL</label>
                              <input type="email" className="form-control whiteForm" id="signupinputemail" aria-describedby="emailHelp" name="email" value={email} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1" className="whiteText boldText">PASSWORD</label>
                              <input type="password" className="form-control" id="signupinputpassword" value={password} name="password" onChange={this.handleChange} />
                            </div>
                            <button className="btn waves-effect waves-light navy mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>LOGIN
                            <i className="material-icons right">send</i>
                            </button>
                            <p className="whiteText mt-3">Don't have an account? <Link to='/signup' className="landingLinkLogin">Sign Up</Link></p>
                          </form>
                        </div>
                      </div>
                      <div className="col">
                        <button className="btn waves-effect waves-light mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleFill}>DEMO
                            <i className="material-icons right">settings_input_hdmi</i>
                        </button>                  
                        </div>*/