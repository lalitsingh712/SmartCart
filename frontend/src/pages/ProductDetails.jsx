import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    try {
      setAddingToCart(true);
      await cartAPI.addItem({ productId: product.id, quantity });
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      alert(err.response?.data?.message || 'Could not add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const incrementQty = () => {
    if (quantity < product.stockQuantity) setQuantity(prev => prev + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;
  if (error) return <div className="page-container"><div className="alert alert-error">{error}</div></div>;
  if (!product) return <div className="page-container"><h2>Product not found</h2></div>;

  return (
    <div className="page-container product-details-page">
      <button className="btn-secondary back-btn" onClick={() => navigate('/products')}>
        &larr; Back to Products
      </button>

      <div className="pd-layout">
        <div className="pd-image-section">
          <img 
            src={product.imageUrl || `https://picsum.photos/seed/${product.id}/800/800`} 
            alt={product.name} 
            className="pd-image"
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${product.id}/800/800`;
            }}
          />
        </div>
        
        <div className="pd-info-section">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">₹{Number(product.price).toFixed(2)}</p>
          
          <div className="pd-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available for this product.'}</p>
          </div>
          
          <div className="pd-stock-info">
            <span className={`stock-status ${product.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
            </span>
          </div>

          <div className="pd-actions">
            <div className="pd-quantity">
              <button type="button" onClick={decrementQty} disabled={quantity <= 1 || product.stockQuantity === 0}>-</button>
              <input type="number" value={quantity} readOnly />
              <button type="button" onClick={incrementQty} disabled={quantity >= product.stockQuantity || product.stockQuantity === 0}>+</button>
            </div>
            
            <button 
              className="btn-add-cart large"
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0 || addingToCart}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
