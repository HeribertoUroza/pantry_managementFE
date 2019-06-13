import React from 'react';
import firebase from '../../firebase';
import { Link, withRouter, Redirect } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './signup.css';

//ASSETS
import logo from '../../assets/Branding/LogoRedesignClearBackground.png';
import video from '../../assets/Videos/e7ee48e4c9f84841e86043ac7235b63f.mp4';





class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      error: '',
      videoURL: video,

    }
  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/preference')
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
                  <div className="container-fluid">
                    <div className="row">
                    <div className="col"></div>
                      <div className="col">
                      <img src={logo} alt="logo" className="signUpLogo" />
                      </div>
                      <div className="col">
                        <div className="row my-5 py-5">
                          <div className="col text-center" style={{marginTop: "150px"}}>
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
                              <button className="btn waves-effect waves-light black mt-5" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px', color: "white" }} onClick={this.handleSubmit}>SIGN UP
                              </button>
                              <p className="whiteText mt-3">Already have an account? <Link to='/login' className="landingLink">Login</Link></p>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col"></div>
                    </div>
                  </div>
                </>
              )
            }
           else {
             return <Redirect to='/dashboard'/>
           } 
          }
        }
      </AuthContext.Consumer>

    );
  }
}

export default withRouter(Signup)