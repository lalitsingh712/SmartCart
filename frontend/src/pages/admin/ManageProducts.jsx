import { useState, useEffect } from 'react';
import { productAPI } from '../../api/axios';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  stockQuantity: '',
  imageUrl: '',
  category: '',
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll(page, 10);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl || '',
      category: product.category,
    });
    setShowModal(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!form.name || !form.price || !form.stockQuantity || !form.category) {
      setError('Please fill all required fields');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity),
      };
      if (editingProduct) {
        await productAPI.update(editingProduct.id, payload);
        setSuccess('Product updated successfully!');
      } else {
        await productAPI.create(payload);
        setSuccess('Product created successfully!');
      }
      setShowModal(false);
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await productAPI.delete(id);
      setSuccess('Product deleted');
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📦 Manage Products</h1>
        <button className="btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="page-loading"><div className="spinner"></div></div>
      ) : (
        <>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.imageUrl || `https://picsum.photos/seed/${p.id}/50/50`}
                        alt={p.name}
                        className="table-product-img"
                        onError={(e) => { e.target.src = `https://picsum.photos/seed/${p.id}/50/50`; }}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td><span className="category-tag">{p.category}</span></td>
                    <td>₹{Number(p.price).toFixed(2)}</td>
                    <td>
                      <span className={p.stockQuantity > 0 ? 'stock-ok' : 'stock-low'}>
                        {p.stockQuantity}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button className="btn-edit" onClick={() => openEdit(p)}>✏ Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(p.id, p.name)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={6} style={{ textAlign: 'center' }}>No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>← Prev</button>
              <span>Page {page + 1} of {totalPages}</span>
              <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1}>Next →</button>
            </div>
          )}
        </>
      )}

      {/* Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? '✏ Edit Product' : '+ Add Product'}</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Product Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. iPhone 15" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Product description..." />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (₹) *</label>
                <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Stock Quantity *</label>
                <input name="stockQuantity" type="number" value={form.stockQuantity} onChange={handleChange} placeholder="0" />
              </div>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
