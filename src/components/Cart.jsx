import { ShoppingCart, Trash2 } from 'lucide-react';

const intl = new Intl.NumberFormat("en-IN", {
  style: 'currency',
  currency: 'INR'
});

export default function Cart({ cart, checkout, removeItem }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    total += current.pizza.sizes[current.size];
  }

  if (cart.length === 0) {
    return (
      <div className='cart'>
        <h2>Cart</h2>
        <div className="empty-cart">
          <ShoppingCart size={64} style={{ opacity: 0.3, margin: '0 auto' }} />
          <p>Your cart is empty</p>
          <p style={{ fontSize: '0.9rem' }}>Add some delicious pizzas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span>
            <span className="type">{item.pizza.name}</span>
            <span className="price">{intl.format(item.pizza.sizes[item.size])}</span>
            {removeItem && (
              <button
                onClick={() => removeItem(index)}
                style={{
                  padding: '0.5rem',
                  marginLeft: '0.5rem',
                  background: 'transparent',
                  border: '1px solid var(--error)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'auto',
                }}
                title="Remove item"
              >
                <Trash2 size={18} color="var(--error)" />
              </button>
            )}
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
