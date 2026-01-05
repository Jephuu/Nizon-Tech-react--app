// import axios from '../../axiosConfig';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

// const Sales = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [formData, setFormData] = useState({
//     date: '',
//     items: [{ stockName: '', quantity: '', price: '' }],
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Fetch sales and stocks
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [salesRes, stocksRes] = await Promise.all([
//           axios.get(`/api/sales?search=${search}&sortBy=${sortBy}&order=${sortOrder}`),
//           axios.get('/api/stocks'),
//         ]);
//         setSales(salesRes.data); // Show all sales
//         setStocks(stocksRes.data);
//       } catch (err) {
//         toast.error('Failed to fetch data');
//       }
//     };
//     fetchData();
//   }, [search, sortBy, sortOrder]);

//   // Handle form input changes
//   const handleInputChange = (e, index = null) => {
//     const { name, value } = e.target;
//     if (index !== null) {
//       const newItems = [...formData.items];
//       newItems[index][name] = value;
//       setFormData({ ...formData, items: newItems });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Add new item row
//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { stockName: '', quantity: '', price: '' }],
//     });
//   };

//   // Remove item row
//   const removeItem = (index) => {
//     setFormData({
//       ...formData,
//       items: formData.items.filter((_, i) => i !== index),
//     });
//   };

//   // Calculate total amount
//   const calculateTotalAmount = (items) => {
//     return items
//       .reduce((total, item) => {
//         const quantity = parseInt(item.quantity) || 0;
//         const price = parseFloat(item.price) || 0;
//         return total + quantity * price;
//       }, 0)
//       .toFixed(2);
//   };

//   // Handle form submission (Create/Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const saleData = {
//         ...formData,
//         items: formData.items.map((item) => ({
//           stockName: item.stockName,
//           quantity: parseInt(item.quantity),
//           price: parseFloat(item.price),
//         })),
//       };
//       if (editingId) {
//         const res = await axios.put(`/api/sales/${editingId}`, saleData);
//         setSales(sales.map((sale) => (sale._id === editingId ? res.data : sale)));
//         setEditingId(null);
//         toast.success('Sale updated successfully');
//       } else {
//         const res = await axios.post('/api/sales', saleData);
//         setSales([res.data, ...sales]);
//         toast.success('Sale added successfully');
//       }
//       setFormData({
//         date: '',
//         items: [{ stockName: '', quantity: '', price: '' }],
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Error saving sale');
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (sale) => {
//     setEditingId(sale._id);
//     setFormData({
//       date: sale.date.split('T')[0],
//       items: sale.items,
//     });
//   };

//   // Handle delete button click
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/sales/${id}`);
//       setSales(sales.filter((sale) => sale._id !== id));
//       toast.success('Sale and associated stock updated successfully');
//     } catch (err) {
//       toast.error('Error deleting sale');
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
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Records</h2>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <div className="relative flex-1">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//               <FaSearch className="text-gray-400" />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Product Name"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             />
//           </div>
//         </div>

//         {/* Form for Create/Update */}
//         <form onSubmit={handleSubmit} className="mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Items</h3>
//             {formData.items.map((item, index) => (
//               <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                   <select
//                     name="stockName"
//                     value={item.stockName}
//                     onChange={(e) => handleInputChange(e, index)}
//                     className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                     required
//                   >
//                     <option value="" disabled>Select Product</option>
//                     {stocks.map((stock) => (
//                       <option key={stock._id} value={stock.stockName}>
//                         {stock.stockName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="flex items-end gap-2">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={item.quantity}
//                       onChange={(e) => handleInputChange(e, index)}
//                       className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                       min="1"
//                       required
//                     />
//                   </div>
//                   {formData.items.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       className="text-red-600 hover:text-red-800 p-3"
//                     >
//                       <FaTimes />
//                     </button>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={item.price}
//                     onChange={(e) => handleInputChange(e, index)}
//                     className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                     min="0"
//                     step="0.01"
//                     required
//                   />
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addItem}
//               className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
//             >
//               <FaPlus className="inline mr-2" /> Add Item
//             </button>
//           </div>
//           <div className="col-span-1 md:col-span-3 flex gap-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             >
//               {editingId ? 'Update Sale' : 'Add Sale'}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingId(null);
//                   setFormData({
//                     date: '',
//                     items: [{ stockName: '', quantity: '', price: '' }],
//                   });
//                 }}
//                 className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Sales Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Items
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('totalAmount')}
//                 >
//                   Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('date')}
//                 >
//                   Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sales.map((sale) => (
//                 <tr key={sale._id} className="hover:bg-gray-50 transition duration-200">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {sale.items.map((item) => item.stockName).join(', ')}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculateTotalAmount(sale.items)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{new Date(sale.date).toLocaleDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap flex gap-2">
//                     <button
//                       onClick={() => handleEdit(sale)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(sale._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sales;

// import axios from '../../axiosConfig';
// import { useEffect, useState, useRef } from 'react';
// import { toast } from 'react-toastify';
// import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaChevronDown } from 'react-icons/fa';

// const Sales = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]);
  
//   // Default to today's date
//   const today = new Date().toISOString().split('T')[0];
//   const [formData, setFormData] = useState({
//     date: today, // Default today
//     items: [{ stockName: '', quantity: '', price: '' }],
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Dropdown state
//   const [showDropdown, setShowDropdown] = useState({});
//   const dropdownRefs = useRef([]);

//   // Fetch sales and stocks
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [salesRes, stocksRes] = await Promise.all([
//           axios.get(`/api/sales?search=${search}&sortBy=${sortBy}&order=${sortOrder}`),
//           axios.get('/api/stocks'),
//         ]);
//         setSales(Array.isArray(salesRes.data) ? salesRes.data : []);
//         setStocks(Array.isArray(stocksRes.data) ? stocksRes.data : []);
//       } catch (err) {
//         toast.error('Failed to fetch data');
//       }
//     };
//     fetchData();
//   }, [search, sortBy, sortOrder]);

//   // Get unique stock names
//   const stockNameOptions = [...new Set(stocks.map(s => s.stockName).filter(Boolean))].sort();

//   // Handle stock name change + auto-fill price
//   const handleStockNameChange = (e, index) => {
//     const value = e.target.value;
//     const newItems = [...formData.items];
//     newItems[index].stockName = value;

//     const selectedStock = stocks.find(s => s.stockName === value);
//     if (selectedStock) {
//       newItems[index].price = selectedStock.salePrice || selectedStock.purchaseId?.salePrice || '';
//     } else {
//       newItems[index].price = '';
//     }

//     setFormData({ ...formData, items: newItems });
//   };

//   const selectStockName = (name, index) => {
//     const newItems = [...formData.items];
//     newItems[index].stockName = name;

//     const selectedStock = stocks.find(s => s.stockName === name);
//     if (selectedStock) {
//       newItems[index].price = selectedStock.salePrice || selectedStock.purchaseId?.salePrice || '';
//     }

//     setFormData({ ...formData, items: newItems });
//     setShowDropdown({ ...showDropdown, [index]: false });
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       dropdownRefs.current.forEach((ref, index) => {
//         if (ref && !ref.contains(e.target)) {
//           setShowDropdown(prev => ({ ...prev, [index]: false }));
//         }
//       });
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Handle other input changes
//   const handleInputChange = (e, index = null) => {
//     const { name, value } = e.target;
//     if (index !== null) {
//       const newItems = [...formData.items];
//       newItems[index][name] = value;
//       setFormData({ ...formData, items: newItems });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // Add new item row
//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { stockName: '', quantity: '', price: '' }],
//     });
//   };

//   // Remove item row
//   const removeItem = (index) => {
//     setFormData({
//       ...formData,
//       items: formData.items.filter((_, i) => i !== index),
//     });
//   };

//   // Calculate total amount
//   const calculateTotalAmount = (items) => {
//     return items
//       .reduce((total, item) => {
//         const quantity = parseInt(item.quantity) || 0;
//         const price = parseFloat(item.price) || 0;
//         return total + quantity * price;
//       }, 0)
//       .toFixed(2);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const saleData = {
//         ...formData,
//         items: formData.items.map((item) => ({
//           stockName: item.stockName,
//           quantity: parseInt(item.quantity),
//           price: parseFloat(item.price),
//         })),
//       };
//       if (editingId) {
//         const res = await axios.put(`/api/sales/${editingId}`, saleData);
//         setSales(sales.map((sale) => (sale._id === editingId ? res.data : sale)));
//         setEditingId(null);
//         toast.success('Sale updated successfully');
//       } else {
//         const res = await axios.post('/api/sales', saleData);
//         setSales([res.data, ...sales]);
//         toast.success('Sale added successfully');
//       }
//       setFormData({
//         date: today, // Reset to today
//         items: [{ stockName: '', quantity: '', price: '' }],
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Error saving sale');
//     }
//   };

//   const handleEdit = (sale) => {
//     setEditingId(sale._id);
//     setFormData({
//       date: sale.date.split('T')[0],
//       items: sale.items.map(item => ({
//         stockName: item.stockName,
//         quantity: item.quantity.toString(),
//         price: item.price.toString(),
//       })),
//     });
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/sales/${id}`);
//       setSales(sales.filter((sale) => sale._id !== id));
//       toast.success('Sale deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting sale');
//     }
//   };

//   const handleSort = (field) => {
//     setSortBy(field);
//     setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
//       <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Records</h2>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <div className="relative flex-1">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//               <FaSearch className="text-gray-400" />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Product Name"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 required
//                 className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>
//           </div>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Items</h3>
//             {formData.items.map((item, index) => (
//               <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
//                 {/* Beautiful Stock Name Dropdown */}
//                 <div className="relative" ref={el => dropdownRefs.current[index] = el}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={item.stockName}
//                       onChange={(e) => handleStockNameChange(e, index)}
//                       onFocus={() => setShowDropdown({ ...showDropdown, [index]: true })}
//                       placeholder="Type or select"
//                       required
//                       className="p-3 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//                     />
//                     <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                   </div>

//                   {/* Dropdown */}
//                   {showDropdown[index] && (
//                     <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
//                       {stockNameOptions.length > 0 ? (
//                         stockNameOptions.map(name => (
//                           <div
//                             key={name}
//                             onClick={() => selectStockName(name, index)}
//                             className="px-4 py-3 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all border-b border-gray-100 last:border-0 font-medium"
//                           >
//                             {name}
//                           </div>
//                         ))
//                       ) : (
//                         <div className="px-4 py-8 text-center text-gray-500">No products found</div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={item.quantity}
//                     onChange={(e) => handleInputChange(e, index)}
//                     min="1"
//                     required
//                     className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={item.price}
//                     onChange={(e) => handleInputChange(e, index)}
//                     min="0"
//                     step="0.01"
//                     required
//                     placeholder="Auto-filled"
//                     className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
//                   />
//                 </div>

//                 <div className="flex gap-2">
//                   {formData.items.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeItem(index)}
//                       className="text-red-600 hover:text-red-800 p-3"
//                     >
//                       <FaTimes />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addItem}
//               className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
//             >
//               <FaPlus /> Add Item
//             </button>
//           </div>

//           <div className="flex gap-4">
//             <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
//               {editingId ? 'Update Sale' : 'Add Sale'}
//             </button>
//             {editingId && (
//               <button type="button" onClick={() => { setEditingId(null); setFormData({ date: today, items: [{ stockName: '', quantity: '', price: '' }] }); }} className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition">
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Sales Table - Now with Quantity */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                 <th onClick={() => handleSort('totalAmount')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
//                   Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? 'Up' : 'Down')}
//                 </th>
//                 <th onClick={() => handleSort('date')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
//                   Date {sortBy === 'date' && (sortOrder === 'asc' ? 'Up' : 'Down')}
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sales.map((sale) => {
//                 const totalQty = sale.items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
//                 return (
//                   <tr key={sale._id} className="hover:bg-gray-50 transition">
//                     <td className="px-6 py-4">{sale.items.map(i => i.stockName).join(', ')}</td>
//                     <td className="px-6 py-4 text-center font-medium">{totalQty}</td>
//                     <td className="px-6 py-4">₹{calculateTotalAmount(sale.items)}</td>
//                     <td className="px-6 py-4">{new Date(sale.date).toLocaleDateString()}</td>
//                     <td className="px-6 py-4 flex gap-2">
//                       <button onClick={() => handleEdit(sale)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
//                       <button onClick={() => handleDelete(sale._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sales;


import axios from '../../axiosConfig';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaChevronDown } from 'react-icons/fa';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [stocks, setStocks] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    date: today,
    items: [{ stockName: '', quantity: '', price: '' }],
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const [showDropdown, setShowDropdown] = useState({});
  const dropdownRefs = useRef([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, stocksRes] = await Promise.all([
          axios.get(`/api/sales?search=${search}&sortBy=${sortBy}&order=${sortOrder}`),
          axios.get('/api/stocks'),
        ]);
        setSales(Array.isArray(salesRes.data) ? salesRes.data : []);
        setStocks(Array.isArray(stocksRes.data) ? stocksRes.data : []);
      } catch (err) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, [search, sortBy, sortOrder]);

  const getStockInfo = (name) => {
    const stock = stocks.find(s => s.stockName === name);
    return {
      available: stock ? stock.quantity : 0,
      price: stock?.salePrice || stock?.purchaseId?.salePrice || 0,
    };
  };

  const stockNameOptions = [...new Set(stocks.map(s => s.stockName).filter(Boolean))].sort();

  const handleStockNameChange = (e, index) => {
    const value = e.target.value;
    const newItems = [...formData.items];
    newItems[index].stockName = value;
    const info = getStockInfo(value);
    newItems[index].price = info.price > 0 ? info.price.toString() : '';
    setFormData({ ...formData, items: newItems });
  };

  const selectStockName = (name, index) => {
    const newItems = [...formData.items];
    newItems[index].stockName = name;
    const info = getStockInfo(name);
    newItems[index].price = info.price > 0 ? info.price.toString() : '';
    setFormData({ ...formData, items: newItems });
    setShowDropdown({ ...showDropdown, [index]: false });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      dropdownRefs.current.forEach((ref, i) => {
        if (ref && !ref.contains(e.target)) {
          setShowDropdown(prev => ({ ...prev, [i]: false }));
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { stockName: '', quantity: '', price: '' }],
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const validateStock = () => {
    for (const item of formData.items) {
      if (!item.stockName || !item.quantity) continue;
      const info = getStockInfo(item.stockName);
      const qty = parseInt(item.quantity);
      if (qty > info.available) {
        toast.error(`Only ${info.available} "${item.stockName}" in stock`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStock()) return;

    try {
      const saleData = {
        ...formData,
        items: formData.items
          .filter(i => i.stockName && i.quantity)
          .map(i => ({
            stockName: i.stockName,
            quantity: parseInt(i.quantity),
            price: parseFloat(i.price),
          })),
      };

      if (editingId) {
        await axios.put(`/api/sales/${editingId}`, saleData);
        toast.success('Sale updated');
      } else {
        const res = await axios.post('/api/sales', saleData);
        setSales([res.data, ...sales]);
        toast.success('Sale added! Stock reduced');

        const updated = stocks.map(s => {
          const sold = saleData.items.find(i => i.stockName === s.stockName);
          return sold ? { ...s, quantity: s.quantity - sold.quantity } : s;
        });
        setStocks(updated);
      }

      setFormData({ date: today, items: [{ stockName: '', quantity: '', price: '' }] });
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Sale failed');
    }
  };

  const handleEdit = (sale) => {
    setEditingId(sale._id);
    setFormData({
      date: sale.date.split('T')[0],
      items: sale.items.map(i => ({
        stockName: i.stockName,
        quantity: i.quantity.toString(),
        price: i.price.toString(),
      })),
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this sale?')) return;
    try {
      await axios.delete(`/api/sales/${id}`);
      setSales(sales.filter(s => s._id !== id));
      toast.success('Sale deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const calculateTotal = (items) => {
    return items.reduce((t, i) => t + (parseInt(i.quantity) || 0) * (parseFloat(i.price) || 0), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sales Records</h2>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Items</h3>
            {formData.items.map((item, index) => {
              const info = getStockInfo(item.stockName);
              return (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="relative" ref={el => dropdownRefs.current[index] = el}>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={item.stockName}
                        onChange={e => handleStockNameChange(e, index)}
                        onFocus={() => setShowDropdown({ ...showDropdown, [index]: true })}
                        placeholder="Select product"
                        required
                        className="p-3 pr-10 border rounded-lg w-full focus:ring-2 focus:ring-blue-600"
                      />
                      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {showDropdown[index] && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-2xl max-h-64 overflow-y-auto">
                        {stockNameOptions.map(name => {
                          const stockInfo = getStockInfo(name);
                          return (
                            <div
                              key={name}
                              onClick={() => selectStockName(name, index)}
                              className="px-4 py-3 hover:bg-blue-50 hover:text-blue-700 cursor-pointer border-b last:border-0"
                            >
                              <div className="flex justify-between">
                                <span>{name}</span>
                                <span className={`text-xs ${stockInfo.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  Stock: {stockInfo.available}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Quantity {info.available > 0 && <span className="text-green-600">({info.available} left)</span>}
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={e => handleInputChange(e, index)}
                      min="1"
                      max={info.available || undefined}
                      required
                      className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={item.price}
                      onChange={e => handleInputChange(e, index)}
                      min="0"
                      step="0.01"
                      required
                      placeholder="Auto-filled"
                      className="p-3 border rounded-lg w-full bg-gray-50"
                    />
                  </div>

                  {formData.items.length > 1 && (
                    <button type="button" onClick={() => removeItem(index)} className="text-red-600 p-3">
                      <FaTimes />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Fixed button */}
            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaPlus /> Add Item
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              {editingId ? 'Update Sale' : 'Record Sale'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ date: today, items: [{ stockName: '', quantity: '', price: '' }] }); }} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty Sold</th>
                <th onClick={() => handleSort('totalAmount')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? 'Up' : 'Down')}
                </th>
                <th onClick={() => handleSort('date')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  Date {sortBy === 'date' && (sortOrder === 'asc' ? 'Up' : 'Down')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-gray-500">No sales yet</td></tr>
              ) : (
                sales.map(sale => {
                  const qtySold = sale.items.reduce((s, i) => s + (parseInt(i.quantity) || 0), 0);
                  return (
                    <tr key={sale._id}>
                      <td className="px-6 py-4">{sale.items.map(i => i.stockName).join(', ')}</td>
                      <td className="px-6 py-4 text-center">{qtySold}</td>
                      <td className="px-6 py-4">₹{calculateTotal(sale.items)}</td>
                      <td className="px-6 py-4">{new Date(sale.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button onClick={() => handleEdit(sale)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                        <button onClick={() => handleDelete(sale._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;                                  