import Top from '../../../assets/images/top.png';
import Bottom from '../../../assets/images/bottom.png';
import Meat from '../../../assets/images/meat.png';
import Salad from '../../../assets/images/salad.png';
import Cheese from '../../../assets/images/cheese.png';
import './Ingredient.css';

const Ingredient = props => {
    let ingredient = null;
    switch (props.type) {
        case "top":
            ingredient = <img src={Top} alt="Burger Top" />;
            break;
        case "bottom":
            ingredient = <img src={Bottom} alt="Burger Bottom" />;
            break;
        case "meat":
            ingredient = <img src={Meat} alt="Burger Top" />;
            break;
        case "salad":
            ingredient = <img src={Salad} alt="Burger Salad" />;
            break;
        case "cheese":
            ingredient = <img src={Cheese} alt="Burger Cheese" />;
            break;
        default:
            ingredient = null;
    }
    return (
        <div className='ingredient'>
            {ingredient}
        </div>
    )
};

export default Ingredient;