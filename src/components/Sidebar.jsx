import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCogs, FaShoppingCart, FaBox, FaFileInvoice, FaBolt, FaLightbulb, FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isTechMenuOpen, setIsTechMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isOpen));
    // Apply padding to main content container instead of body
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.paddingLeft = isOpen ? '256px' : '64px';
    }
    return () => {
      if (mainContent) {
        mainContent.style.paddingLeft = '';
      }
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTechMenu = () => {
    setIsTechMenuOpen(!isTechMenuOpen);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className={`bg-indigo-900 text-gray-100 ${isOpen ? 'w-64' : 'w-16'} min-h-screen p-4 fixed top-0 left-0 shadow-xl flex flex-col transition-all duration-300 z-50`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-indigo-300 hover:text-indigo-100 focus:outline-none"
      >
        {isOpen ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
      </button>

      {/* Logo */}
      {isOpen && (
        <div className="flex justify-center mb-8 mt-8">
          <img src="/Images/Nizone.png" alt="Nizon Tech Logo" className="w-32 h-auto" />
        </div>
      )}

      {/* User Info */}
      {isOpen && (
        <div className="mb-6 text-center">
          {/* <p className="text-sm font-semibold text-white-400">Welcome , {user?.username}</p> */}
          <p className="text-sm font-semibold text-white-400">Welcome Anthonese </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1">
        <ul>
          <li className="mb-3">
            <Link
              to="/dashboard"
              className={`flex items-center p-3 rounded-lg transition duration-200 ${
                isActive('/dashboard') ? 'bg-violet-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isOpen ? '' : 'Dashboard'}
            >
              <FaTachometerAlt className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
              {isOpen && 'Dashboard'}
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/users"
              className={`flex items-center p-3 rounded-lg transition duration-200 ${
                isActive('/users') ? 'bg-violet-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isOpen ? '' : 'Users'}
            >
              <FaUsers className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
              {isOpen && 'Users'}
            </Link>
          </li>
          <li className="mb-3">
            <div
              onClick={isOpen ? toggleTechMenu : undefined}
              className={`flex items-center p-3 rounded-lg transition duration-200 cursor-pointer ${
                isActive('/tech') ? 'bg-violet-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isOpen ? '' : 'Nizon Tech'}
            >
              <FaCogs className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
              {isOpen && 'Nizon Tech'}
            </div>
            {isOpen && isTechMenuOpen && (
              <ul className="ml-6 mt-2">
                <li className="mb-2">
                  <Link
                    to="/tech/purchase"
                    className={`flex items-center p-2 rounded-lg transition duration-200 text-sm ${
                      isActive('/tech/purchase') ? 'bg-indigo-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Purchase
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/tech/stock"
                    className={`flex items-center p-2 rounded-lg transition duration-200 text-sm ${
                      isActive('/tech/stock') ? 'bg-indigo-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <FaBox className="mr-2" />
                    Stock
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/tech/sales"
                    className={`flex items-center p-2 rounded-lg transition duration-200 text-sm ${
                      isActive('/tech/sales') ? 'bg-indigo-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <FaFileInvoice className="mr-2" />
                    Sales
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/tech/bill"
                    className={`flex items-center p-2 rounded-lg transition duration-200 text-sm ${
                      isActive('/tech/bill') ? 'bg-indigo-700 text-white' : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <FaFileInvoice className="mr-2" />
                    Bill
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-3">
            <Link
              to="/power"
              className={`flex items-center p-3 rounded-lg transition duration-200 ${
                isActive('/power') ? 'bg-violet-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isOpen ? '' : 'Nizon Power'}
            >
              <FaBolt className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
              {isOpen && 'Nizon Power'}
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/solutions"
              className={`flex items-center p-3 rounded-lg transition duration-200 ${
                isActive('/solutions') ? 'bg-violet-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
              title={isOpen ? '' : 'Nizon Solutions'}
            >
              <FaLightbulb className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
              {isOpen && 'Nizon Solutions'}
            </Link>
          </li>
        </ul>
      </nav>
      {/* Logout */}
      <button
        onClick={onLogout}
        className={`flex items-center p-3 rounded-lg mt-auto transition duration-200 ${
          isOpen ? 'text-gray-300 hover:bg-gray-800' : 'text-indigo-300 hover:bg-gray-800'
        }`}
        title={isOpen ? '' : 'Logout'}
      >
        <FaSignOutAlt className={`mr-3 ${!isOpen && 'text-indigo-300'}`} />
        {isOpen && 'Logout'}
      </button>
    </div>
  );
};

export default Sidebar; 

