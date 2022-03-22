import Ingredient from "../Ingredient";

const Burger = ({ ingredients }) => {
    let allIngredients = ingredients.map(ingredient => {
        let itemArray = [...Array(ingredient.amount).keys()];
        return itemArray.map(index => <Ingredient type={ingredient.type} key={`${ingredient.type}${index}`} />);
    }).reduce((arr, element) => arr.concat(element), []);
    return (
        <div style={{ flex: '50%', maxWidth: '50%', width: '50%' }}>
            <Ingredient type="top" />
            {allIngredients}
            <Ingredient type="bottom" />
        </div>
    )
};

export default Burger;