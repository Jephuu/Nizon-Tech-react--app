import axios from '../axiosConfig';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    items: [{ stockName: '', quantity: '', price: '' }],
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch sales and stocks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, stocksRes] = await Promise.all([
          axios.get(`/api/sales?search=${search}&sortBy=${sortBy}&order=${sortOrder}`),
          axios.get('/api/stocks'),
        ]);
        setSales(salesRes.data); // Show all sales
        setStocks(stocksRes.data);
      } catch (err) {
        toast.error('Failed to fetch data');
      }
    };
    fetchData();
  }, [search, sortBy, sortOrder]);

  // Handle form input changes
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newItems = [...formData.items];
      newItems[index][name] = value;
      setFormData({ ...formData, items: newItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add new item row
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { stockName: '', quantity: '', price: '' }],
    });
  };

  // Remove item row
  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  // Calculate total amount
  const calculateTotalAmount = (items) => {
    return items
      .reduce((total, item) => {
        const quantity = parseInt(item.quantity) || 0;
        const price = parseFloat(item.price) || 0;
        return total + quantity * price;
      }, 0)
      .toFixed(2);
  };

  // Handle form submission (Create/Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleData = {
        ...formData,
        items: formData.items.map((item) => ({
          stockName: item.stockName,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
      };
      if (editingId) {
        const res = await axios.put(`/api/sales/${editingId}`, saleData);
        setSales(sales.map((sale) => (sale._id === editingId ? res.data : sale)));
        setEditingId(null);
        toast.success('Sale updated successfully');
      } else {
        const res = await axios.post('/api/sales', saleData);
        setSales([res.data, ...sales]);
        toast.success('Sale added successfully');
      }
      setFormData({
        date: '',
        items: [{ stockName: '', quantity: '', price: '' }],
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving sale');
    }
  };

  // Handle edit button click
  const handleEdit = (sale) => {
    setEditingId(sale._id);
    setFormData({
      date: sale.date.split('T')[0],
      items: sale.items,
    });
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/sales/${id}`);
      setSales(sales.filter((sale) => sale._id !== id));
      toast.success('Sale and associated stock updated successfully');
    } catch (err) {
      toast.error('Error deleting sale');
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Records</h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by Product Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>
        </div>

        {/* Form for Create/Update */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Items</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <select
                    name="stockName"
                    value={item.stockName}
                    onChange={(e) => handleInputChange(e, index)}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                    required
                  >
                    <option value="" disabled>Select Product</option>
                    {stocks.map((stock) => (
                      <option key={stock._id} value={stock.stockName}>
                        {stock.stockName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(e, index)}
                      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                      min="1"
                      required
                    />
                  </div>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800 p-3"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index)}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            >
              <FaPlus className="inline mr-2" /> Add Item
            </button>
          </div>
          <div className="col-span-1 md:col-span-3 flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            >
              {editingId ? 'Update Sale' : 'Add Sale'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    date: '',
                    items: [{ stockName: '', quantity: '', price: '' }],
                  });
                }}
                className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Sales Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalAmount')}
                >
                  Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sale.items.map((item) => item.stockName).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{calculateTotalAmount(sale.items)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleEdit(sale)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;