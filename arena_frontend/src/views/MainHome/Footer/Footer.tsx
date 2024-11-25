import CodeIcon from '@mui/icons-material/Code';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="brand">
            <div className="brand-logo">
              <CodeIcon className="icon" />
              <span className="brand-name">Coding Club</span>
            </div>
            <p className="brand-description">
            Join our vibrant community of developers, where we transform coffee into code
            and dreams into digital reality. Let's build the future together, one commit at a time! ✨
            </p>
            <div className="social-icons">
              <a href="#" className="social-link">
              <FacebookIcon className="social-icon"/>
              </a>
              <a href="#" className="social-link">
                <XIcon className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <InstagramIcon className="social-icon" />
              </a>
            </div>
          </div>
          <div className='footer-links' >

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="link-list">
              <li><Link to="/home" className="link-item">Home</Link></li>
              <li><Link to="/home/announcements" className="link-item">Anouncements</Link></li>
              <li><Link to="/home/our-team" className="link-item">About Us</Link></li>
              <li><Link to="/home/contact-us" className="link-item">Contact</Link></li>
            </ul>
          </div>

         
          <div className="footer-section">
            <h3 className="section-title">Contact Info</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <LocationOnIcon className="icon" />
                123 Commerce St, City, Country
              </li>
              <li className="contact-item">
                <PhoneIcon className="icon" />
                +1 234 567 890
              </li>
              <li className="contact-item">
                <MailIcon className="icon" />
                codingclub@gcet.edu.in
              </li>
            </ul>
          </div>
        </div>
          </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Coding Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
