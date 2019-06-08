import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Spinner} from 'reactstrap';


//COMPONENTS
import { readMealSchedule, readRecipeById} from '../../services/main';


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
      recipes: [],
      date: new Date(),
      modal: false,
      backdrop: false,

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

  handleToggle = (e) => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  componentDidMount() {
    setTimeout(() => {
      readMealSchedule(this.props.token, this.props.id)
        .then((response) => {
          {
            console.log("MS", response.data.data)
            this.setState({ meals: response.data.data })
          }
        })
       .then(()=>{
          for(let i=0; i<this.state.meals.length; i++){
            readRecipeById(this.props.token, this.state.meals[i].recipe_id)
            .then((response)=>{
              console.log("Items", response)
            })
          }
        })
        .catch(error => {
          console.log(error.toString())
        })
    }, 1000)
  }

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
              {this.state.meals.length === 0 ? <Spinner/>:
                this.state.meals.map((item, index) => (
                <Draggable key={index} draggableId={`${item.recipe_name}-${item.recipe_owner}`} index={index}>
                  {(provided, snapshot) => (
                    <>
                      <div class="card" ref={provided.innerRef} style={{ backroundColor: "black" }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div class="card-image">
                          <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px" }} />
                          <a class="btn-floating halfway-fab waves-effect waves-light modal-trigger" style={{ border: '1px solid navy' }} onClick={this.handleToggle}><i class="material-icons">add</i></a>
                        </div>
                        <div class="card-content">
                          {
                            index === 0 ? <p style={{ color: '#06174c' }}>Monday</p> : index === 1 ? <p style={{ color: '#06174c' }}>Tuesday</p> : index === 2 ? <p style={{ color: '#06174c' }}>Wednesday</p> : index === 3 ? <p style={{ color: '#06174c' }}>Thursday</p> : index === 4 ? <p style={{ color: '#06174c' }}>Friday</p> : null
                          }
                          <h5 class="card-title" style={{ color: "black" }}>{item.recipe_name}</h5>

                          <form action="#" className="text-left mt-3">
                            <p>
                              <label>
                                <input type="checkbox" class="checkbox" id={{ index }} style={{ fontSize: "12px" }}></input>
                                <span htmlFor={{ index }} style={{ fontSize: "12px" }}>Cooked?</span>
                              </label>
                            </p>
                          </form>
                          <Modal isOpen={this.state.modal} toggle={this.handleToggle}>
                            <ModalHeader toggle={this.toggle}>{item.recipe_name}</ModalHeader>
                            <ModalBody>
                            <img src={item.recipe_image_url} className="materialboxed" style={{ backgroundColor: "black", height: "200px" }} />
                            <h6 className="pt-1">Ingredients</h6>
                            <ul>
                                {
                                  /*item.map((ele,i)=>{
                                     return <li style={{fontSize: '.9rem'}} key={i}>{ele}</li>
                                  })*/
                                }
                              </ul>         
                            </ModalBody>
                            <ModalFooter>
                              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                          </Modal>
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