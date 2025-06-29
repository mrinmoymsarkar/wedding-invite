import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, FileText, Image, Calendar, Users, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      icon: Heart,
      title: 'Wedding Details',
      description: 'Edit couple names, dates, and venue information',
      color: 'from-bengali-crimson to-bengali-deep-red'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Manage wedding ceremonies and schedules',
      color: 'from-bengali-gold to-bengali-amber'
    },
    {
      icon: Image,
      title: 'Photo Gallery',
      description: 'Upload and organize wedding photos',
      color: 'from-bengali-orange to-bengali-saffron'
    },
    {
      icon: FileText,
      title: 'Content',
      description: 'Edit website text and descriptions',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Cultural Info',
      description: 'Manage traditions and cultural content',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure website settings and preferences',
      color: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bengali-cream via-white to-bengali-ivory dark:from-dark-900 dark:via-dark-800 dark:to-dark-700">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 shadow-sm border-b border-gray-200 dark:border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img
                src="https://1fimd9lwq61lrowk.public.blob.vercel-storage.com/wediing-icon-MWGi3zHWRSwveW4CaK9EM7s57pDP54.png"
                alt="Wedding Icon"
                className="h-8 w-8"
              />
              <div>
                <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                  Wedding CMS
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Content Management System
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Administrator
                </p>
              </div>
              
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Welcome to your Wedding CMS
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all aspects of your wedding website content from this dashboard.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-bengali-crimson/10 rounded-lg">
                <Heart className="h-6 w-6 text-bengali-crimson" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wedding Events</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-bengali-gold/10 rounded-lg">
                <Image className="h-6 w-6 text-bengali-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gallery Photos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Languages</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-bengali-crimson dark:group-hover:text-bengali-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CMS Integration Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-bengali-gold/10 to-bengali-amber/10 border border-bengali-gold/20 rounded-xl p-6"
        >
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-bengali-gold/20 rounded-lg">
              <Settings className="h-6 w-6 text-bengali-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Content Management Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This dashboard provides an overview of your wedding website. To edit content directly, 
                you can use the integrated CMS system or modify configuration files.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/admin'}
                className="bg-gradient-to-r from-bengali-gold to-bengali-amber text-gray-900 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Open CMS Editor
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;