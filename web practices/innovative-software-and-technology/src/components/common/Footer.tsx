import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Assuming react-icons is installed

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-grey text-light-grey p-8 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-electric-blue mb-4">Software Xenus</h3>
          <p className="text-sm">
            Building innovative software solutions for businesses worldwide.
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm">
            Ikeja, Lagos<br />
            Email: info@softwarexenus.com<br />
            Phone: 08139214035
          </p>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-light-grey hover:text-accent-blue transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-light-grey hover:text-accent-blue transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-light-grey hover:text-accent-blue transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-light-grey hover:text-accent-blue transition duration-300">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Software Xenus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;