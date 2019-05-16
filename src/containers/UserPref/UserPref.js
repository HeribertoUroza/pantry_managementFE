import React from 'react';
import { withRouter } from 'react-router';
import firebase from '../../firebase';




//CONTEXT
import AuthContext from '../../context/auth'

//CSS
import './userpref.css'

//SERVICES
//import { postUser, postUserPrefTopics, postUserPrefTV } from '../services/main';
import ImageService from '../../services/ImageServices'
import Upload from '../../services/Upload';


//JQUERY ITIALIZATION




class UserPreference extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            username: '',
            email: '',
            dob: '',
            dietaryPref: [],
            foodAllergies: [],
            firebaseUID: '',
            selectedDate: new Date('2014-08-18T21:11:54'),
        }
    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickInterest = (e) => {
        if (!this.state.topics.includes(e.target.value)) {
            this.setState({ topics: this.state.topics.concat(e.target.value) })
        }
        else {
            this.state.topics.splice(this.state.topics.indexOf(e.target.value), 1)
        }
    }

    handleClickTV = (e) => {
        this.setState({
            tv: this.state.tv.concat(e.target.value)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, username, dob, dietaryPref,foodAllergies } = this.state;

        this.setState({
            email: document.getElementById('exampleFormControlInputEmail').value,
            name,
            username,
            dob,
            dietaryPref,
            foodAllergies,
            profileurl: ImageService.getImages()[0].url,
            firebaseUID: firebase.auth().currentUser.uid
        })
    }



    componentDidUpdate() {
        const { email, name, username, title, profileurl, zipcode, firebaseUID } = this.state;

        /* postUser(email, name, username, title, profileurl, zipcode, firebaseUID)
             .then((response) => {
                 console.log("User", response)
                 const userid = response.data.id;
                 const [topic_1, topic_2, topic_3, topic_4, topic_5] = this.state.topics
                 const [tvtype_1, tvtype_2, tvtype_3, tvtype_4, tvtype_5] = this.state.tv
                 postUserPrefTopics(userid, topic_1, topic_2, topic_3, topic_4, topic_5)
                     .then((response) => {
                         console.log("Res", response)
                         postUserPrefTV(userid, tvtype_1, tvtype_2, tvtype_3, tvtype_4, tvtype_5)
                     })
                     .then((response) => {
                         console.log("Resp", response)
                         this.props.history.push('/')
                     })
                     .catch((error) => {
                         console.log(error)
                     })
             })*/

    }




    render() {
        const { error, name, username } = this.state;
        const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>
        //                                {displayError}

        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (!user) {
                            return (<>
                                <div className="container-fluid userPrefContainer">
                                    <div className="container py-5 mx-auto" style={{ backgroundColor: "white" }}>
                                        <div className="container pr-5 mx-auto">
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John Doe" value={name} name="name" required onChange={this.handleChange} />
                                                    <label htmlFor="exampleFormControlInput1">Email address</label>
                                                    <input type="email" className="form-control" id="exampleFormControlInputEmail" placeholder="name@example.com" readOnly value="email" name="email" />
                                                    <label htmlFor="exampleFormControlInput1">User Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="johndoe123" value={username} name="username" required onChange={this.handleChange} />
                                                    <label htmlFor="dateofbirth">Date of Birth</label>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p>Dietary Preferences</p>
                                                        <p>
                                                            <label>
                                                                <input type="checkbox" id="inlineCheckbox1" value="Vegetarian" onClick={this.handleClickInterest} />
                                                                <span htmlFor="inlineCheckbox1">Vegetarian</span>
                                                            </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox2" value="Vegan" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox2">Vegan</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox13" value="Pescatarian" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox13">Pescatarian</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox3" value="Sugar Conscious" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox3">Sugar Conscious</span>
                                                        </label></p>
                                                       

                                                    </div>
                                                    <div className="col">
                                                    <p>Food Limitations</p>
                                                    <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox4" value="Soy Free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox4">Soy Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox5" value="Red Meat-Free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox5">Red Meat-Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox6" value="Pork Free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox6">Pork Free</span>
                                                        </label></p>
                                                    </div>
                                                    <div className="col">
                                                        <p>Food Allergies</p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox7" value="Tree Nuts" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox7">Tree Nuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox8" value="Shellfish" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox8">Shellfish</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox9" value="Peanuts" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox9">Peanuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox10" value="Meet the Press" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox10">Meet the Press</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox11" value="PBS NewsHour" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox11">PBS NewsHour</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox12" value="60 Minutes" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox12">60 Minutes</span>
                                                        </label></p>
                                                    </div>
                                                </div>
                                                <Upload />
                                                <button className="btn waves-effect waves-light navy" type="submit" name="action" onClick={this.handleSubmit}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(UserPreference);