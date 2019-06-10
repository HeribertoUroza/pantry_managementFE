import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Spinner } from 'reactstrap';


// SERVICES
import { updateMealSchedule, } from '../../services/main';


//COMPONENTS
import { readMealSchedule, readRecipeById } from '../../services/main';
import ModalExample from './Modal/Modal'


/* const getItems = count =>
 Array.from({ length: count }, (v, k) => k).map(k => ({
   id: `item-${k}`,
   content: `item ${k}`,
 }));*/

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? '#2e6e51' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#46a082' : 'black',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});



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

    const items = reorder(
      this.state.recipe,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }


  componentDidMount() {
    setTimeout(() => {
      readMealSchedule(this.props.token, this.props.id)
        .then((response) => {
          {
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
    const id = e.target.value;
    let selectedMeal = [];
    for (let meal of meals) {
      if (meal.meal_schedule_id === parseInt(id, 10)) {
        selectedMeal.push(meal);
      };
    };
    const { recipe_owner, recipe_id, day_id, date, cooked, current_week, } = selectedMeal[0];
    try {
      const updateMealCall = await updateMealSchedule(parseInt(recipe_owner, 10), parseInt(recipe_id, 10), parseInt(day_id, 10), date, cooked, current_week, parseInt(id));
      console.log(updateMealCall);
    } catch (e) {
      console.log(e);
    };
  };


  render() {
    console.log("RD", this.state.recipe)
    return (<>
      <div style={{ display: "flex" }}>
        {
          this.state.meals.length === 0 ? <Spinner /> :
            this.state.meals.map((item, index) => {
              return <div class="card" style={{ backroundColor: "blue", maxWidth: "20%" }}>
                <div class="card-image">
                  <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px", maxWidth: "250px" }} />
                  <ModalExample name={item.recipe_name} image={item.recipe_image_url} id={item.recipe_id} />
                </div>
                <div class="card-content">
                <div className="row" style={{maxHeignt: "33.33%"}}>
                  {
                    index === 0 ? <p style={{ color: '#06174c' }}>Monday</p> : index === 1 ? <p style={{ color: '#06174c' }}>Tuesday</p> : index === 2 ? <p style={{ color: '#06174c' }}>Wednesday</p> : index === 3 ? <p style={{ color: '#06174c' }}>Thursday</p> : index === 4 ? <p style={{ color: '#06174c' }}>Friday</p> : null
                  }
                  </div>
                  <div className="row" style={{maxHeignt: "43.33%"}}>
                  <h5 class="card-title" style={{ color: "black", fontSize:"18px" }}>{item.recipe_name}</h5>
                  </div>
                  <div className="row" style={{maxHeignt: "20.33%"}}>
                  <div className="">
                    <form action="#" className="text-left">
                      <p>
                        <label>
                          <input type="checkbox" value={item.meal_schedule_id} class="checkbox" id={{ index }} style={{ fontSize: "12px" }}
                            onClick={this.pantryCalc}></input>
                          <span htmlFor={{ index }} style={{ fontSize: "12px" }}>Cooked?</span>
                        </label>
                      </p>
                    </form>
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