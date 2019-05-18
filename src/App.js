import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import firebase from './firebase';

// ---- PAGES
import Signup from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Landing from './containers/Landing/Landing'
import Error404 from './components/Error404/Error404';
import UserPref from './containers/UserPref/UserPref';
import Recipe from './containers/Recipe/Recipe';



// ---- CONTEXT
import AuthContext from './context/auth';


// ---- CSS
import './App.css';


class App extends Component {

  state = {
    user: null
  }

  componentDidMount() {
      this.unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          this.setState({
            user: user,
      })
    }
    else{
      this.setState({user: null})
    }
  })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render() {
    return (
      <HashRouter>
        <AuthContext.Provider value={this.state.user}>
          <Switch>
              <Route path='/signup' exact component={ Signup } />
              <Route path='/landing' exact component={ Landing } />
              <Route path='/login' exact component={ Login } />
              <Route path='/logout' exact component={ Logout } />
              <Route path='/preference' exact component={UserPref}/>
              <Route path='/recipe' exact component={ Recipe } />
              <Route component={Error404}/>
            </Switch>
          </AuthContext.Provider>
      </HashRouter>
    );
  }
}

export default App;

