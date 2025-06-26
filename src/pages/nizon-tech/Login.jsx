import axios from '../../axiosConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for inputs

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success('Logged in successfully', { position: 'top-right' });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed', { position: 'top-right' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-indigo-800 p-4">
      <div className="bg-blue-200 shadow-xl rounded-lg p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Images/Nizone.png" alt="Nizon Tech Logo" className="w-38 h-auto" />
        </div>
        <h2 className="text-3xl font-bold text-center text-black-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaUser className="text-gray-400" />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-gray-400" />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 transform hover:scale-100"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          Nizon Tech Admin Dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;

