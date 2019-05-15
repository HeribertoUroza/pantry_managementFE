import React from 'react';
import firebase from '../../firebase';
import { Link, withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

//CSS
import './signup.css';

//ASSETS
import logo from '../../assets/Branding/PossiblePantryLogoWhite.png'



class Signup extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: '',
      error: ''
      }
    }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
   
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log("Response", response)
      this.props.history.push('constituent')
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
                <div className="container-fluid signUpContainer">
                <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col">
                <div className="row mt-5 pt-5"></div>
                <div className="text-center">
                <img src={logo} alt="logo" className="landingLogo"/>
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
                    <button className="btn waves-effect waves-light brown" type="submit" name="action" style={{ margin: "0 auto", borderRadius: '50px' }} onClick={this.handleSubmit}>SIGN UP
                            <i className="material-icons right">send</i>
                    </button>
                    <p className="whiteText mt-3">Already have an account? <Link to='/login' className="landingLink">Login</Link></p>
                  </form>
                  </div>
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

export default withRouter(Signup)