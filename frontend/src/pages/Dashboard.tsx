import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Brain, FileText, Activity } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username); // Set username from local storage
    }
  }, []);

  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-500',
      link: '/patients',
    },
    {
      title: 'AI Consultations',
      value: '856',
      icon: Brain,
      color: 'bg-purple-500',
      link: '/ai-assistant',
    },
    {
      title: 'Medical Records',
      value: '3,789',
      icon: FileText,
      color: 'bg-green-500',
      link: '/records',
    },
    {
      title: 'Active Treatments',
      value: '567',
      icon: Activity,
      color: 'bg-red-500',
      link: '/treatments',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     <h1 className="text-3xl font-bold mb-8 dark:text-white text-gray-900">
  Welcome, {username || 'User'}!
</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New patient record updated
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/patients/new"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-medium text-blue-900">Add New Patient</span>
            </Link>
            <Link
              to="/ai-assistant"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Brain className="h-5 w-5 text-purple-600 mr-3" />
              <span className="text-sm font-medium text-purple-900">AI Consultation</span>
            </Link>
            <Link
              to="/records/upload"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <FileText className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-sm font-medium text-green-900">Upload Records</span>
            </Link>
            <Link
              to="/reports"
              className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Activity className="h-5 w-5 text-red-600 mr-3" />
              <span className="text-sm font-medium text-red-900">View Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
