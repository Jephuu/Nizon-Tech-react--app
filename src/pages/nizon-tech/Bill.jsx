// import axios from '../../axiosConfig';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaFilePdf } from 'react-icons/fa';

// const Bill = () => {
//   const [bills, setBills] = useState([]);
//   const [formData, setFormData] = useState({
//     billId: '',
//     customer: '',
//     dueDate: '',
//     items: [{ no: '', particulars: '', qty: '', rate: '', amount: '' }],
//     totalAmount: '',
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [search, setSearch] = useState('');
//   const [sortBy, setSortBy] = useState('dueDate');
//   const [sortOrder, setSortOrder] = useState('desc');

//   // Fetch bills
//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const res = await axios.get(`/api/bills?search=${search}&sortBy=${sortBy}&order=${sortOrder}`);
//         setBills(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch bills');
//       }
//     };
//     fetchBills();
//   }, [search, sortBy, sortOrder]);

//   // Handle form input changes
//   const handleInputChange = (e, index = null) => {
//     const { name, value } = e.target;
//     if (index !== null) {
//       const newItems = [...formData.items];
//       newItems[index][name] = value;
//       if (name === 'qty' || name === 'rate') {
//         const qty = parseFloat(newItems[index].qty) || 0;
//         const rate = parseFloat(newItems[index].rate) || 0;
//         newItems[index].amount = (qty * rate).toFixed(2);
//       }
//       setFormData({ ...formData, items: newItems });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//     calculateTotal();
//   };

//   // Calculate total amount
//   const calculateTotal = () => {
//     const total = formData.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
//     setFormData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
//   };

//   // Add new item
//   const addItem = () => {
//     setFormData({
//       ...formData,
//       items: [...formData.items, { no: formData.items.length + 1, particulars: '', qty: '', rate: '', amount: '' }],
//     });
//   };

