// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ users: 0, projects: 0 });

//   useEffect(() => {
//     axios.get('/api/stats').then((res) => setStats(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="p-4 bg-white shadow rounded">
//           <h2>Total Users</h2>
//           <p className="text-xl">{stats.users}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded">
//           <h2>Total Projects</h2>
//           <p className="text-xl">{stats.projects}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




const Dashboard = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      <p>Welcome to the Nizon Tech Admin Dashboard. Use the sidebar to navigate to Purchase, Stock, or Bill pages.</p>
    </div>
  );
};

export default Dashboard;