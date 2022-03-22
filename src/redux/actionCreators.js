import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = type => ({
    type: actionTypes.ADD_INGREDIENT,
    payload: {
        type: type,
    }
});

export const removeIngredient = type => ({
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
        type: type,
    }
});

export const resetIngredients = () => ({
    type: actionTypes.RESET_INGREDIENTS,
});

const ordersLoading = () => ({
    type: actionTypes.ORDERS_LOADING,
})

const ordersLoaded = orders => ({
    type: actionTypes.ORDERS_LOADED,
    payload: orders,
});

const ordersLoadingFailed = () => ({
    type: actionTypes.ORDERS_LOADING_FAILED,
})

export const fetchOrders = (token, userId) => dispatch => {
    dispatch(ordersLoading());

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(response => {
        dispatch(ordersLoaded(response.data));
    }).catch(error => {
        dispatch(ordersLoadingFailed());
    })
}