import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Could not fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        try {
            await deleteUser(id);
            toast.success('User deleted successfully');
            fetchUsers(); // Refresh the list after deletion
        } catch (error) {
            toast.error('Failed to delete user.');
        }
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center p-10">
            <div className="w-10 h-10 rounded-full border-4 border-t-primary border-lavender/30 animate-spin"></div>
        </div>
    );
  }

  return (
    <div className="bg-plum/30 p-6 rounded-xl border border-lavender/20">
        <h2 className="text-2xl font-bold text-white mb-4">Manage Users ({users.length})</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-lavender/20">
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Admin</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id} className="border-b border-lavender/10 text-lavender/90">
                            <td className="p-3 font-semibold text-white">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.location}</td>
                            <td className="p-3">{user.isAdmin ? <span className="text-green-400 font-semibold">Yes</span> : 'No'}</td>
                            <td className="p-3">
                                <button 
                                    onClick={() => handleDelete(user._id)} 
                                    className="text-red-400 hover:text-red-500 transition-colors"
                                    aria-label={`Delete user ${user.name}`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default UserList;