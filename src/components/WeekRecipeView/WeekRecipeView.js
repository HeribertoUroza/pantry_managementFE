import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


//ASSETS
import logoDot from '../../assets/Branding/PossiblePantryLogoGreenDott.png';
import logoName from '../../assets/Branding/PossiblePantryLogoGreenName.png';


const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 7;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? '#2e6e51' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'white' : '#e5e3e4',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});



class WeekRecipeView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: [],
            date: new Date(),
            items: getItems(6),

        }
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items,
        });
      }
   

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            /*readUserRecipes(user.email)
                .then((response) => {
                    const rootObj = response.data.data
                    this.setState({
                        id: rootObj.id,
                        email: rootObj.email,
                        firebaseUID: rootObj.firebaseuid,
                        name: rootObj.nameofuser,
                        username: rootObj.username,
                    })
                })*/
        })
    }

    render() {
        return (<>
 <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
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