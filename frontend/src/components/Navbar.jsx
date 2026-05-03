import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../api/axios';

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [bump, setBump] = useState(false);

  const fetchCartCount = async () => {
    if (isAuthenticated()) {
      try {
        const res = await cartAPI.getCart();
        const newCount = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(prev => {
          if (newCount > prev && prev !== 0) {
            setBump(true);
            setTimeout(() => setBump(false), 400);
          }
          return newCount;
        });
      } catch (err) {}
    }
  };

  useEffect(() => {
    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [isAuthenticated()]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛒</span>
          <span className="brand-text">SmartCart</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</Link>

          {isAuthenticated() && (
            <>
              <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
                🛒 Cart
                {cartCount > 0 && <span className={`cart-badge ${bump ? 'bump' : ''}`}>{cartCount}</span>}
              </Link>
              <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>My Orders</Link>
            </>
          )}

          {isAdmin() && (
            <Link to="/admin" className="nav-link admin-link" onClick={() => setMenuOpen(false)}>
              ⚙ Admin
            </Link>
          )}

          {isAuthenticated() ? (
            <div className="nav-user">
              <span className="nav-greeting">Hi, {user?.firstName}</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn-nav-login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn-nav-register" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
