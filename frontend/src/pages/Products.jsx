import { useState, useEffect, useCallback } from 'react';
import { productAPI } from '../api/axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [cartRefresh, setCartRefresh] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (search.trim()) {
        response = await productAPI.search(search.trim(), page, 12);
      } else if (selectedCategory) {
        response = await productAPI.getByCategory(selectedCategory, page, 12);
      } else {
        response = await productAPI.getAll(page, 12, sortBy, sortDir);
      }
      setProducts(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedCategory, sortBy, sortDir]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    productAPI.getCategories().then((res) => setCategories(res.data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    setSelectedCategory('');
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat === selectedCategory ? '' : cat);
    setSearch('');
    setPage(0);
  };

  return (
    <div className="page-container">
      <div className="products-hero">
        <h1>Discover Our Products</h1>
        <p>Find everything you need, all in one place</p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search-input"
          />
          <button type="submit" className="search-btn">🔍 Search</button>
        </form>
      </div>

      <div className="products-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h3>Categories</h3>
          <button
            className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => handleCategoryClick('')}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}

          <h3 style={{ marginTop: '1.5rem' }}>Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(0); }}
            className="sort-select"
          >
            <option value="id">Default</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <select
            value={sortDir}
            onChange={(e) => { setSortDir(e.target.value); setPage(0); }}
            className="sort-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </aside>

        {/* Product Grid */}
        <main className="products-main">
          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <div className="products-loading">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="product-skeleton"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No products found</h3>
              <p>Try a different search term or category</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => setCartRefresh(c => c + 1)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
              >
                ← Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${page === i ? 'active' : ''}`}
                  onClick={() => setPage(i)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages - 1}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
