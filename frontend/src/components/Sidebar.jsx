// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/add-battery', name: 'Add Battery' },
    { path: '/add-category', name: 'Add Category' },
    { path: '/', name: 'Logout' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}
    >
      {/* Close button inside sidebar */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-white text-xl bg-gray-700 rounded px-2 py-1 hover:bg-gray-600"
        >
          ✕
        </button>
      </div>

      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive
                    ? 'block p-2 bg-gray-700 rounded'
                    : 'block p-2 hover:bg-gray-700 rounded'
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
