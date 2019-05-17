import React from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../../firebase';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";





//CONTEXT
import AuthContext from '../../context/auth'

//CSS
import './userpref.css'

//SERVICES
//import { postUser, postUserPrefTopics, postUserPrefTV } from '../services/main';
import ImageService from '../../services/ImageServices'

//COMPONENTS
import Upload from '../../components/Upload/Upload';

//JQUERY ITIALIZATION




class UserPreference extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            username: '',
            email: '',
            dob: '',
            age: null,
            dietaryPref: [],
            foodAllergies: [],
            firebaseUID: '',
            date: "",
        }
    }

   getAge = (dateString) =>{
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    handleDateChange = dateChange => {
        if(this.getAge(dateChange) < 18) {
            this.setState({ageError: true})
        }
        this.setState({ date: dateChange,
        age: this.getAge(dateChange),
        ageError: false,
     });
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
        const { name, username, dob, dietaryPref, foodAllergies } = this.state;

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
                        if (user) {
                            return (<>
                                <div className="container-fluid userPrefContainer">
                                    <div className="container py-5 mx-auto" style={{ backgroundColor: "white" }}>
                                        <div className="container pr-5 mx-auto">
                                            <p className="text-center"> You must be 18 years or older to use Possible Pantry</p>
                                             <label htmlFor="dateofbirth" className="mr-2">Date of Birth</label>
                                             <DatePicker
                                                 selected={this.state.date}
                                                 onChange={this.handleDateChange}
                                                 isClearable={true}
                                                 showMonthDropdown
                                                 useShortMonthInDropdown
                                                 showYearDropdown
                                                 dateFormatCalendar="MMMM"
                                                 scrollableYearDropdown
                                                 maxDate = {new Date()}
                                                 yearDropdownItemNumber={116}
                                             />

                                            {
                                                this.state.age >= 18 ?  <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John Doe" value={name} name="name" required onChange={this.handleChange} />
                                                    <label htmlFor="exampleFormControlInput1">Email address</label>
                                                    <input type="email" className="form-control" id="exampleFormControlInputEmail" placeholder="name@example.com" readOnly value={user.email} name="email" />
                                                    <label htmlFor="exampleFormControlInput1">User Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="johndoe123" value={username} name="username" required onChange={this.handleChange} />
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p>Dietary Preferences</p>
                                                        <p>
                                                            <label>
                                                                <input type="checkbox" id="inlineCheckbox1" value="vegetarian" onClick={this.handleClickInterest} />
                                                                <span htmlFor="inlineCheckbox1">Vegetarian</span>
                                                            </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox2" value="vegan" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox2">Vegan</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox13" value="pescatarian" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox13">Pescatarian</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox3" value="sugar-conscious" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox3">Sugar Conscious</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox15" value="paleo" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox15">Paleo</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox20" value="kosher" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox20">Kosher</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox18" value="keto-friendly" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox18">Keto</span>
                                                        </label></p>
                                                    </div>
                                                    <div className="col">
                                                        <p>Food Limitations</p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox4" value="soy-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox4">Soy Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox5" value="red-meat-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox5">Red Meat Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox6" value="pork-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox6">Pork Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox14" value="wheat-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox14">Wheat Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox16" value="low-sugar" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox16">No Sugar</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox17" value="gluten-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox17">Gluten Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox19" value="low-potassium" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox19">No Potassium</span>
                                                        </label></p>

                                                    </div>
                                                    <div className="col">
                                                        <p>Food Allergies</p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox7" value="tree-nut-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox7">Tree Nuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox8" value="shellfish-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox8">Shellfish</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox9" value="peanut-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox9">Peanuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox10" value="gluten-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox10">Gluten Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox11" value="gluten-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox11">Dairy</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox12" value="crustacean-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox12">Crustacean</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox21" value="alcohol-free" onClick={this.handleClickInterest} />
                                                            <span htmlFor="inlineCheckbox21">Alcohol</span>
                                                        </label></p>
                                                    </div>
                                                </div>
                                                <Upload />
                                               <button className="btn waves-effect waves-light navy" style={{borderRadius: "50px"}} type="submit" name="action" onClick={this.handleSubmit}>Submit</button>
                                            </form> : null
                                            }
                                           
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                        else{
                            return <Redirect to='/dashboard'/>
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(UserPreference);