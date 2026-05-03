import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, orderAPI } from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          productAPI.getAll(0, 1),
          orderAPI.getAllOrders(0, 5),
        ]);

        const orders = ordersRes.data.content || [];
        const pending = orders.filter((o) => o.status === 'PENDING').length;

        setStats({
          totalProducts: productsRes.data.totalElements || 0,
          totalOrders: ordersRes.data.totalElements || 0,
          pendingOrders: pending,
          recentOrders: orders,
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: '#6366f1' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '🛒', color: '#10b981' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳', color: '#f59e0b' },
  ];

  const statusColors = {
    PENDING: '#f59e0b',
    CONFIRMED: '#3b82f6',
    SHIPPED: '#8b5cf6',
    DELIVERED: '#10b981',
    CANCELLED: '#ef4444',
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>⚙ Admin Dashboard</h1>
        <p>Manage your SmartCart store</p>
      </div>

      <div className="stat-cards">
        {statCards.map((card) => (
          <div key={card.label} className="stat-card" style={{ borderTop: `4px solid ${card.color}` }}>
            <div className="stat-icon">{card.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-quick-actions">
        <Link to="/admin/products" className="quick-action-card">
          <span className="qa-icon">📦</span>
          <span>Manage Products</span>
        </Link>
        <Link to="/admin/orders" className="quick-action-card">
          <span className="qa-icon">📋</span>
          <span>View All Orders</span>
        </Link>
      </div>

      <div className="admin-section">
        <h2>Recent Orders</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>₹{Number(order.totalAmount).toFixed(2)}</td>
                  <td>
                    <span
                      className="status-pill"
                      style={{
                        backgroundColor: statusColors[order.status] + '22',
                        color: statusColors[order.status],
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {stats.recentOrders.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
