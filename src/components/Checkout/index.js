import React from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetIngredients } from '../../redux/actionCreators';
import axios from "axios";
import './Checkout.css';
import Loader from "../Loader";

const mapStateToProps = state => {
    return {
        ingredientsState: state.ingredientsState,
        token: state.authState.token,
        userId: state.authState.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseInfos: {
                address: "",
                phone: "",
                paymentMethod: "Bkash",
            },
            goBack: false,
            isLoading: false,
            orderSuccessful: false,
            isModelOpen: false,
            modelMsg: "",
        };
    }

    handleSubmit = event => {
        this.setState({
            isLoading: true,
        });
        event.stopPropagation();
        event.preventDefault();

        const ingredients = this.props.ingredientsState.ingredients.map(item => {
            return { type: item.type, amount: item.amount };
        });
        const order = {
            ingredients: ingredients,
            customerInfo: this.state.purchaseInfos,
            price: this.props.ingredientsState.price,
            orderTime: new Date().toISOString(),
            userId: this.props.userId,
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, order, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`,
            }
        }).then(response => {
            if (response.status === 201) {
                this.props.resetIngredients();
                this.setState({
                    isLoading: false,
                    orderSuccessful: true,
                    isModelOpen: true,
                    modelMsg: "Order submitted successfully.",
                });
            } else {
                this.setState({
                    isLoading: false,
                    orderSuccessful: false,
                    isModelOpen: true,
                    modelMsg: "Order submition unsuccessful.",
                });
            }
        }).catch(error => {
            this.setState({
                isLoading: false,
                orderSuccessful: false,
                isModelOpen: true,
                modelMsg: "Order submition unsuccessful.",
            });
        });

        this.setState({
            purchaseInfos: {
                address: "",
                phone: "",
                paymentMethod: "Bkash",
            }
        })
    }

    handleChange = event => {
        this.setState({
            purchaseInfos: {
                ...this.state.purchaseInfos,
                [event.target.name]: event.target.value,
            }
        })
    }

    render() {
        if (this.state.goBack) {
            return <Navigate to="/" replace={true} />;
        } else if (this.state.isLoading) {
            return <Loader />;
        }

        return (
            <div>
                <div className="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <textarea className="form-control" rows={"5"} name="address" value={this.state.purchaseInfos.address} onChange={this.handleChange} placeholder="Your Address" />
                        <input type="tel" className="form-control" name="phone" value={this.state.purchaseInfos.phone} onChange={this.handleChange} placeholder="Your Phone Number" />
                        <select className="form-control" name="paymentMethod" value={this.state.purchaseInfos.paymentMethod} onChange={this.handleChange}>
                            <option value="Bkash">Bkash</option>
                            <option value="Cash on Delivary">Cash on Delivary</option>
                        </select>
                        <input type="submit" className="form-control" style={{ cursor: 'pointer' }} value="Order" />
                        <input type="button" className="form-control" onClick={() => { this.setState({ goBack: true }) }} style={{ cursor: 'pointer' }} value="Cancel" />
                    </form>
                </div>
                {this.state.isModelOpen && (
                    <div className="modal" style={{ color: this.state.orderSuccessful ? "green" : "red" }} onClick={() => {
                        this.setState({ goBack: true });
                    }}>
                        {this.state.modelMsg}
                    </div>
                )}
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);