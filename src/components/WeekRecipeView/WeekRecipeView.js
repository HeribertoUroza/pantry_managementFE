import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Spinner } from 'reactstrap';


// SERVICES
import { updateMealSchedule, } from '../../services/main';


//COMPONENTS
import { readMealSchedule, readRecipeById } from '../../services/main';
import ModalExample from './Modal/Modal'


class WeekRecipeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      meals: [],
      ingredients: [],
      date: new Date(),
      modal: false,

    }
  }

  toggle = (e) => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  }

   

   
  componentDidMount() {
    setTimeout(() => {
      readMealSchedule(this.props.token, this.props.id)
        .then((response) => {
          {
            console.log("Meal", response.data.data)
            this.setState({ meals: response.data.data })
          }
        })
        .catch(error => {
          console.log(error.toString())
        })
    }, 1000)
  }

  pantryCalc = async e => {
    const { meals, } = this.state;
    console.log(meals);
    const id = e.target.value;
    let selectedMeal = [];
    for (let meal of meals) {
      if (meal.meal_schedule_id === parseInt(id, 10)) {
        selectedMeal.push(meal);
      };
    };
    const { recipe_owner, recipe_id, day_id, date, cooked, current_week, } = selectedMeal[0];
    try {
      const updateMealCall = await updateMealSchedule(parseInt(recipe_owner, 10), parseInt(recipe_id, 10), parseInt(day_id, 10), date, 'true', current_week, parseInt(id));
      for (let meal of meals) {
        if (meal.meal_schedule_id === parseInt(id, 10)) {
          const mealIdx = meals.indexOf(meal);
          meals[mealIdx].cooked = 'true';
          this.setState(() => ({
            meals,
          }), () => {
            this.props.updatePantry();
          })
        };
      };
    } catch (e) {
      console.log(e);
    };
  };


  render() {
    return (<>
      <div style={{ display: "flex" }}>
        {
          this.state.meals.length === 0 ? <Spinner /> :
            this.state.meals.map((item, index) => {
              return <div class="card" style={{ backroundColor: "blue", maxWidth: "20%" }}>
                <div class="card-image">
                {
                  item.cooked === "false" ?  <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px", maxWidth: "250px"}} /> :
                  <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px", maxWidth: "250px", filter: "grayscale(100%)" }} />
                }
                  <ModalExample name={item.recipe_name} image={item.recipe_image_url} id={item.recipe_id} />
                </div>
                <div class="card-content">
                <div className="row" style={{maxHeignt: "33.33%"}}>
                  {
                    <p style={{ color: '#06174c' }}>{item.date}</p> 
                  }
                  </div>
                  <div className="row" style={{maxHeignt: "43.33%"}}>
                  <h5 class="card-title" style={{ color: "black", fontSize:"18px" }}>{item.recipe_name}</h5>
                  </div>
                  <div className="row" style={{maxHeignt: "20.33%"}}>
                  <div className="">
                {
                              item.cooked === 'false' ?
                                <form action="#" className="text-left mt-3">
                                  <p>
                                    <label>
                                      <input type="checkbox" value={item.meal_schedule_id} class="checkbox" id={{ index }} style={{ fontSize: "12px" }}
                                        onClick={this.pantryCalc}></input>
                                      <span htmlFor={{ index }} style={{ fontSize: "12px" }}>Cooked?</span>
                                    </label>
                                  </p>
                                </form>
                              :
                                <i class="material-icons">
                                check_circle_outline
                                </i>
                            }
                  </div>
                  </div>
                </div>
              </div>
            })
        }
      </div>
    </>

    )
  }
}




export default withRouter(WeekRecipeView)