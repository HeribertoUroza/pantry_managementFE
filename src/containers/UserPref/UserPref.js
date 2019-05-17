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
            foodLimitations: [],
            firebaseUID: '',
            date: '',
            phone_number: '',
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
        this.setState({ dob: dateChange,
        age: this.getAge(dateChange),
        ageError: false,
     });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickDietPre = (e) => {
        if (!this.state.dietaryPref.includes(e.target.value)) {
            this.setState({ dietaryPref: this.state.dietaryPref.concat(e.target.value) })
        }
        else {
            this.state.dietaryPref.splice(this.state.dietaryPref.indexOf(e.target.value), 1)
        }
    }

    handleClickFoodLimi = (e) => {
        if (!this.state.foodLimitations.includes(e.target.value)) {
            this.setState({ foodLimitations: this.state.foodLimitations.concat(e.target.value) })
        }
        else {
            this.state.foodLimitations.splice(this.state.foodLimitations.indexOf(e.target.value), 1)
        }
    }
    handleClickAllergies = (e) => {
        if (!this.state.foodAllergies.includes(e.target.value)) {
            this.setState({ foodAllergies: this.state.foodAllergies.concat(e.target.value) })
        }
        else {
            this.state.foodAllergies.splice(this.state.foodAllergies.indexOf(e.target.value), 1)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, username, dob, age, dietaryPref, foodAllergies } = this.state;

        this.setState({
            email: document.getElementById('exampleFormControlInputEmail').value,
            name,
            username,
            dob,
            age,
            dietaryPref,
            foodAllergies,
            profileurl: ImageService.getImages()[0].url,
            firebaseUID: firebase.auth().currentUser.uid
        })
    }



    componentDidUpdate() {
        const { name,
        username,
        email,
        dob,
        age,
        dietaryPref,
        foodAllergies,
        foodLimitations,
        firebaseUID,
        date,
        phone_number, } = this.state;

        /* postUser(email, name, username, dob, age, phone_number, firebaseUID)
             .then((response) => {
                 console.log("User", response)
                 const userid = response.data.id;
                 const [dietaryPref_1, dietaryPref_2, dietaryPref_3, dietaryPref_4, dietaryPref_5, dietaryPref_6, dietaryPref_7] = this.state.dietaryPref
                 const [foodAllergies_1, foodAllergies_2, foodAllergies_3, foodAllergies_4, foodAllergies_5, foodAllergies_6, foodAllergies_7] = this.state.foodAllergies
                 const [foodLimitations_1, foodLimitations_2, foodLimitations_3, foodLimitations_4, foodLimitations_5, foodLimitations_6, foodLimitations_7] = this.state.foodLimitations
                 postUserDietPref(userid, ...this.state.dietaryPref, ...this.state.foodAllergies, ...this.state.foodLimitations)
                     .then((response) => {
                         console.log("Resp", response)
                         this.props.history.push('/dashboard')
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
                                    <div className="container mx-auto py-5" style={{ backgroundColor: "white" }}>
                                        <div className="container pr-5 mx-auto">
                                             <label htmlFor="dateofbirth" className="mx-3">Date of Birth</label>
                                             <DatePicker
                                                 selected={this.state.dob}
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
                                                <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="exampleFormControlInput1">Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John Doe" value={this.state.name} name="name" required onChange={this.handleChange} />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="exampleFormControlInputEmail">Email address</label>
                                                    <input type="email" className="form-control" id="exampleFormControlInputEmail" placeholder="name@example.com" readOnly value="email" name="email" required />
                                                    </div>
                                                    <div className="col-6">
                                                    <label htmlFor="exampleFormControlInputNumber">Phone Number</label>
                                                    <input type="email" className="form-control" id="exampleFormControlInputNumber" placeholder="555-555-5555"  name="phone_number" value={this.state.phone_number} required onChange={this.handleChange}/>
                                                   </div>
                                                   <div className="col-6">
                                                    <label htmlFor="exampleFormControlUserName">User Name</label>
                                                    <input type="text" className="form-control" id="exampleFormControlUserName" placeholder="johndoe123" value={this.state.username} name="username" required onChange={this.handleChange} />
                                                </div>
                                                </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p className="py-3">Dietary Preferences</p>
                                                        <p>
                                                            <label>
                                                                <input type="checkbox" id="inlineCheckbox1" value="vegetarian" onClick={this.handleClickDietPre} />
                                                                <span htmlFor="inlineCheckbox1" data-toggle="tooltip" data-placement="right" title="No meat, poultry, or fish">Vegetarian</span>
                                                            </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox2" value="vegan" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox2" data-toggle="tooltip" data-placement="right" title="No meat, poultry, fish, dairy, eggs or honey">Vegan</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox13" value="pescatarian" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox13" data-toggle="tooltip" data-placement="right" title="Does not contain meat or meat based products, can contain dairy and fish">Pescatarian</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox3" value="sugar-conscious" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox3" data-toggle="tooltip" data-placement="right" title="Less than 4g of sugar per serving">Sugar Conscious</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox15" value="paleo" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox15" data-toggle="tooltip" data-placement="right" title="Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils">Paleo</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox20" value="kosher" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox20" data-toggle="tooltip" data-placement="right" title="Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves">Kosher</span>
                                                        </label></p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox18" value="keto-friendly" onClick={this.handleClickDietPre} />
                                                            <span htmlFor="inlineCheckbox18" data-toggle="tooltip" data-placement="right" title="Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium: less than 500 mg">Keto</span>
                                                        </label></p>
                                                    </div>
                                                    <div className="col">
                                                        <p className="py-3">Food Limitations</p>
                                                        <p> <label>
                                                            <input type="checkbox" id="inlineCheckbox4" value="soy-free" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox4" data-toggle="tooltip" data-placement="right" title="No soy or products containing soy">Soy Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox5" value="red-meat-free" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox5" data-toggle="tooltip" data-placement="right" title="Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.">Red Meat Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox6" value="pork-free" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox6" data-toggle="tooltip" data-placement="right" title="Does not contain pork or derivatives">Pork Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox14" value="wheat-free" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox14" data-toggle="tooltip" data-placement="right" title="No wheat, can have gluten though">Wheat Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox16" value="low-sugar" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox16" data-toggle="tooltip" data-placement="right" title="No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose">No Sugar</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox17" value="gluten-free" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox17" data-toggle="tooltip" data-placement="right" title="No ingredients containing gluten">Gluten Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox19" value="low-potassium" onClick={this.handleClickFoodLimi} />
                                                            <span htmlFor="inlineCheckbox19" data-toggle="tooltip" data-placement="right" title="Less than 150mg per serving">Low Potassium</span>
                                                        </label></p>

                                                    </div>
                                                    <div className="col">
                                                        <p className="py-3">Food Allergies</p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox7" value="tree-nut-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox7" data-toggle="tooltip" data-placement="right" title="No tree nuts or products containing tree nuts">Tree Nuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox8" value="shellfish-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox8" data-toggle="tooltip" data-placement="right" title="No shellfish or shellfish derivatives">Shellfish</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox9" value="peanut-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox9" data-toggle="tooltip" data-placement="right" title="No peanuts or products containing peanuts">Peanuts</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox10" value="gluten-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox10" data-toggle="tooltip" data-placement="right" title="No ingredients containing gluten">Gluten Free</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox11" value="gluten-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox11" data-toggle="tooltip" data-placement="right" title="No dairy; no lactose">Dairy</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox12" value="crustacean-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox12" data-toggle="tooltip" data-placement="right" title="Does not contain crustaceans (shrimp, lobster etc.) or derivatives">Crustacean</span>
                                                        </label></p>
                                                        <p><label>
                                                            <input type="checkbox" id="inlineCheckbox21" value="alcohol-free" onClick={this.handleClickAllergies} />
                                                            <span htmlFor="inlineCheckbox21" data-toggle="tooltip" data-placement="right" title="No alcohol used or contained">Alcohol</span>
                                                        </label></p>
                                                    </div>
                                                </div>
                                                <Upload />
                                               <button className="btn waves-effect waves-light navy" style={{borderRadius: "50px", color: "white"}} type="submit" name="action" onClick={this.handleSubmit}>Submit</button>
                                            </form> :                                             <p className="text-center"> You must be 18 years or older to use Possible Pantry</p>

                                            }
                                           
                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                        else {
                            return (<Redirect to='/dashboard' />)
                          }                        
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default withRouter(UserPreference);