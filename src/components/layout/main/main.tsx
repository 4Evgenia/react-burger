import React, { useEffect } from 'react';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import { fetchIngredients, postOrder } from '../../utils/api';
import { BUN, MAIN, SAUCE, DEFAULT_SELECTED_INGREDIENT_ID } from '../../../models/constants';
import OrderDetails from '../../order-details/order-details';
import { BurgerConstructorContext } from '../../../services/burger-constructor-context';
import Modal from '../modal/modal';

const Main = () => {
    
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [selectedBun, setSelectedBun] = React.useState({});
    const [orderModalVisible, setOrderModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null as any);

    const onSubmitOrder = () => {
        // submit selected ingredients and receive order id
        const data = selectedIngredients.map((i:any) => i._id);
        postOrder(data).then((data:any) => {
            setOrderId(data.order.number);
            setOrderModalVisible(true);
        })
        .catch(e => {
            console.log(e);
       });
    }

    const onOrderModalClose = () => {
        setOrderId(null as any);
        setOrderModalVisible(false);
    }

    const setInitialSelectedIngredients = (ingredients: any) => {
        const defaultBun = ingredients.filter((i:any) => i._id === DEFAULT_SELECTED_INGREDIENT_ID)[0] ?? ingredients[0];
        setSelectedBun(defaultBun);
        setSelectedIngredients([ingredients[4], ingredients[7], ingredients[11], ingredients[1]] as any);
    }

    const addIngredient = (ingredient:any) => {
        return ingredient.type === BUN ? {
            selectedBun: ingredient,
            selectedIngredients: [...selectedIngredients]
        } : {
            selectedBun: selectedBun,
            selectedIngredients: [...selectedIngredients].concat({...ingredient})
        }
    }

    useEffect(() => {
        fetchIngredients
            .then((data:any) => {
                  setIngredients(data.data.map((i:any) => {
                      return i;
                  }));
                  setInitialSelectedIngredients(data.data);
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
        <BurgerIngredient tabs={tabs} ingredients={ingredients}/>
        <BurgerConstructorContext.Provider value={{selectedIngredients, selectedBun}}>
            <BurgerConstructor submitOrder={onSubmitOrder}/>
        </BurgerConstructorContext.Provider>
        {
            orderId && (<Modal visible = {orderModalVisible} onCancel={onOrderModalClose}>
                            <OrderDetails order={{_id: orderId}} />
                        </Modal>)
        }
        
    </main>)
}

export default Main
