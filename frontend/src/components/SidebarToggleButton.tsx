// src/components/SidebarToggleButton.jsx
import React from 'react';

const SidebarToggleButton = ({ toggleSidebar }) => {
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 m-2 text-white bg-gray-500 rounded-md hover:bg-blue-700 focus:outline-none"
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m154.7 454.5l-246 178c-5.3 3.8-12.7 0-12.7-6.5v-46.9c0-10.2 4.9-19.9 13.2-25.9L566.6 512L421.2 406.8c-8.3-6-13.2-15.6-13.2-25.9V334c0-6.5 7.4-10.3 12.7-6.5l246 178c4.4 3.2 4.4 9.8 0 13"/></svg>
    </button>
  );
};

export default SidebarToggleButton;
