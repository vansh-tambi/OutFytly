import React, { useState, useEffect, useContext } from 'react';
import { getAllUsers, deleteUser } from '../../api/adminService';
import toast from 'react-hot-toast';
import { Trash2, User, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: adminUser } = useContext(AuthContext); // Get the logged-in admin's info

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
  
  const handleDelete = async (userToDelete) => {
    // Prevent admin from deleting themselves
    if (userToDelete._id === adminUser._id) {
        toast.error("You cannot delete your own admin account.");
        return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${userToDelete.name}? This action cannot be undone.`)) {
        try {
            await deleteUser(userToDelete._id);
            toast.success('User deleted successfully');
            fetchUsers(); // Refresh the list
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
    <div className="bg-plum/30 p-4 sm:p-6 rounded-xl border border-lavender/20">
        <h2 className="text-2xl font-bold text-white mb-4">Manage Users ({users.length})</h2>
        
        {/* On mobile, this will be a grid of cards. On desktop, it's hidden. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {users.map(user => (
                <div key={user._id} className="bg-ink p-4 rounded-lg border border-lavender/20 flex flex-col">
                    <div className="flex-grow space-y-2 text-sm">
                        <p className="font-bold text-white text-base flex items-center gap-2"><User size={14} /> {user.name}</p>
                        <p className="text-lavender/80 flex items-center gap-2"><Mail size={14} /> {user.email}</p>
                        <p className="text-lavender/80 flex items-center gap-2"><MapPin size={14} /> {user.location}</p>
                        <p className="flex items-center gap-2">{user.isAdmin ? <span className="text-green-400 font-semibold flex items-center gap-2"><ShieldCheck size={14} /> Admin</span> : 'User'}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-lavender/20 flex justify-end">
                        <button 
                            onClick={() => handleDelete(user)}
                            className="text-red-400 hover:text-red-500 transition-colors"
                            aria-label={`Delete user ${user.name}`}
                            disabled={user._id === adminUser._id} // Disable delete button for self
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* On desktop, this table will be visible. On mobile, it's hidden. */}
        <div className="overflow-x-auto hidden md:block">
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
                                    onClick={() => handleDelete(user)}
                                    className="text-red-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    aria-label={`Delete user ${user.name}`}
                                    disabled={user._id === adminUser._id} // Disable delete button for self
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