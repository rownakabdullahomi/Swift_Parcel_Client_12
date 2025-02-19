import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-4 lg:px-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="footer p-10 rounded-t-xl lg:flex items-start justify-between gap-10">
        {/* Services Section */}
        <nav data-aos="fade-up">
          <h6 className="footer-title text-yellow-500">Services</h6>
          <ul>
            <li>
              <Link to="/services/counseling" className="link link-hover">
                Counseling
              </Link>
            </li>
            <li>
              <Link to="/services/job-support" className="link link-hover">
                Job Support
              </Link>
            </li>
            <li>
              <Link to="/services/pricing" className="link link-hover">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/services/skills" className="link link-hover">
                Skills
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company Section */}
        <nav data-aos="fade-up" data-aos-delay="100">
          <h6 className="footer-title text-yellow-500">Company</h6>
          <ul>
            <li>
              <Link to="/about" className="link link-hover">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link link-hover">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="link link-hover">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/press" className="link link-hover">
                Press Kit
              </Link>
            </li>
          </ul>
        </nav>

        {/* Resources Section */}
        <nav data-aos="fade-up" data-aos-delay="200">
          <h6 className="footer-title text-yellow-500">Resources</h6>
          <ul>
            <li>
              <Link to="/programs" className="link link-hover">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="link link-hover">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="link link-hover">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social Media Section */}
        <nav data-aos="fade-up" data-aos-delay="300">
          <h6 className="footer-title text-yellow-500">Follow Us</h6>
          <div className="flex items-center gap-4 mt-4 animate-pulse">
            <a
              href="https://twitter.com/swiftparcel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-yellow-500"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com/swiftparcel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-yellow-500"
            >
              <FaYoutube />
            </a>
            <a
              href="https://facebook.com/swiftparcel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-yellow-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/swiftparcel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-yellow-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/swiftparcel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-yellow-500"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </div>
      <div className="divider divider-neutral m-0"></div>
      {/* Copyright Section */}
      <div className="footer footer-center   text-gray-400 pb-2">
        <aside>
          <div className="font-semibold text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="mt-[1px]">
                Copyright © {new Date().getFullYear()} - All rights reserved by
              </p>
              <Link to="/" className="text-lg font-bold tracking-tight">
                <div className=" text-gray-400">
                  <span className="text-yellow-600">S</span>wift
                  <span className="text-red-600">P</span>arcel
                </div>
              </Link>
            </div>
            <p className=" mt-1">
              Powered by <span className="text-secondary">Rownak</span>
            </p>
          </div>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
