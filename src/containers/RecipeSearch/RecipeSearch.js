import React from 'react';
import { withRouter } from 'react-router-dom';


//CONTEXT
import AuthContext from '../../context/auth';

class RecipeSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (
                                <>
                               <h1>Recipe Search</h1>
                                </>
                            )
                        }
                        else {
                            // return (<Redirect to='/' />)
                            return (<><h1>Recipe Search Not Logged in</h1></>)
                        }
                    }
                }
            </AuthContext.Consumer>

        );
    }
}

export default withRouter(RecipeSearch)