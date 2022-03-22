import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
    ingredients: [
        { type: "salad", amount: 0, unitPrice: 15 },
        { type: "cheese", amount: 0, unitPrice: 20 },
        { type: "meat", amount: 1, unitPrice: 50 },
    ],
    price: 80,
};

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            var newIngredients = state.ingredients;
            var price = state.price;
            for (let i = 0; i < state.ingredients.length; i++) {
                if (newIngredients[i].type === action.payload.type) {
                    newIngredients[i].amount += 1;
                    price += newIngredients[i].unitPrice;
                }
            }
            return {
                ...state,
                ingredients: newIngredients,
                price: price,
            };
        case actionTypes.REMOVE_INGREDIENT:
            var newIngredients = state.ingredients;
            var price = state.price;
            for (let i = 0; i < state.ingredients.length; i++) {
                let least = newIngredients[i].type == "meat" ? 1 : 0;
                if (newIngredients[i].type === action.payload.type && newIngredients[i].amount > least) {
                    newIngredients[i].amount = newIngredients[i].amount - 1;
                    price = price - newIngredients[i].unitPrice;
                }
            }
            return {
                ...state,
                ingredients: newIngredients,
                price: price,
            };
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: "salad", amount: 0, unitPrice: 15 },
                    { type: "cheese", amount: 0, unitPrice: 20 },
                    { type: "meat", amount: 1, unitPrice: 50 },
                ],
                price: 80,
            };
        default:
            return {
                ...state,
            };
    }
}

const ordersReducer = (state = { isLoading: true, orders: [], ordersLoadingError: false }, action) => {
    switch (action.type) {
        case actionTypes.ORDERS_LOADING:
            return {
                ...state,
                isLoading: true,
                orders: [],
                ordersLoadingError: false,
            };
        case actionTypes.ORDERS_LOADED:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    key: key,
                })
            }
            return {
                ...state,
                isLoading: false,
                orders: orders,
                ordersLoadingError: false,
            };
        case actionTypes.ORDERS_LOADING_FAILED:
            return {
                ...state,
                isLoading: false,
                orders: [],
                ordersLoadingError: true,
            };
        default:
            return {
                ...state,
            }
    }
};

const authReducer = (state = { token: null, userId: null, authLoading: false, authErrorMsg: null }, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                authLoading: false,
                authErrorMsg: null,
                token: action.payload.token,
                userId: action.payload.userId,
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                authLoading: false,
                authErrorMsg: null,
                token: null,
                userId: null,
            };
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: true,
            };
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authLoading: false,
                authErrorMsg: action.payload,
                token: null,
                userId: null,
            }
        default:
            return {
                ...state,
            };
    }
}

const Reducer = combineReducers({
    ingredientsState: ingredientsReducer,
    ordersState: ordersReducer,
    authState: authReducer,
});

export default Reducer;
