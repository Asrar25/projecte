// // src/components/Sidebar.jsx
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const menuItems = [
//     { path: '/dashboard', name: 'Dashboard' },
//     { path: '/add-battery', name: 'Add Battery' },
//     { path: '/add-category', name: 'Add Category' },
//     { path: '/', name: 'Logout' },
//   ];

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform z-50 ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } w-64`}
//     >
//       {/* Close button inside sidebar */}
//       <div className="flex justify-end p-4">
//         <button
//           onClick={toggleSidebar}
//           className="text-white text-xl bg-gray-700 rounded px-2 py-1 hover:bg-gray-600"
//         >
//           ✕
//         </button>
//       </div>

//       <nav className="p-4">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.name} className="mb-2">
//               <NavLink
//                 to={item.path}
//                 onClick={toggleSidebar}
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'block p-2 bg-gray-700 rounded'
//                     : 'block p-2 hover:bg-gray-700 rounded'
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: DashboardIcon() },
    { path: '/orders', name: 'Orders', icon: OrdersIcon() },
    { path: '/myProduct', name: 'MyProduct', icon: BatteryIcon() },
     { path: '/add-battery', name: 'Add Battery', icon: BatteryIcon() },
    { path: '/add-category', name: 'Add Category', icon: CategoryIcon() },
    { path: '/', name: 'Logout', icon: LogoutIcon() },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } fixed top-0 left-0`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        {isOpen && <span className="text-xl font-bold">🔋 Store</span>}
        <button className="text-white focus:outline-none">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <NavItem icon={item.icon} label={item.name} isOpen={isOpen} />
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center px-4 py-3 hover:bg-gray-700 cursor-pointer">
    {icon}
    {isOpen && <span className="ml-3">{label}</span>}
  </div>
);

export default Sidebar;

//
// 🔧 ICON COMPONENTS BELOW
//
const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
  </svg>
);

const BatteryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4h-1V2h-6v2H8c-1.1 0-2 .9-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6c0-1.1-.9-2-2-2z" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10 0h8v8h-8v-8zm0-10h8v8h-8V3z" />
  </svg>
);

const OrdersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h18v2H3v-2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H5a2 2 0 00-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
  </svg>
);


