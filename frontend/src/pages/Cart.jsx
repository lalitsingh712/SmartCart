import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../api/axios';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderLoading, setOrderLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const { data } = await cartAPI.updateItem(itemId, { quantity });
      setCart(data);
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const { data } = await cartAPI.removeItem(itemId);
      setCart(data);
    } catch (err) {
      alert('Could not remove item');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear your entire cart?')) return;
    try {
      await cartAPI.clearCart();
      fetchCart();
    } catch (err) {
      alert('Could not clear cart');
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      alert('Please enter a shipping address');
      return;
    }
    setOrderLoading(true);
    try {
      const { data } = await orderAPI.placeOrder({ shippingAddress });
      setCheckoutModal(false);
      alert(`Order #${data.id} placed successfully!`);
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="cart-page">
        <div className="page-header">
          <h1>🛒 Your Cart</h1>
          {cart?.items?.length > 0 && (
            <button className="btn-clear-cart" onClick={handleClearCart}>Clear Cart</button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {!cart?.items?.length ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.productImageUrl || `https://picsum.photos/seed/${item.productId}/100/100`}
                    alt={item.productName}
                    className="cart-item-image"
                    onError={(e) => { e.target.src = `https://picsum.photos/seed/${item.productId}/100/100`; }}
                  />
                  <div className="cart-item-details">
                    <h4>{item.productName}</h4>
                    <p className="cart-item-price">₹{Number(item.unitPrice).toFixed(2)} each</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <span className="cart-item-subtotal">₹{Number(item.subtotal).toFixed(2)}</span>
                  <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Items ({cart.totalItems})</span>
                <span>₹{Number(cart.totalPrice).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{Number(cart.totalPrice).toFixed(2)}</span>
              </div>
              <button className="btn-checkout" onClick={() => setCheckoutModal(true)}>
                Proceed to Checkout
              </button>
              <Link to="/products" className="btn-continue-shopping">← Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {checkoutModal && (
        <div className="modal-overlay" onClick={() => setCheckoutModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Complete Your Order</h2>
            <div className="modal-summary">
              <p><strong>Total:</strong> ₹{Number(cart?.totalPrice).toFixed(2)}</p>
              <p><strong>Items:</strong> {cart?.totalItems}</p>
            </div>
            <div className="form-group">
              <label>Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your full shipping address..."
                rows={4}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setCheckoutModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handlePlaceOrder} disabled={orderLoading}>
                {orderLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