//   // Remove item
//   const removeItem = (index) => {
//     const newItems = formData.items.filter((_, i) => i !== index);
//     setFormData({ ...formData, items: newItems.map((item, i) => ({ ...item, no: i + 1 })) });
//     calculateTotal();
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const billData = {
//         ...formData,
//         items: formData.items.map((item, index) => ({
//           ...item,
//           no: index + 1,
//           qty: parseInt(item.qty),
//           rate: parseFloat(item.rate),
//           amount: parseFloat(item.amount),
//         })),
//         totalAmount: parseFloat(formData.totalAmount),
//       };
//       if (editingId) {
//         const res = await axios.put(`/api/bills/${editingId}`, billData);
//         setBills(bills.map((bill) => (bill._id === editingId ? res.data : bill)));
//         setEditingId(null);
//         toast.success('Bill updated successfully');
//       } else {
//         const res = await axios.post('/api/bills', billData);
//         setBills([res.data, ...bills]);
//         toast.success('Bill created successfully');
//       }
//       resetForm();
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Error saving bill');
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       billId: '',
//       customer: '',
//       dueDate: '',
//       items: [{ no: 1, particulars: '', qty: '', rate: '', amount: '' }],
//       totalAmount: '',
//     });
//     setEditingId(null);
//   };

//   // Handle edit
//   const handleEdit = (bill) => {
//     setEditingId(bill._id);
//     setFormData({
//       billId: bill.billId,
//       customer: bill.customer,
//       dueDate: bill.dueDate.split('T')[0],
//       items: bill.items.map((item, index) => ({
//         no: index + 1,
//         particulars: item.particulars,
//         qty: item.qty,
//         rate: item.rate,
//         amount: item.amount.toFixed(2),
//       })),
//       totalAmount: bill.totalAmount.toFixed(2),
//     });
//   };

//   // Handle delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/bills/${id}`);
//       setBills(bills.filter((bill) => bill._id !== id));
//       toast.success('Bill deleted successfully');
//     } catch (err) {
//       toast.error('Error deleting bill');
//     }
//   };

//   // Handle sorting
//   const handleSort = (field) => {
//     setSortBy(field);
//     setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   // Generate PDF
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     const logo = '/Images/Nizone.png';
//     doc.addImage(logo, 'PNG', 10, 10, 50, 50);
//     doc.setFontSize(12);
//     doc.text('9846200284\n8078200284\nNear Canara Bank, KORATTY', 160, 20, { align: 'right' });
//     doc.setFontSize(20);
//     doc.text('Bill', 105, 30, { align: 'center' });

//     // Table
//     const tableData = formData.items.map((item) => {
//       const amount = parseFloat(item.amount) || 0;
//       const rs = Math.floor(amount);
//       const ps = Math.round((amount - rs) * 100);
//       return [item.no, item.particulars, item.qty, item.rate, `${rs}`, `${ps}`];
//     });
//     doc.autoTable({
//       startY: 50,
//       head: [['No', 'Particulars', 'Qty', 'Rate', 'Amount Rs', 'Ps']],
//       body: tableData,
//       foot: [['', '', '', 'Total', `${Math.floor(formData.totalAmount)}`, `${Math.round((formData.totalAmount - Math.floor(formData.totalAmount)) * 100)}`]],
//       styles: { halign: 'center' },
//       columnStyles: { 4: { halign: 'right' }, 5: { halign: 'right' } },
//     });

//     // Footer
//     doc.setFontSize(10);
//     doc.text('BANK DETAILS\nNAME: ANTHONESE KD\nCANARA BANK KORATTY\nA/C NO: 3480101003736\nIFSC: CNRB0003480', 10, doc.lastAutoTable.finalY + 20);
//     doc.text('Signature: ____________________', 160, doc.lastAutoTable.finalY + 20, { align: 'right' });

//     doc.save(`Bill_${formData.billId || 'draft'}.pdf`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
//       <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Bills</h2>

//         {/* Search Bar */}
//         <div className="mb-6 flex items-center gap-4">
//           <div className="relative flex-1">
//             <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//               <FaSearch className="text-gray-400" />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Bill ID or Customer"
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
//               <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
//               <input
//                 type="text"
//                 name="billId"
//                 value={formData.billId}
//                 onChange={handleInputChange}
//                 className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
//               <input
//                 type="text"
//                 name="customer"
//                 value={formData.customer}
//                 onChange={handleInputChange}
//                 className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleInputChange}
//                 className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                 required
//               />
//             </div>
//           </div>

//           {/* Items Table */}
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
//           <div className="overflow-x-auto mb-4">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {formData.items.map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition duration-200">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="number"
//                         name="no"
//                         value={index + 1}
//                         disabled
//                         className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="text"
//                         name="particulars"
//                         value={item.particulars}
//                         onChange={(e) => handleInputChange(e, index)}
//                         className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                         required
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="number"
//                         name="qty"
//                         value={item.qty}
//                         onChange={(e) => handleInputChange(e, index)}
//                         className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                         min="1"
//                         required
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="number"
//                         name="rate"
//                         value={item.rate}
//                         onChange={(e) => handleInputChange(e, index)}
//                         className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
//                         min="0"
//                         step="0.01"
//                         required
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="number"
//                         name="amount"
//                         value={item.amount}
//                         disabled
//                         className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {formData.items.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeItem(index)}
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <FaTimes />
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             type="button"
//             onClick={addItem}
//             className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 mb-6 flex items-center gap-2"
//           >
//             <FaPlus /> Add Item
//           </button>

//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
//               <input
//                 type="number"
//                 name="totalAmount"
//                 value={formData.totalAmount}
//                 disabled
//                 className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
//               />
//             </div>
//             <div className="flex gap-4">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 flex items-center gap-2"
//               >
//                 {editingId ? 'Update Bill' : 'Save Bill'}
//               </button>
//               <button
//                 type="button"
//                 onClick={generatePDF}
//                 className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 flex items-center gap-2"
//               >
//                 <FaFilePdf /> Download PDF
//               </button>
//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200 flex items-center gap-2"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>

//         {/* Bill Preview */}
//         <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-md">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Bill Preview</h3>
//           <div className="flex justify-between items-start mb-4">
//             <img src="/Images/logo.png" alt="Logo" className="w-32" />
//             <div className="text-right text-sm text-gray-600">
//               <p>9846200284</p>
//               <p>8078200284</p>
//               <p>Near Canara Bank, KORATTY</p>
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold text-center text-gray-800 my-4">Bill</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//             <p><strong>Bill ID:</strong> {formData.billId}</p>
//             <p><strong>Customer:</strong> {formData.customer}</p>
//             <p><strong>Date:</strong> {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : ''}</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Rs</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ps</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {formData.items.map((item, index) => {
//                   const amount = parseFloat(item.amount) || 0;
//                   const rs = Math.floor(amount);
//                   const ps = Math.round((amount - rs) * 100);
//                   return (
//                     <tr key={index} className="hover:bg-gray-50 transition duration-200">
//                       <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{item.particulars}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{item.rate}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{rs}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{ps}</td>
//                     </tr>
//                   );
//                 })}
//                 <tr>
//                   <td colSpan="4" className="px-6 py-4 text-right font-bold text-gray-800">Total</td>
//                   <td className="px-6 py-4 font-bold text-gray-800">{Math.floor(formData.totalAmount)}</td>
//                   <td className="px-6 py-4 font-bold text-gray-800">{Math.round((formData.totalAmount - Math.floor(formData.totalAmount)) * 100)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between mt-6 text-sm text-gray-600">
//             <div>
//               <p><strong>BANK DETAILS</strong></p>
//               <p>NAME: ANTHONESE KD</p>
//               <p>CANARA BANK KORATTY</p>
//               <p>A/C NO: 3480101003736</p>
//               <p>IFSC: CNRB0003480</p>
//             </div>
//             <div className="text-right">
//               <p>Signature: ____________________</p>
//             </div>
//           </div>
//         </div>

//         {/* Bills Table */}
//         <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Saved Bills</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('billId')}
//                 >
//                   Bill ID {sortBy === 'billId' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('customer')}
//                 >
//                   Customer {sortBy === 'customer' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('totalAmount')}
//                 >
//                   Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('dueDate')}
//                 >
//                   Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {bills.map((bill) => (
//                 <tr key={bill._id} className="hover:bg-gray-50 transition duration-200">
//                   <td className="px-6 py-4 whitespace-nowrap">{bill.billId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{bill.customer}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">${bill.totalAmount.toFixed(2)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{new Date(bill.dueDate).toLocaleDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
//                     <button
//                       onClick={() => handleEdit(bill)}
//                       className="text-blue-500 hover:text-blue-600"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(bill._id)}
//                       className="text-red-600 hover:text-red-400"
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

// export default Bill;

import axios from '../../axiosConfig';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaPrint, FaWhatsapp, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    billId: '',
    customer: '',
    dueDate: '',
    items: [{ no: '', particulars: '', qty: '', rate: '', amount: '' }],
    totalAmount: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Fetch bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await axios.get(`/api/bills?search=${search}&sortBy=${sortBy}&order=${sortOrder}`);
        setBills(res.data);
      } catch (err) {
        toast.error('Failed to fetch bills');
      }
    };
    fetchBills();
  }, [search, sortBy, sortOrder]);

  // Handle form input changes
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const newItems = [...formData.items];
      newItems[index][name] = value;
      if (name === 'qty' || name === 'rate') {
        const qty = parseFloat(newItems[index].qty) || 0;
        const rate = parseFloat(newItems[index].rate) || 0;
        newItems[index].amount = (qty * rate).toFixed(2);
      }
      setFormData({ ...formData, items: newItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    calculateTotal();
  };

  // Calculate total amount
  const calculateTotal = () => {
    const total = formData.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    setFormData((prev) => ({ ...prev, totalAmount: total.toFixed(2) }));
  };

  // Add new item
  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { no: formData.items.length + 1, particulars: '', qty: '', rate: '', amount: '' }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems.map((item, i) => ({ ...item, no: i + 1 })) });
    calculateTotal();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const billData = {
        ...formData,
        items: formData.items.map((item, index) => ({
          ...item,
          no: index + 1,
          qty: parseInt(item.qty),
          rate: parseFloat(item.rate),
          amount: parseFloat(item.amount),
        })),
        totalAmount: parseFloat(formData.totalAmount),
      };
      if (editingId) {
        const res = await axios.put(`/api/bills/${editingId}`, billData);
        setBills(bills.map((bill) => (bill._id === editingId ? res.data : bill)));
        setEditingId(null);
        toast.success('Bill updated successfully');
      } else {
        const res = await axios.post('/api/bills', billData);
        setBills([res.data, ...bills]);
        toast.success('Bill created successfully');
      }
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error saving bill');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      billId: '',
      customer: '',
      dueDate: '',
      items: [{ no: 1, particulars: '', qty: '', rate: '', amount: '' }],
      totalAmount: '',
    });
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (bill) => {
    setEditingId(bill._id);
    setFormData({
      billId: bill.billId,
      customer: bill.customer,
      dueDate: bill.dueDate.split('T')[0],
      items: bill.items.map((item, index) => ({
        no: index + 1,
        particulars: item.particulars,
        qty: item.qty,
        rate: item.rate,
        amount: item.amount.toFixed(2),
      })),
      totalAmount: bill.totalAmount.toFixed(2),
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bills/${id}`);
      setBills(bills.filter((bill) => bill._id !== id));
      toast.success('Bill deleted successfully');
    } catch (err) {
      toast.error('Error deleting bill');
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Print bill
  const printBill = () => {
    console.log('Printing bill:', formData);
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-blue-200 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 no-print">Bills</h2>

        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-4 no-print">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by Bill ID or Customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
          </div>
        </div>

        {/* Form for Create/Update */}
        <form onSubmit={handleSubmit} className="mb-8 no-print">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bill ID</label>
              <input
                type="text"
                name="billId"
                value={formData.billId}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                required
              />
            </div>
          </div>

          {/* Items Table */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Items</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Particulars</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="no"
                        value={index + 1}
                        disabled
                        className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        name="particulars"
                        value={item.particulars}
                        onChange={(e) => handleInputChange(e, index)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleInputChange(e, index)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                        min="1"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleInputChange(e, index)}
                        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                        min="0"
                        step="0.01"
                        required
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="amount"
                        value={item.amount}
                        disabled
                        className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 mb-6 flex items-center gap-2"
          >
            <FaPlus /> Add Item
          </button>

          <div className="flex justify-between items-center mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                disabled
                className="p-3 border border-gray-300 rounded-lg w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 flex items-center gap-2"
              >
                {editingId ? 'Update Bill' : 'Save Bill'}
              </button>
              <button
                type="button"
                onClick={printBill}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200 flex items-center gap-2"
              >
                <FaPrint /> Print Bill
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200 flex items-center gap-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Bill Preview */}
        <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-md print-area">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 no-print">Bill Preview</h3>
          <div className="flex justify-between items-start mb-4">
            <img src="/Images/logo.png" alt="Nizon Tech Logo" className="w-32" />
            <div className="text-right text-sm text-gray-600 space-y-1">
              <p className="flex items-center justify-end gap-2">
                <FaWhatsapp className="text-green-500" /> 9846200284
              </p>
              <p className="flex items-center justify-end gap-2">
                <FaPhone className="text-blue-500" /> 8078200284
              </p>
              <p className="flex items-center justify-end gap-2">
                <FaMapMarkerAlt className="text-red-500" /> Near Canara Bank, KORATTY
              </p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 my-4">Bill</h1>
          <div className="flex justify-between mb-4">
            <div className="text-left text-sm text-gray-600 space-y-1">
              <p><strong>Bill ID:</strong> {formData.billId || 'N/A'}</p>
              <p><strong>Customer:</strong> {formData.customer || 'N/A'}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p><strong>Date:</strong> {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Particulars</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount Rs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ps</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {formData.items.map((item, index) => {
                  const amount = parseFloat(item.amount) || 0;
                  const rs = Math.floor(amount);
                  const ps = Math.round((amount - rs) * 100);
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.particulars || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.qty || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.rate || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{rs}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{ps}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-bold text-gray-800">Total</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{Math.floor(formData.totalAmount || 0)}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{Math.round((parseFloat(formData.totalAmount || 0) - Math.floor(parseFloat(formData.totalAmount || 0))) * 100)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between mt-6 text-sm text-gray-600">
            <div className="space-y-1">
              <p className="font-bold">BANK DETAILS</p>
              <p>NAME: ANTHONESE KD</p>
              <p>CANARA BANK KORATTY</p>
              <p>A/C NO: 3480101003736</p>
              <p>IFSC: CNRB0003480</p>
            </div>
            <div className="text-right">
              <p>Signature: ____________________</p>
            </div>
          </div>
        </div>

        {/* Bills Table */}
        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 no-print">Saved Bills</h3>
        <div className="overflow-x-auto no-print">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-900 text-white">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('billId')}
                >
                  Bill ID {sortBy === 'billId' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('customer')}
                >
                  Customer {sortBy === 'customer' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('totalAmount')}
                >
                  Total Amount {sortBy === 'totalAmount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('dueDate')}
                >
                  Date {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">{bill.billId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bill.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${bill.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(bill.dueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(bill)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(bill._id)}
                      className="text-red-600 hover:text-red-400"
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

export default Bill;