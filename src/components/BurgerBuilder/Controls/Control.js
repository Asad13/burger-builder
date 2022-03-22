
const Control = ({ ingredient, addIngredient, removeIngredient }) => {
    return (
        <div>
            <h3>{ingredient.type}&nbsp;Price: {ingredient.unitPrice}</h3>
            <div>
                <button type="button" onClick={addIngredient}>ADD</button>
                <button type="button" onClick={removeIngredient}>REMOVE</button>
            </div>
        </div>
    )
};

export default Control;