import Control from "./Control";

const Controls = ({ ingredients, price, addIngredient, removeIngredient, toggleSummary }) => {
    return (
        <div style={{ flex: '50%', maxWidth: '50%', width: '50%' }}>
            {
                ingredients.map((ingredient, index) => <Control key={index} ingredient={ingredient} addIngredient={() => addIngredient(ingredient.type)} removeIngredient={() => removeIngredient(ingredient.type)} />)
            }
            <p>Total Price: <strong>{price}</strong></p>
            <div>
                <button type="button" onClick={toggleSummary}>Order Now</button>
            </div>
        </div>
    )
};

export default Controls;