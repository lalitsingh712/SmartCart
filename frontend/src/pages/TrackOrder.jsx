import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { orderAPI } from '../api/axios';

// Fix for default marker icon in React Leaflet with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const statusColors = {
  PENDING: '#f59e0b',
  CONFIRMED: '#3b82f6',
  SHIPPED: '#8b5cf6',
  DELIVERED: '#10b981',
  CANCELLED: '#ef4444',
};

// Mock coordinates for simulated tracking
const WAREHOUSE_COORD = [40.7128, -74.0060]; // New York
const TRANSIT_COORD = [39.9526, -75.1652];   // Philadelphia
const DELIVERY_COORD = [38.9072, -77.0369];  // Washington DC

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await orderAPI.getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order tracking details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;
  if (!order) return <div className="page-container"><h2>Order not found</h2></div>;

  let currentCoord = WAREHOUSE_COORD;
  let statusMessage = "Your order is currently at our warehouse being processed.";
  
  if (order.status === 'SHIPPED') {
    currentCoord = TRANSIT_COORD;
    statusMessage = "Your order is on the way and currently in transit.";
  } else if (order.status === 'DELIVERED') {
    currentCoord = DELIVERY_COORD;
    statusMessage = "Your order has been delivered successfully to the destination.";
  } else if (order.status === 'CANCELLED') {
    statusMessage = "Your order has been cancelled.";
  }

  return (
    <div className="page-container tracking-page">
      <button className="btn-secondary back-btn" onClick={() => navigate('/orders')}>
        &larr; Back to My Orders
      </button>

      <div className="tracking-header">
        <div className="th-left">
          <h1>Track Order #{order.id}</h1>
          <p>Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="th-right">
          <span 
            className="order-status-badge tracking-badge" 
            style={{ backgroundColor: statusColors[order.status] + '22', color: statusColors[order.status] }}
          >
            {order.status}
          </span>
        </div>
      </div>

      <div className="tracking-info-card">
        <h3>Tracking Status</h3>
        <p className="tracking-msg">{statusMessage}</p>
        <p className="shipping-dest"><strong>Destination:</strong> {order.shippingAddress}</p>
      </div>

      <div className="tracking-map-container">
        {order.status !== 'CANCELLED' ? (
          <MapContainer center={currentCoord} zoom={9} style={{ height: '100%', width: '100%', borderRadius: '16px', zIndex: 1 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={currentCoord}>
              <Popup>
                <strong>{order.status}</strong><br />
                Order #{order.id}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="cancelled-map">
            <p>Tracking unavailable for cancelled orders.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
