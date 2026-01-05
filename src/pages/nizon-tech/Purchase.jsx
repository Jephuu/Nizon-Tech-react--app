// import axios from '../../axiosConfig';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

// const Purchase = () => {
//   const [purchases, setPurchases] = useState([]);
//   const [formData, setFormData] = useState({
//     orderId: '',
//     supplier: '',
//     amount: '',
//     status: 'pending',
//     stockName: '',
//     modelNo: '',
//     quantity: '',
//     purchaseDate: '',
//     wholesalePrice: '',
//     salePrice: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Fetch purchases with search and sort
//   useEffect(() => {
//     const fetchPurchases = async () => {
//       try {
//         const res = await axios.get(`/api/purchases?search=${search}&sortBy=${sortBy}&order=${sortOrder}`);
//         setPurchases(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch purchases');
//       }
//     };
//     fetchPurchases();
//   }, [search, sortBy, sortOrder]);

//   // Handle form input changes and auto-calculate amount
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const newFormData = { ...formData, [name]: value };

//     // Auto-calculate amount if quantity or wholesalePrice changes
//     if (name === 'quantity' || name === 'wholesalePrice') {
//       const quantity = parseInt(newFormData.quantity) || 0;
//       const wholesalePrice = parseFloat(newFormData.wholesalePrice) || 0;
//       newFormData.amount = (quantity * wholesalePrice).toFixed(2);
//     }

//     setFormData(newFormData);
//   };

