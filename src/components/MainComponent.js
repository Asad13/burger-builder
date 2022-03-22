import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Header";
import BurgerBuilder from "./BurgerBuilder";
import Checkout from './Checkout';
import Order from './Order';
import Auth from './Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import { useEffect } from 'react';

const mapStateToProps = state => {
    return {
        token: state.authState.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

const MainComponent = props => {
    useEffect(() => {
        props.authCheck();
    });

    let routes = null;
    if (props.token === null) {
        routes = (
            <Routes>
                <Route path="login" element={<Auth />} />
                <Route path="*" element={<Navigate to="login" />} />
            </Routes>
        )
    } else {
        routes = (
            <Routes>
                <Route path="/" element={<BurgerBuilder />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order" element={<Order />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        )
    }
    return (
        <div>
            <Header />
            {routes}
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);