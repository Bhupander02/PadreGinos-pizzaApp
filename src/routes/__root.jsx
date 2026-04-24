import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import { CartContext } from '../contexts';
import { ShoppingCart } from 'lucide-react';

export const Route = createRootRoute({
  component: () => {
    const [cart, setCart] = useState([]);

    return (
      <CartContext.Provider value={[cart, setCart]}>
        <nav>
          <div className="nav-content">
            <Link to="/">
              <img className="logo" src="/padre_gino.svg" alt="Padre Gino's Pizza" />
            </Link>
            <Link to="/order" className="nav-cart">
              <ShoppingCart size={32} />
              {cart.length > 0 && (
                <span className="nav-cart-number">{cart.length}</span>
              )}
            </Link>
          </div>
        </nav>
        <Outlet />
      </CartContext.Provider>
    );
  },
});
