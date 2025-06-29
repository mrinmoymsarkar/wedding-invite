import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminAuth from '../components/AdminAuth';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bengali-cream via-white to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bengali-crimson mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminAuth />;
};

export default AdminPage;