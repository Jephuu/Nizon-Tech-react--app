import { Link, Outlet } from 'react-router-dom';

const NizonTech = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nizon Tech</h1>
      <nav className="mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="stock" className="text-blue-600 hover:underline">Stock</Link>
          </li>
          <li>
            <Link to="purchase" className="text-blue-600 hover:underline">Purchase</Link>
          </li>
          <li>
            <Link to="sales" className="text-blue-600 hover:underline">Sales</Link>
          </li>
          <li>
            <Link to="bill" className="text-blue-600 hover:underline">Bill</Link>
          </li>
        </ul>
      </nav>
      <div className="bg-white shadow rounded p-4">
        <Outlet /> {/* Renders Stock, Purchase, Sales, or Bill */}
      </div>
    </div>
  );
};

export default NizonTech;