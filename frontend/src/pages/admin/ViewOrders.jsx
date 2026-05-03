import { useState, useEffect } from 'react';
import { orderAPI } from '../../api/axios';

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusColors = {
  PENDING: '#f59e0b',
  CONFIRMED: '#3b82f6',
  SHIPPED: '#8b5cf6',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444',
};

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await orderAPI.getAllOrders(page, 10);
      setOrders(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { data } = await orderAPI.updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? data : o)));
      setSuccess(`Order #${orderId} status updated to ${newStatus}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update order status');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📋 All Orders</h1>
        <p>Manage and track customer orders</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div
              className="order-header"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="order-meta">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-customer">👤 {order.customerName}</span>
                <span className="order-email">✉ {order.customerEmail}</span>
              </div>
              <div className="order-right">
                <span
                  className="order-status-badge"
                  style={{
                    backgroundColor: statusColors[order.status] + '22',
                    color: statusColors[order.status],
                  }}
                >
                  {order.status}
                </span>
                <span className="order-total">₹{Number(order.totalAmount).toFixed(2)}</span>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
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

                <div className="status-update-bar">
                  <label>Update Status:</label>
                  <div className="status-buttons">
                    {ORDER_STATUSES.map((s) => (
                      <button
                        key={s}
                        className={`status-btn ${order.status === s ? 'active' : ''}`}
                        style={{
                          borderColor: statusColors[s],
                          backgroundColor: order.status === s ? statusColors[s] : 'transparent',
                          color: order.status === s ? '#fff' : statusColors[s],
                        }}
                        onClick={() => handleStatusUpdate(order.id, s)}
                        disabled={order.status === s || updatingId === order.id}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No orders yet</h3>
          </div>
        )}
      </div>

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

export default ViewOrders;
