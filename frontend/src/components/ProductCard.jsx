import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../api/axios';

const ProductCard = ({ product, onAddToCart }) => {
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    try {
      await cartAPI.addItem({ productId: product.id, quantity: 1 });
      if (onAddToCart) onAddToCart();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to cart');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl || `https://picsum.photos/seed/${product.id}/400/300`}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${product.id}/400/300`;
          }}
        />
        <span className="product-category-badge">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description
            ? product.description.substring(0, 80) + (product.description.length > 80 ? '...' : '')
            : 'No description available'}
        </p>
        <div className="product-footer">
          <span className="product-price">₹{Number(product.price).toFixed(2)}</span>
          <span className={`product-stock ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn-view">View Details</Link>
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity > 0 ? '+ Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
