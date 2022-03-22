import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../redux/actionCreators';
import Loader from '../Loader';
import OrderItem from './OrderItem';
import './Order.css';

const mapStateToProps = state => {
    return {
        isLoading: state.ordersState.isLoading,
        orders: state.ordersState.orders,
        ordersLoadingError: state.ordersState.ordersLoadingError,
        token: state.authState.token,
        userId: state.authState.userId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    };
}

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        return (
            <div className='container'>
                {
                    this.props.isLoading && <Loader />
                }
                {
                    this.props.orders && (
                        <div className='ordersContainer'>
                            {
                                this.props.orders.map(order => <OrderItem key={order.key} order={order} />)
                            }
                        </div>
                    )
                }
                {
                    (this.props.orders.length == 0 && !this.props.isLoading && !this.props.ordersLoadingError) ? "You have not placed any orders to show." : null
                }
                {
                    this.props.ordersLoadingError && <h3>Error Loading Orders</h3>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);