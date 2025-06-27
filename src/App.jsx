// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import Styles from '../src/style.css';
// import Sidebar from './components/Sidebar';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import Users from './pages/Users';
// import NizonTech from './pages/NizonTech';
// import Stock from './pages/nizon-tech/Stock';
// import Purchase from './pages/nizon-tech/Purchase';
// import Sales from './pages/nizon-tech/Sales';
// import Bill from './pages/nizon-tech/Bill';
// import NizonPower from './pages/NizonPower';
// import NizonSolutions from './pages/NizonSolutions';
// import Login from './pages/nizon-tech/Login';
// import { useState, useEffect } from 'react';

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// const AppContent = ({ setUser }) => {
//   const [user, setUserState] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUserState(JSON.parse(storedUser));
//       setUser(JSON.parse(storedUser));
//     }
//   }, [setUser]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUserState(null);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <ToastContainer position="top-right" autoClose={3000} />
//       {user && <Navbar user={user} onLogout={handleLogout} />}
//       <div className="flex flex-1">
//         {user && <Sidebar user={user} onLogout={handleLogout} />}
//         <div className={`flex-1 main-content ${user ? 'pt-16' : ''}`}>
//           <Routes>
//             <Route path="/login" element={<Login setUser={setUser} />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <PrivateRoute>
//                   <Dashboard />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/users"
//               element={
//                 <PrivateRoute>
//                   <Users />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/tech"
//               element={
//                 <PrivateRoute>
//                   <NizonTech />
//                 </PrivateRoute>
//               }
//             >
//               <Route
//                 path="stock"
//                 element={
//                   <PrivateRoute>
//                     <Stock />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="purchase"
//                 element={
//                   <PrivateRoute>
//                     <Purchase />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="sales"
//                 element={
//                   <PrivateRoute>
//                     <Sales />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="bill"
//                 element={
//                   <PrivateRoute>
//                     <Bill />
//                   </PrivateRoute>
//                 }
//               />
//             </Route>
//             <Route
//               path="/power"
//               element={
//                 <PrivateRoute>
//                   <NizonPower />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/solutions"
//               element={
//                 <PrivateRoute>
//                   <NizonSolutions />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <BrowserRouter>
//       <AppContent setUser={setUser} />
//     </BrowserRouter>
//   );
// }

// export default App;


// Trigger redeploy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NizonTech from './pages/NizonTech';
import Stock from './pages/nizon-tech/Stock';
import Purchase from './pages/nizon-tech/Purchase';
import Sales from './pages/nizon-tech/Sales';
import Bill from './pages/nizon-tech/Bill';
import NizonPower from './pages/NizonPower';
import NizonSolutions from './pages/NizonSolutions';
import Login from './pages/nizon-tech/Login';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex">
        {user && <Sidebar user={user} onLogout={handleLogout} />}
        <div className={user ? 'flex-1 ml-64 pt-16' : 'flex-1' }>
          
          {user && <Navbar user={user} onLogout={handleLogout} />}
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/tech"
              element={
                <PrivateRoute>
                  <NizonTech />
                </PrivateRoute>
              }
            >
              <Route
                path="stock"
                element={
                  <PrivateRoute>
                    <Stock />
                  </PrivateRoute>
                }
              />
              <Route
                path="purchase"
                element={
                  <PrivateRoute>
                    <Purchase />
                  </PrivateRoute>
                }
              />
              <Route
                path="sales"
                element={
                  <PrivateRoute>
                    <Sales />
                  </PrivateRoute>
                }
              />
              <Route
                path="bill"
                element={
                  <PrivateRoute>
                    <Bill />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path="/power"
              element={
                <PrivateRoute>
                  <NizonPower />
                </PrivateRoute>
              }
            />
            <Route
              path="/solutions"
              element={
                <PrivateRoute>
                  <NizonSolutions />
                </PrivateRoute>
              }
            />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 

