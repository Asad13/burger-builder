import * as ActionTypes from './actionTypes';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const authSuccess = (token, userId) => ({
    type: ActionTypes.AUTH_SUCCESS,
    payload: {
        token: token,
        userId: userId,
    },
});

const authLoading = () => ({
    type: ActionTypes.AUTH_LOADING,
});

const authFailed = message => ({
    type: ActionTypes.AUTH_FAILED,
    payload: message,
})

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading());
    const authData = {
        email: email,
        password: password,
    }

    const url = process.env.REACT_APP_BACKEND_URL + '/api/user';
    const AUTH_URL = (mode === 'Login') ? `${url}/login` : `${url}/signup`;

    axios.post(AUTH_URL, authData).then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        const decoded = jwtDecode(response.data.token);
        const expirationTime = new Date(decoded.exp * 1000);
        localStorage.setItem('expirationTime', expirationTime);

        dispatch(authSuccess(response.data.token, response.data.user._id));
    }).catch(error => {
        dispatch(authFailed(error.response.data));
    });
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');

    return {
        type: ActionTypes.AUTH_LOGOUT,
    }
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        logout();
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime <= new Date()) {
            logout();
        } else {
            dispatch(authSuccess(token, localStorage.getItem('userId')));
        }
    }
}