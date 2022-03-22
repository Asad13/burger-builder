import React from 'react';
import Burger from './Burger';
import Controls from './Controls';
import Summary from './Summary';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredientsState: state.ingredientsState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: type => dispatch(addIngredient(type)),
        removeIngredient: type => dispatch(removeIngredient(type)),
    };
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSummary: false,
        };
    }

    toggleSummary = () => {
        this.setState({
            showSummary: !this.state.showSummary,
        })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', width: '100%', padding: "1rem" }}>
                    <Burger ingredients={this.props.ingredientsState.ingredients} />
                    <Controls ingredients={this.props.ingredientsState.ingredients} price={this.props.ingredientsState.price} addIngredient={this.props.addIngredient} removeIngredient={this.props.removeIngredient} toggleSummary={this.toggleSummary} />
                </div>
                {
                    this.state.showSummary && <Summary ingredients={this.props.ingredientsState.ingredients} price={this.props.ingredientsState.price} showSummary={this.state.showSummary} toggleSummary={this.toggleSummary} />
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);