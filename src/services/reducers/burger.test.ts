import { TABS } from '../../models/constants';
import { IIngredient } from '../../models/models';
import { burgerReducer, TBurgerState } from './burger';
import { v4 as uuidv4 } from 'uuid';

const initialState: TBurgerState = {
    ingredients: [],
    ingredientRequest: false,
    ingredientFailed: false,
    viewedIngredient: null,
    activeTab: TABS[0].type,
    modalVisible: false,
    selectedIngredients: [],
    selectedBun: null
}

const bun1:IIngredient = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
    qty: 0
  };

const meat2:IIngredient = {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    qty: 0
}

const bun3:IIngredient = {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    qty: 0
}

describe('Burger reducer', () => {
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerReducer(initialState, {
            type: 'GET_INGREDIENTS_REQUEST'
        })).toEqual({
            ingredients: [],
            ingredientRequest: true,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerReducer(initialState, {
            type: 'GET_INGREDIENTS_SUCCESS',
            ingredients: [bun1]
        })).toEqual({
            ingredients: [{...bun1, qty: 0}],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle SHOW_INGREDIENT_DETAILS', () => {
        expect(burgerReducer(initialState, {
            type: 'GET_INGREDIENTS_FAILED'
        })).toEqual({
            ingredients: [],
            ingredientRequest: false,
            ingredientFailed: true,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })
    })
    
    it('should handle SHOW_INGREDIENT_DETAILS', () => {
        expect(burgerReducer({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'SHOW_INGREDIENT_DETAILS',
            selectedIngredient: meat2
        })).toEqual({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: meat2,
            activeTab: TABS[0].type,
            modalVisible: true,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle HIDE_INGREDIENT_DETAILS', () => {
        expect(burgerReducer({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: meat2,
            activeTab: TABS[0].type,
            modalVisible: true,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'HIDE_INGREDIENT_DETAILS',
        })).toEqual({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle GET_INGREDIENT_BY_ID', () => {
        expect(burgerReducer({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'GET_INGREDIENT_BY_ID',
            _id: "60d3b41abdacab0026a733c6"
        })).toEqual({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: bun1,
            activeTab: TABS[0].type,
            modalVisible: true,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle CHANGE_TAB', () => {
        expect(burgerReducer(initialState, {
            type: 'CHANGE_TAB',
            selectedTab: TABS[1].type
        })).toEqual({
            ingredients: [],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[1].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })
    })

    it('should handle ADD_INGREDIENT and add bun', () => {
        expect(burgerReducer({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'ADD_INGREDIENT',
            selectedIngredient: bun1,
            guid: uuidv4()
        })).toEqual({
            ingredients: [{...bun1, qty: 2}, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: bun1
        })
    })

    it('should handle ADD_INGREDIENT and add not bun', () => {
        const guid = uuidv4();
        expect(burgerReducer({
            ingredients: [bun1, meat2],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'ADD_INGREDIENT',
            selectedIngredient: meat2,
            guid: guid
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 1}],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid, qty: 0}],
            selectedBun: null
        })
    })

    it('should handle one more ADD_INGREDIENT and add not bun', () => {
        const guid = uuidv4();
        expect(burgerReducer({
            ingredients: [bun1, {...meat2, qty: 1}],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'ADD_INGREDIENT',
            selectedIngredient: meat2,
            guid: guid
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 2}],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid, qty: 1}],
            selectedBun: null
        })
    })

    it('should handle ADD_INGREDIENT and change bun', () => {
        const guid = uuidv4();
        expect(burgerReducer({
            ingredients: [bun1, meat2, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        }, {
            type: 'ADD_INGREDIENT',
            selectedIngredient: bun3,
            guid: guid
        })).toEqual({
            ingredients: [bun1, meat2, {...bun3, qty: 2}],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: bun3
        })
    })

    it('should handle REMOVE_INGREDIENT type bun', () => {
        const guid = uuidv4();
        expect(burgerReducer({
            ingredients: [bun1, meat2, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: bun1
        }, {
            type: 'REMOVE_INGREDIENT',
            removedIngredient: bun1
        })).toEqual({
            ingredients: [bun1, meat2, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: bun1
        })
    })

    it('should handle REMOVE_INGREDIENT type not bun', () => {
        const guid1 = uuidv4();
        const guid2 = uuidv4();
        expect(burgerReducer({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid1}, {...meat2, guid: guid2}],
            selectedBun: bun1
        }, {
            type: 'REMOVE_INGREDIENT',
            removedIngredient: {...meat2, guid: guid1}
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 1}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid2}],
            selectedBun: bun1
        })
    })

    it('should handle SUBMIT_ORDER_SUCCESS and reset initial state', () => {
        expect(burgerReducer({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: uuidv4()}, {...meat2, guid: uuidv4()}],
            selectedBun: bun1
        }, {
            type: 'SUBMIT_ORDER_SUCCESS',
            orderId: 123456
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 0}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [],
            selectedBun: null
        })

    })

    it('should handle MOVE_INGREDIENT and upwardDrag', () => {
        const guid1 = uuidv4();
        const guid2 = uuidv4();

        expect(burgerReducer({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid1}, {...meat2, guid: guid2}],
            selectedBun: bun1
        }, {
            type: 'MOVE_INGREDIENT',
            dragIndex: 1,
            hoverIndex: 0
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid2}, {...meat2, guid: guid1}],
            selectedBun: bun1
        })
    })

    it('should handle MOVE_INGREDIENT and not upwardDrag', () => {
        const guid1 = uuidv4();
        const guid2 = uuidv4();

        expect(burgerReducer({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid1}, {...meat2, guid: guid2}],
            selectedBun: bun1
        }, {
            type: 'MOVE_INGREDIENT',
            dragIndex: 0,
            hoverIndex: 1
        })).toEqual({
            ingredients: [bun1, {...meat2, qty: 2}, bun3],
            ingredientRequest: false,
            ingredientFailed: false,
            viewedIngredient: null,
            activeTab: TABS[0].type,
            modalVisible: false,
            selectedIngredients: [{...meat2, guid: guid2}, {...meat2, guid: guid1}],
            selectedBun: bun1
        })
    })
    

})