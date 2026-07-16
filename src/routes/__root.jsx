import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { useState, useContext, useRef, useEffect } from 'react';
import { CartContext, AuthContext } from '../contexts';
import { ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import AuthProvider from '../components/AuthProvider';
import AuthModal from '../components/AuthModal';

function NavAuth() {
  const [{ user, loading }, { logout }] = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return <div className="nav-auth-placeholder" />;
  }

  if (!user) {
    return (
      <>
        <button
          type="button"
          className="nav-auth nav-auth-guest"
          onClick={() => setModalOpen(true)}
          aria-label="Sign in or sign up"
        >
          <User size={26} />
        </button>
        {modalOpen && <AuthModal onClose={() => setModalOpen(false)} />}
      </>
    );
  }

  const initial = user.name.trim().charAt(0).toUpperCase();

  return (
    <div className="nav-auth-menu" ref={menuRef}>
      <button
        type="button"
        className="nav-auth nav-auth-avatar"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="nav-avatar-circle">{initial}</span>
        <ChevronDown size={16} className={menuOpen ? 'nav-avatar-chevron open' : 'nav-avatar-chevron'} />
      </button>
      {menuOpen && (
        <div className="nav-auth-dropdown">
          <p className="nav-auth-dropdown-name">{user.name}</p>
          <p className="nav-auth-dropdown-email">{user.email}</p>
          <button
            type="button"
            className="nav-auth-dropdown-logout"
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export const Route = createRootRoute({
  component: () => {
    const [cart, setCart] = useState([]);

    return (
      <AuthProvider>
        <CartContext.Provider value={[cart, setCart]}>
          <nav>
            <div className="nav-content">
              <Link to="/">
                <img className="logo" src="/padre_gino.svg" alt="Padre Gino's Pizza" />
              </Link>
              <div className="nav-actions">
                <NavAuth />
                <Link to="/order" className="nav-cart">
                  <ShoppingCart size={32} />
                  {cart.length > 0 && (
                    <span className="nav-cart-number">{cart.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </nav>
          <Outlet />
        </CartContext.Provider>
      </AuthProvider>
    );
  },
});
