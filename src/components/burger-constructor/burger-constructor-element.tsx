import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import { ConstructorElement, DragIcon  } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { REMOVE_INGREDIENT } from '../../services/actions/burger';
import { ingredientPropType } from '../../utils/prop-type';
import styles from './burger-constructor-element.module.css';
import { DragSource, DropTarget } from 'react-dnd';

const BurgerConstructorElement = forwardRef(({item, index, isDragging, connectDragSource, connectDropTarget}:any, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = isDragging ? 0 : 1;
    useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current,
    }));
    
    const dispatch = useDispatch();

    return (
        <div ref={elementRef} style={{opacity}} className={styles.constructorElementContainer}>
                <div className="mr-5"><DragIcon type="primary" /></div>
                <ConstructorElement
                    text={item.name}
                    price={item.price} 
                    thumbnail={item.image}
                    handleClose={() => dispatch({type: REMOVE_INGREDIENT, removedIngredient: item, index:index})}
        />
        </div>
    )
});

export default DropTarget('items', {
    hover(props:any, monitor:any, component:any) {
        if (!component) {
            return null;
        }
        // node = HTML Div element from imperative API
        const node = component.getNode();
        if (!node) {
            return null;
        }

        const dragItem = monitor.getItem();
        if (!dragItem){
            return null;
        }

        const dragIndex = dragItem.index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        props.moveIngredient(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource('items', {
    beginDrag: (props:any) => (
    {
        id: props.item._id,
        index: props.index,
    }),
}, (connect:any, monitor:any) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(BurgerConstructorElement));

BurgerConstructorElement.propTypes = {
    item: ingredientPropType
}
