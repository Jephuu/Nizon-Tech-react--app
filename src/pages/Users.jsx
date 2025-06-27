import { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Use configured axios instance
 
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]);
      });
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600 ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;