//   // Handle form submission (Create/Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const purchaseData = {
//         ...formData,
//         quantity: parseInt(formData.quantity),
//         wholesalePrice: parseFloat(formData.wholesalePrice),
//         salePrice: parseFloat(formData.salePrice),
//         amount: parseFloat(formData.amount),
//       };
//       if (editingId) {
//         const res = await axios.put(`/api/purchases/${editingId}`, purchaseData);
//         setPurchases(purchases.map((purchase) => (purchase._id === editingId ? res.data : purchase)));
//         setEditingId(null);
//         toast.success('Purchase updated successfully');
//         if (res.data.status === 'completed') {
//           toast.success('Stock updated successfully');
//         }
//       } else {
//         const res = await axios.post('/api/purchases', purchaseData);
//         setPurchases([res.data, ...purchases]);
//         toast.success('Purchase added successfully');
//         if (res.data.status === 'completed') {
//           toast.success('Stock added successfully');
//         }
//       }
//       setFormData({
//         orderId: '',
//         supplier: '',
//         amount: '',
//         status: 'pending',
//         stockName: '',
//         modelNo: '',
//         quantity: '',
//         purchaseDate: '',
//         wholesalePrice: '',
//         salePrice: '',
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Error saving purchase');
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (purchase) => {
//     setEditingId(purchase._id);
//     setFormData({
//       orderId: purchase.orderId,
//       supplier: purchase.supplier,
//       amount: purchase.amount,
//       status: purchase.status,
//       stockName: purchase.stockName,
//       modelNo: purchase.modelNo,
//       quantity: purchase.quantity,
//       purchaseDate: purchase.purchaseDate.split('T')[0],
//       wholesalePrice: purchase.wholesalePrice,
//       salePrice: purchase.salePrice,
//     });
//   };

//   // Handle delete button click
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/purchases/${id}`);
//       setPurchases(purchases.filter((purchase) => purchase._id !== id));
//       toast.success('Purchase and associated stock deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting purchase');
//     }
//   };

//   // Handle sorting
//   const handleSort = (field) => {
//     setSortBy(field);
//     setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
//       <div className="bg-white shadow-xl rounded-lg p-6 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Purchase Orders</h2>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <div className="relative flex-1 max-w-md">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//               <FaSearch className="text-gray-400" />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Order ID or Supplier"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             />
//           </div>
//         </div>

//         {/* Form for Create/Update */}
//         <form onSubmit={handleSubmit} className="mb-8 overflow-x-hidden">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
//               <input
//                 type="text"
//                 name="orderId"
//                 value={formData.orderId}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={formData.supplier}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Stock Name</label>
//               <input
//                 type="text"
//                 name="stockName"
//                 value={formData.stockName}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Model No</label>
//               <input
//                 type="text"
//                 name="modelNo"
//                 value={formData.modelNo}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 min="1"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={formData.purchaseDate}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Wholesale Price</label>
//               <input
//                 type="number"
//                 name="wholesalePrice"
//                 value={formData.wholesalePrice}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
//               <input
//                 type="number"
//                 name="salePrice"
//                 value={formData.salePrice}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 min="0"
//                 step="0.01"
//                 required
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
//               <input
//                 type="number"
//                 name="amount"
//                 value={formData.amount}
//                 className="p-2 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
//                 readOnly
//               />
//             </div>
//             <div className="max-w-xs">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleInputChange}
//                 className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               >
//                 <option value="pending">Pending</option>
//                 <option value="completed">Completed</option>
//                 <option value="cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//             >
//               {editingId ? 'Update Purchase' : 'Add Purchase'}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingId(null);
//                   setFormData({
//                     orderId: '',
//                     supplier: '',
//                     amount: '',
//                     status: 'pending',
//                     stockName: '',
//                     modelNo: '',
//                     quantity: '',
//                     purchaseDate: '',
//                     wholesalePrice: '',
//                     salePrice: '',
//                   });
//                 }}
//                 className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Purchase Table */}
//         <div className="overflow-x-auto hide-scrollbar">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('orderId')}
//                 >
//                   Order ID {sortBy === 'orderId' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[100px] truncate"
//                   onClick={() => handleSort('supplier')}
//                 >
//                   Supplier {sortBy === 'supplier' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-[100px] truncate"
//                 >
//                   Stock Name
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-[80px]"
//                 >
//                   Model No
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[80px]"
//                   onClick={() => handleSort('quantity')}
//                 >
//                   Quantity {sortBy === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[100px]"
//                   onClick={() => handleSort('purchaseDate')}
//                 >
//                   Purchase Date {sortBy === 'purchaseDate' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[100px]"
//                   onClick={() => handleSort('wholesalePrice')}
//                 >
//                   Wholesale Price {sortBy === 'wholesalePrice' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[80px]"
//                   onClick={() => handleSort('salePrice')}
//                 >
//                   Sale Price {sortBy === 'salePrice' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer max-w-[100px]"
//                   onClick={() => handleSort('amount')}
//                 >
//                   Total Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-[80px]"
//                 >
//                   Status
//                 </th>
//                 <th
//                   className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-[80px]"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {purchases.map((purchase) => (
//                 <tr key={purchase._id} className="hover:bg-gray-50 transition duration-200">
//                   <td className="px-4 py-2 whitespace-nowrap text-xs">{purchase.orderId}</td>
//                   <td className="px-4 py-2 text-xs max-w-[100px] truncate">{purchase.supplier}</td>
//                   <td className="px-4 py-2 text-xs max-w-[100px] truncate">{purchase.stockName}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[80px]">{purchase.modelNo}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[80px]">{purchase.quantity}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[100px]">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[100px]">{purchase.wholesalePrice}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[80px]">{purchase.salePrice}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[100px]">{purchase.amount}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[80px]">{purchase.status}</td>
//                   <td className="px-4 py-2 whitespace-nowrap text-xs max-w-[80px] flex gap-2">
//                     <button
//                       onClick={() => handleEdit(purchase)}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(purchase._id)}
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

// export default Purchase;


import axios from '../../axiosConfig';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaChevronDown } from 'react-icons/fa';

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [stocks, setStocks] = useState([]); // To get stock names
  const [formData, setFormData] = useState({
    orderId: '',
    supplier: '',
    amount: '',
    // status: 'pending',
    status: 'completed',
    stockName: '',
    modelNo: '',
    quantity: '',
    purchaseDate: '',
    wholesalePrice: '',
    salePrice: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch purchases AND stocks for dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchaseRes, stockRes] = await Promise.all([
          axios.get(`/api/purchases?search=${search}&sortBy=${sortBy}&order=${sortOrder}`),
          axios.get('/api/stocks')
        ]);
        setPurchases(Array.isArray(purchaseRes.data) ? purchaseRes.data : []);
        setStocks(Array.isArray(stockRes.data) ? stockRes.data : []);
      } catch (err) {
        toast.error('Failed to load data');
        setPurchases([]);
        setStocks([]);
      }
    };
    fetchData();
  }, [search, sortBy, sortOrder]);

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

  // Handle form input changes and auto-calculate amount
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stockName') return; // handled separately

    const newFormData = { ...formData, [name]: value };

    // Auto-calculate amount
    if (name === 'quantity' || name === 'wholesalePrice') {
      const quantity = parseInt(newFormData.quantity) || 0;
      const wholesalePrice = parseFloat(newFormData.wholesalePrice) || 0;
      newFormData.amount = (quantity * wholesalePrice).toFixed(2);
    }

    setFormData(newFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const purchaseData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        wholesalePrice: parseFloat(formData.wholesalePrice),
        salePrice: parseFloat(formData.salePrice),
        amount: parseFloat(formData.amount),
      };
      if (editingId) {
        const res = await axios.put(`/api/purchases/${editingId}`, purchaseData);
        setPurchases(purchases.map(p => p._id === editingId ? res.data : p));
        setEditingId(null);
        toast.success('Purchase updated');
        if (res.data.status === 'completed') toast.success('Stock updated');
      } else {
        const res = await axios.post('/api/purchases', purchaseData);
        setPurchases([res.data, ...purchases]);
        toast.success('Purchase added');
        if (res.data.status === 'completed') toast.success('Stock added');
      }
      setFormData({
        orderId: '', supplier: '', amount: '', status: 'completed',
        stockName: '', modelNo: '', quantity: '', purchaseDate: '',
        wholesalePrice: '', salePrice: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving purchase');
    }
  };

  const handleEdit = (purchase) => {
    setEditingId(purchase._id);
    setFormData({
      orderId: purchase.orderId,
      supplier: purchase.supplier,
      amount: purchase.amount,
      status: purchase.status,
      stockName: purchase.stockName,
      modelNo: purchase.modelNo,
      quantity: purchase.quantity,
      purchaseDate: purchase.purchaseDate.split('T')[0],
      wholesalePrice: purchase.wholesalePrice,
      salePrice: purchase.salePrice,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/purchases/${id}`);
      setPurchases(purchases.filter(p => p._id !== id));
      toast.success('Purchase and stock deleted');
    } catch (err) {
      toast.error('Error deleting purchase');
    }
  };

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Purchase Orders</h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by Order ID or Supplier"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
              <input type="text" name="orderId" value={formData.orderId} onChange={handleInputChange} required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <input type="text" name="supplier" value={formData.supplier} onChange={handleInputChange} required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
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
                  placeholder="Type or click to select"
                  required
                  className="p-2 pr-10 border rounded-lg w-full focus:ring-2 focus:ring-blue-600"
                />
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-64 overflow-y-auto">
                  {stockNameOptions.length > 0 ? (
                    stockNameOptions.map(name => (
                      <div
                        key={name}
                        onClick={() => selectStockName(name)}
                        className="px-4 py-3 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all border-b border-gray-100 last:border-0 font-medium"
                      >
                        {name}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">No stock names</div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model No</label>
              <input type="text" name="modelNo" value={formData.modelNo} onChange={handleInputChange} required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleInputChange} required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wholesale Price</label>
              <input type="number" name="wholesalePrice" value={formData.wholesalePrice} onChange={handleInputChange} min="0" step="0.01" required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price</label>
              <input type="number" name="salePrice" value={formData.salePrice} onChange={handleInputChange} min="0" step="0.01" required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <input type="number" value={formData.amount} readOnly className="p-2 border rounded-lg w-full bg-gray-100 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} required className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-600">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              {editingId ? 'Update Purchase' : 'Add Purchase'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ ...formData, orderId: '', supplier: '', amount: '', status: 'pending', stockName: '', modelNo: '', quantity: '', purchaseDate: '', wholesalePrice: '', salePrice: '' }); }} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Full Purchase Table */}
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th onClick={() => handleSort('orderId')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Order ID {sortBy === 'orderId' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th onClick={() => handleSort('supplier')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Supplier {sortBy === 'supplier' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model No</th>
                <th onClick={() => handleSort('quantity')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Quantity {sortBy === 'quantity' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th onClick={() => handleSort('purchaseDate')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Purchase Date {sortBy === 'purchaseDate' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th onClick={() => handleSort('wholesalePrice')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Wholesale Price {sortBy === 'wholesalePrice' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th onClick={() => handleSort('salePrice')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Sale Price {sortBy === 'salePrice' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th onClick={() => handleSort('amount')} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Total Amount {sortBy === 'amount' && (sortOrder === 'asc' ? 'Up' : 'Down')}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {purchases.map((purchase) => (
                <tr key={purchase._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-xs">{purchase.orderId}</td>
                  <td className="px-4 py-2 text-xs max-w-[100px] truncate">{purchase.supplier}</td>
                  <td className="px-4 py-2 text-xs max-w-[100px] truncate">{purchase.stockName}</td>
                  <td className="px-4 py-2 text-xs">{purchase.modelNo}</td>
                  <td className="px-4 py-2 text-xs">{purchase.quantity}</td>
                  <td className="px-4 py-2 text-xs">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-xs">{purchase.wholesalePrice}</td>
                  <td className="px-4 py-2 text-xs">{purchase.salePrice}</td>
                  <td className="px-4 py-2 text-xs">{purchase.amount}</td>
                  <td className="px-4 py-2 text-xs">{purchase.status}</td>
                  <td className="px-4 py-2 text-xs flex gap-2">
                    <button onClick={() => handleEdit(purchase)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => handleDelete(purchase._id)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
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

export default Purchase;