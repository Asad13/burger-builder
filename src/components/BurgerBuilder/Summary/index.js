import React from 'react';
import { Link } from 'react-router-dom';
import './Summary.css';

const Summary = ({ ingredients, price, showSummary, toggleSummary }) => {
    const summary = React.useRef(null);
    React.useEffect(() => {
        if (!showSummary) return;

        function handleClick(event) {
            if (summary.current && !summary.current.contains(event.target)) {
                toggleSummary();
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
    });
    return (
        <div ref={summary} className='summary'>
            <h2>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ textTransform: 'capitalize' }}>Bun Price:</span>
                <span>TK 30</span>
            </div>
            <div>
                {
                    ingredients.map((ingredient, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textTransform: 'capitalize' }}>{ingredient.type}:</span>
                            <span>{ingredient.amount} &#215; {ingredient.unitPrice}</span>
                            <span>TK {ingredient.amount * ingredient.unitPrice}</span>
                        </div>
                    ))
                }
            </div>
            <div className="priceContainer">
                <span style={{ float: 'right' }}>Total: TK{price}</span>
            </div>
            <div>
                <Link to="/checkout">proceed to checkout</Link>
                <button type='button' onClick={toggleSummary}>cancel</button>
            </div>
        </div>
    );
}

export default Summary;