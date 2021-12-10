import React, { useEffect } from 'react';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import { fetchIngredients } from '../../utils/api';
import { BUN, MAIN, SAUCE, DEFAULT_SELECTED_INGREDIENT_ID } from '../../../models/constants';
import OrderDetails from '../../order-details/order-details';

const Main = () => {
    
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [orderModalVisible, setOrderModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState('');

    const onSubmitOrder = () => {
        // submit selected ingredients and receive order id
        setOrderId('034536');
        setOrderModalVisible(true);
    }

    const onOrderModalClose = () => {
        setOrderId('');
        setOrderModalVisible(false);
    }

    const setInitialSelectedIngredient = (ingredients: any) => {
        const defaultBun = ingredients.filter((i:any) => i._id === DEFAULT_SELECTED_INGREDIENT_ID)[0] ?? ingredients[0]; 
        const initialSelectedIngredients:any = [{...defaultBun, is_locked: true}, {...defaultBun, is_locked: true}];
        return initialSelectedIngredients;
    }

    useEffect(() => {
        fetchIngredients
            .then((data:any) => {
                  setIngredients(data.data.map((i:any) => {
                      return {...i, is_locked: false}
                  }));
                  setSelectedIngredients(setInitialSelectedIngredient(data.data));
             })
            .catch(e => {
                 console.log(e);
            });
    }, []);

    const tabs = [
        {displayName: 'Булки', type: BUN}, 
        {displayName: 'Соусы', type: SAUCE}, 
        {displayName: 'Начинки', type: MAIN}]

    return (<main className={mainAreaStyles.main}>
        <BurgerConstructor tabs={tabs} ingredients={ingredients}/>
        <BurgerIngredient selectedIngredients = {selectedIngredients} submitOrder={onSubmitOrder}/>
        {orderModalVisible && (<OrderDetails order={{_id: orderId}} visible={orderModalVisible} onCancel={onOrderModalClose} />)}
    </main>)
}

export default Main
