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
import Dashboard from './containers/Dashboard/DashboadReEdit/ReDesign';
import AddRecipe from './containers/AddRecipe/AddRecipe';


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
              <Route path='/' exact component={ Landing } />
              <Route path='/login' exact component={ Login } />
              <Route path='/logout' exact component={ Logout } />
              <Route path='/preference' exact component={UserPref}/>
              <Route path='/dashboard' exact component={Dashboard}/>
              <Route path='/addrecipe' exact component={ AddRecipe } />
              <Route component={Error404}/>
            </Switch>
          </AuthContext.Provider>
      </HashRouter>
    );
  }
}

export default App;

