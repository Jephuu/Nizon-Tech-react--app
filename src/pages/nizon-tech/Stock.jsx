// import axios from '../../axiosConfig';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

// const Stock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [formData, setFormData] = useState({
//     orderNo: '',
//     stockName: '',
//     modelNo: '',
//     purchaseOrigin: '',
//     dateOfPurchase: '',
//     quantity: '',
//     salePrice: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('dateOfPurchase');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Fetch stocks
//   useEffect(() => {
//     console.log('Token:', localStorage.getItem('token'));
//     console.log('User:', localStorage.getItem('user'));
//     console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
//     const fetchStocks = async () => {
//       try {
//         const res = await axios.get(`/api/stocks?search=${search}&sortBy=${sortBy}&order=${sortOrder}`);
//         console.log('Stocks API response:', res.data);
//         console.log('Response status:', res.status);
//         setStocks(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error('Error fetching stocks:', {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//         });
//         toast.error(`Failed to fetch stocks: ${err.response?.data?.error || err.message}`);
//         setStocks([]);
//       }
//     };
//     fetchStocks();
//   }, [search, sortBy, sortOrder]);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission (Create/Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const submitData = {
//         ...formData,
//         quantity: parseInt(formData.quantity),
//         salePrice: parseFloat(formData.salePrice),
//       };
//       if (editingId) {
//         const res = await axios.put(`/api/stocks/${editingId}`, submitData);
//         setStocks(stocks.map((stock) => (stock._id === editingId ? res.data : stock)));
//         setEditingId(null);
//         toast.success('Stock updated successfully');
//       } else {
//         const res = await axios.post('/api/stocks', submitData);
//         setStocks([res.data, ...stocks]);
//         toast.success('Stock added successfully');
//       }
//       setFormData({
//         orderNo: '',
//         stockName: '',
//         modelNo: '',
//         purchaseOrigin: '',
//         dateOfPurchase: '',
//         quantity: '',
//         salePrice: '',
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Error saving stock');
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (stock) => {
//     setEditingId(stock._id);
//     setFormData({
//       orderNo: stock.orderNo,
//       stockName: stock.stockName,
//       modelNo: stock.modelNo,
//       purchaseOrigin: stock.purchaseOrigin,
//       dateOfPurchase: stock.purchaseId?.purchaseDate
//         ? new Date(stock.purchaseId.purchaseDate).toISOString().split('T')[0]
//         : stock.dateOfPurchase
//           ? new Date(stock.dateOfPurchase).toISOString().split('T')[0]
//           : '',
//       quantity: stock.quantity,
//       salePrice: stock.salePrice || stock.purchaseId?.salePrice || '',
//     });
//   };

//   // Handle delete button click
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/stocks/${id}`);
//       setStocks(stocks.filter((stock) => stock._id !== id));
//       toast.success('Stock deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting stock');
//     }
//   };

//   // Handle sorting
//   const handleSort = (field) => {
//     setSortBy(field);
//     setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
//       <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Stock Management</h2>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <div className="relative flex-1">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//               <FaSearch className="text-gray-400" />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Order No or Stock Name"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             />
//           </div>
//         </div>

//         {/* Form for Create/Update */}
//         <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Order No</label>
//             <input
//               type="text"
//               name="orderNo"
//               value={formData.orderNo}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Stock Name</label>
//             <input
//               type="text"
//               name="stockName"
//               value={formData.stockName}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Model No</label>
//             <input
//               type="text"
//               name="modelNo"
//               value={formData.modelNo}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Origin</label>
//             <input
//               type="text"
//               name="purchaseOrigin"
//               value={formData.purchaseOrigin}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date of Purchase</label>
//             <input
//               type="date"
//               name="dateOfPurchase"
//               value={formData.dateOfPurchase}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               min="1"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
//             <input
//               type="number"
//               name="salePrice"
//               value={formData.salePrice}
//               onChange={handleInputChange}
//               className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//               min="0"
//               step="0.01"
//               required
//             />
//           </div>
//           <div className="col-span-1 md:col-span-3 flex gap-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             >
//               {editingId ? 'Update Stock' : 'Add Stock'}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingId(null);
//                   setFormData({
//                     orderNo: '',
//                     stockName: '',
//                     modelNo: '',
//                     purchaseOrigin: '',
//                     dateOfPurchase: '',
//                     quantity: '',
//                     salePrice: '',
//                   });
//                 }}
//                 className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Stock Table */}
//         <div className="overflow-x-auto">
//           {stocks.length === 0 ? (
//             <p className="text-gray-500 text-center">No stocks found</p>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('orderNo')}
//                   >
//                     Order No {sortBy === 'orderNo' && (sortOrder === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('stockName')}
//                   >
//                     Stock Name {sortBy === 'stockName' && (sortOrder === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Model No
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Purchase Origin
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('dateOfPurchase')}
//                   >
//                     Date of Purchase {sortBy === 'dateOfPurchase' && (sortOrder === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('quantity')}
//                   >
//                     Quantity {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort('salePrice')}
//                   >
//                     Sale Price {sortBy === 'salePrice' && (sortOrder === 'asc' ? '↑' : '↓')}
//                   </th>
//                   <th
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {stocks.map((stock) => (
//                   <tr key={stock._id} className="hover:bg-gray-50 transition duration-200">
//                     <td className="px-6 py-4 whitespace-nowrap">{stock.orderNo}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stock.stockName}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stock.modelNo}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stock.purchaseOrigin}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {stock.purchaseId?.purchaseDate
//                         ? new Date(stock.purchaseId.purchaseDate).toLocaleDateString()
//                         : stock.dateOfPurchase
//                           ? new Date(stock.dateOfPurchase).toLocaleDateString()
//                           : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">{stock.quantity}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {(stock.salePrice || stock.purchaseId?.salePrice)
//                         ? (stock.salePrice || stock.purchaseId.salePrice).toFixed(2)
//                         : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap flex gap-2">
//                       <button
//                         onClick={() => handleEdit(stock)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(stock._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <FaTrash />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stock;


import axios from '../../axiosConfig';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({
    orderNo: '',
    stockName: '',
    modelNo: '',
    purchaseOrigin: '',
    dateOfPurchase: '',
    quantity: '',
    salePrice: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dateOfPurchase');
  const [sortOrder, setSortOrder] = useState('desc');

  // Custom dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Get unique stock names
  const stockNameOptions = [...new Set(stocks.map(s => s.stockName).filter(Boolean))].sort();

  // Handle stock name input
  const handleStockNameChange = (e) => {
    setFormData({ ...formData, stockName: e.target.value });
  };

  const selectStockName = (name) => {
    setFormData({ ...formData, stockName: name });
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch stocks
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await axios.get(`/api/stocks?search=${search}&sortBy=${sortBy}&order=${sortOrder}`);
        setStocks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching stocks:', err.response?.data || err.message);
        toast.error(`Failed to fetch stocks: ${err.response?.data?.error || err.message}`);
        setStocks([]);
      }
    };
    fetchStocks();
  }, [search, sortBy, sortOrder]);

  // Other handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stockName') return; // handled separately
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        salePrice: parseFloat(formData.salePrice),
      };
      if (editingId) {
        const res = await axios.put(`/api/stocks/${editingId}`, submitData);
        setStocks(stocks.map((stock) => (stock._id === editingId ? res.data : stock)));
        setEditingId(null);
        toast.success('Stock updated successfully');
      } else {
        const res = await axios.post('/api/stocks', submitData);
        setStocks([res.data, ...stocks]);
        toast.success('Stock added successfully');
      }
      setFormData({
        orderNo: '',
        stockName: '',
        modelNo: '',
        purchaseOrigin: '',
        dateOfPurchase: '',
        quantity: '',
        salePrice: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving stock');
    }
  };

  const handleEdit = (stock) => {
    setEditingId(stock._id);
    setFormData({
      orderNo: stock.orderNo,
      stockName: stock.stockName,
      modelNo: stock.modelNo,
      purchaseOrigin: stock.purchaseOrigin,
      dateOfPurchase: stock.purchaseId?.purchaseDate
        ? new Date(stock.purchaseId.purchaseDate).toISOString().split('T')[0]
        : stock.dateOfPurchase
          ? new Date(stock.dateOfPurchase).toISOString().split('T')[0]
          : '',
      quantity: stock.quantity,
      salePrice: stock.salePrice || stock.purchaseId?.salePrice || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
      toast.success('Stock deleted successfully');
    } catch (err) {
      toast.error('Error deleting stock');
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Stock Management</h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by Order No or Stock Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order No</label>
            <input type="text" name="orderNo" value={formData.orderNo} onChange={handleInputChange} required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          {/* Beautiful Stock Name Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Name <span className="text-xs text-gray-500">(Type or select)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.stockName}
                onChange={handleStockNameChange}
                onFocus={() => setShowDropdown(true)}
                placeholder="Type new or click to select"
                required
                className="p-3 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
              />
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Custom Dropdown */}
            {showDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
                {stockNameOptions.length > 0 ? (
                  stockNameOptions.map((name) => (
                    <div
                      key={name}
                      onClick={() => selectStockName(name)}
                      className="px-4 py-3 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all duration-150 border-b border-gray-100 last:border-0 font-medium"
                    >
                      {name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No stock names yet
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rest of form fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model No</label>
            <input type="text" name="modelNo" value={formData.modelNo} onChange={handleInputChange} required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Origin</label>
            <input type="text" name="purchaseOrigin" value={formData.purchaseOrigin} onChange={handleInputChange} required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Purchase</label>
            <input type="date" name="dateOfPurchase" value={formData.dateOfPurchase} onChange={handleInputChange} required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
            <input type="number" name="salePrice" value={formData.salePrice} onChange={handleInputChange} min="0" step="0.01" required className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>

          <div className="col-span-1 md:col-span-3 flex gap-4">
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              {editingId ? 'Update Stock' : 'Add Stock'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ ...formData, orderNo: '', stockName: '', modelNo: '', purchaseOrigin: '', dateOfPurchase: '', quantity: '', salePrice: '' }); }} className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Full Stock Table */}
        <div className="overflow-x-auto">
          {stocks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No stocks found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => handleSort('orderNo')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Order No {sortBy === 'orderNo' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('stockName')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Stock Name {sortBy === 'stockName' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Origin</th>
                  <th onClick={() => handleSort('dateOfPurchase')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Date of Purchase {sortBy === 'dateOfPurchase' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('quantity')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Quantity {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('salePrice')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                    Sale Price {sortBy === 'salePrice' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stocks.map((stock) => (
                  <tr key={stock._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">{stock.orderNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.stockName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.modelNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.purchaseOrigin}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {stock.purchaseId?.purchaseDate
                        ? new Date(stock.purchaseId.purchaseDate).toLocaleDateString()
                        : stock.dateOfPurchase
                          ? new Date(stock.dateOfPurchase).toLocaleDateString()
                          : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{stock.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(stock.salePrice || stock.purchaseId?.salePrice)?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button onClick={() => handleEdit(stock)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                      <button onClick={() => handleDelete(stock._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;