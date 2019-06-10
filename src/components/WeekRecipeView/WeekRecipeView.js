import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Spinner } from 'reactstrap';

// SERVICES
import { updateMealSchedule, } from '../../services/main';


//COMPONENTS
import { readMealSchedule, readRecipeById } from '../../services/main';


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
      recipe: [],
      date: new Date(),
      //items: getItems(6),

    }
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
            console.log("meals", response.data.data)
            this.setState({ meals: response.data.data })
          }
        })
        .then(() => {
          for (let i = 0; i < this.state.meals.length; i++) {
            readRecipeById(this.props.token, this.state.meals[i].recipe_id)
              .then((response) => {
                console.log("Recipe", response)

              })
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
    } catch (e) {
      console.log(e);
    };
  };

  render() {
    return (<>
      <DragDropContext onDragEnd={this.onDragEnd} >
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.meals.length === 0 ? <Spinner /> :
                this.state.meals.map((item, index) => (
                  <Draggable key={index} draggableId={`${item.recipe_name}-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <div class="card" ref={provided.innerRef} style={{ backroundColor: "blue", maxWidth: "20%" }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div class="card-image">
                            <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px", maxWidth: "250px" }} />
                            <a class="btn-floating halfway-fab waves-effect waves-light" style={{ border: '1px solid navy' }}><i class="material-icons">add</i></a>
                          </div>
                          <div class="card-content">
                            {
                              index === 0 ? <p style={{ color: '#06174c' }}>Monday</p> : index === 1 ? <p style={{ color: '#06174c' }}>Tuesday</p> : index === 2 ? <p style={{ color: '#06174c' }}>Wednesday</p> : index === 3 ? <p style={{ color: '#06174c' }}>Thursday</p> : index === 4 ? <p style={{ color: '#06174c' }}>Friday</p> : null
                            }
                            <h5 class="card-title" style={{ color: "black" }}>{item.recipe_name}</h5>
                            <form action="#" className="text-left mt-3">
                              <p>
                                <label>
                                  <input type="checkbox" value={item.meal_schedule_id} class="checkbox" id={{ index }} style={{ fontSize: "12px" }}
                                    onClick={this.pantryCalc}></input>
                                  <span htmlFor={{ index }} style={{ fontSize: "12px" }}>Cooked?</span>
                                </label>
                              </p>
                            </form>
                            {
                              /*<h6 className="pt-1">Ingredients</h6>*/
                            }
                            <ul>
                              {/*
              item.recipe.ingredientLines.slice(0,4).map((ele,i)=>{
                 return <li style={{fontSize: '.9rem'}} key={i}>{ele}</li>
              })*/
                              }
                            </ul>
                          </div>
                        </div>
                      </>

                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
    )
  }
}

export default withRouter(WeekRecipeView)