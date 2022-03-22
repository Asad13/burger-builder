const OrderItem = ({ order }) => {
    return (
        <div style={{ width: '400px', padding: '2rem', borderRadius: '7px', border: '1px solid #ddd', marginTop: '1rem' }}>
            <h3>Order ID: {order._id}</h3>
            <p>Order Time: {order.orderTime}</p>
            <p>Price: <strong>{order.price}</strong></p>
        </div>
    )
};

export default OrderItem;