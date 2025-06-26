// const Navbar = ({ user, onLogout }) => {
//   return (
//     <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-semibold">Nizon Tech Admin</h1>
//       {user && (
//         <div className="flex items-center gap-4">
//           <span>Welcome, {user.username}</span>
//           <button
//             onClick={onLogout}
//             className="bg-gray-800 p-2 rounded hover:bg-gray-700"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebarOpen');
      setIsSidebarOpen(saved !== null ? JSON.parse(saved) : true);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div
      className={`bg-indigo-900 text-gray-100 fixed top-0 left-0 w-full p-4 flex items-center justify-between shadow-md z-40 transition-all duration-300 ${
        isSidebarOpen ? 'pl-64' : 'pl-16'
      }`}
    >
      {/* Logo (shown when sidebar is collapsed) */}
      {!isSidebarOpen && (
        <div className="flex items-center">
          <img src="/Images/Nizone.png" alt="Nizon Tech Logo" className="w-24 h-auto" />
        </div>
      )}

      {/* Title */}
      <h1 className="text-xl font-semibold hidden md:block">Nizon Tech Admin</h1>

      {/* User Info and Logout */}
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-400">
            Welcome, {user.username || 'Guest'}
          </span>
          <button
            onClick={onLogout}
            className="bg-violet-700 text-white p-2 rounded-lg hover:bg-violet-800 transition duration-200 flex items-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;