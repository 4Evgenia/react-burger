import React, { useEffect } from 'react';
import mainAreaStyles from './main.module.css';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import BurgerIngredient from '../../burger-ingredients/burger-ingredients';
import { fetchIngredients, postOrder } from '../../utils/api';
import { BUN, MAIN, SAUCE, DEFAULT_SELECTED_INGREDIENT_ID } from '../../../models/constants';
import OrderDetails from '../../order-details/order-details';
import { BurgerConstructorContext } from '../../utils/burger-constructor-context';

const Main = () => {
    
    const [ingredients, setIngredients] = React.useState([]);
    const [selectedIngredients, setSelectedIngredients] = React.useState([]);
    const [orderModalVisible, setOrderModalVisible] = React.useState(false);
    const [orderId, setOrderId] = React.useState('');

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
        setOrderId('');
        setOrderModalVisible(false);
    }

    const setInitialSelectedIngredient = (ingredients: any) => {
        const defaultBun = ingredients.filter((i:any) => i._id === DEFAULT_SELECTED_INGREDIENT_ID)[0] ?? ingredients[0]; 
        let initialSelectedIngredients:any = [{...defaultBun, is_locked: true}, {...defaultBun, is_locked: true}];
        initialSelectedIngredients = addIngredient(ingredients[4], initialSelectedIngredients);
        initialSelectedIngredients = addIngredient(ingredients[7], initialSelectedIngredients);
        initialSelectedIngredients = addIngredient(ingredients[11], initialSelectedIngredients);
        initialSelectedIngredients = addIngredient(ingredients[1], initialSelectedIngredients);
        return initialSelectedIngredients;
    }

    const addIngredient = (ingredient:any, initialSelectedIngredients: Array<any>) => {
        if (ingredient.type === BUN){
            const bunIndex = initialSelectedIngredients.findIndex((i:any) => i.type === BUN);
            if (bunIndex >= 0)
                return initialSelectedIngredients;
            return [{...ingredient, is_locked: true}].concat([...initialSelectedIngredients]).concat({...ingredient, is_locked: true});
        }
        else{
            return [initialSelectedIngredients[0], {...ingredient}].concat([...initialSelectedIngredients.slice(1)]);
        }
    }

    useEffect(() => {
        fetchIngredients
            .then((data:any) => {
                  setIngredients(data.data.map((i:any) => {
                      return {...i, is_locked: false}
                  }));
                  setSelectedIngredients(setInitialSelectedIngredient(data.data) as any);
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
        <BurgerConstructorContext.Provider value={{selectedIngredients}}>
            <BurgerConstructor submitOrder={onSubmitOrder}/>
        </BurgerConstructorContext.Provider>
        {orderModalVisible && (<OrderDetails order={{_id: orderId}} visible={orderModalVisible} onCancel={onOrderModalClose} />)}
    </main>)
}

export default Main
