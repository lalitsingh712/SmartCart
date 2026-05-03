import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>🛒 SmartCart</h3>
          <p>Your premium online shopping destination for the latest technology, gadgets, and home accessories.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/products">Shop All</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: mishrashitu@gmail.com</p>
          <p>Phone: +91 6206729881</p>
          <p>Address: 123 bhojubeer varanasi</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SmartCart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
