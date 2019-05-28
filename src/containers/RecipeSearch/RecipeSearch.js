import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

//CONTEXT
import AuthContext from '../../context/auth';

class RecipeSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id :'',
        }
    }

    componentDidMount() {
        //const userEmail = this.props.match.params.email;
        const userEmail = 'joserodriguez@pursuit.org';
        axios.get(`http://localhost:11235/user/email/${userEmail}`)
            .then(data => {
                const userData = data.data.data;
                this.setState({ user_id: userData.user_id })
                console.log(userData);
            })
            .catch(err => {
                console.log(err)
            })
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