import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../api/axios';

const statusColors = {
  PENDING: '#f59e0b',
  CONFIRMED: '#3b82f6',
  SHIPPED: '#8b5cf6',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444',
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await orderAPI.getMyOrders(page, 10);
        setOrders(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📦 My Orders</h1>
        <p>Track all your orders in one place</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div
                className="order-header"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="order-meta">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="order-right">
                  <span
                    className="order-status-badge"
                    style={{ backgroundColor: statusColors[order.status] + '22', color: statusColors[order.status] }}
                  >
                    {order.status}
                  </span>
                  <span className="order-total">₹{Number(order.totalAmount).toFixed(2)}</span>
                  <button 
                    className="btn-secondary btn-track" 
                    onClick={(e) => { e.stopPropagation(); navigate(`/track/${order.id}`); }}
                  >
                    🗺️ Track
                  </button>
                  <span className="expand-icon">{expandedOrder === order.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <p className="shipping-address">
                    <strong>📍 Ship to:</strong> {order.shippingAddress}
                  </p>
                  <div className="order-items-list">
                    {order.items?.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={item.productImageUrl || `https://picsum.photos/seed/${item.productId}/60/60`}
                          alt={item.productName}
                          className="order-item-image"
                          onError={(e) => { e.target.src = `https://picsum.photos/seed/${item.productId}/60/60`; }}
                        />
                        <span className="order-item-name">{item.productName}</span>
                        <span className="order-item-qty">×{item.quantity}</span>
                        <span className="order-item-subtotal">₹{Number(item.subtotal).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Prev</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1}>Next →</button>
        </div>
      )}
    </div>
  );
};

export default Orders;
