import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { name: "Sales", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" }, // Shopping cart
    { name: "Products", icon: "M20 7l-10-6-10 6v10l10 6 10-6V7zm-10 3v6m-4-3h8" }, // Package
    { name: "Utilities", icon: "M13 10V3L4 14h7v7l9-11h-7z" }, // Bolt (utilities)
    { name: "Stocks", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" }, // Archive box
    { name: "Reports", icon: "M9 17v-6h6v6m2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" }, // Chart bar
    { name: "Users", icon: "M12 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM3 18v-1a6 6 0 1112 0v1H3zm12 0h6v-1a6 6 0 00-6-6" }, // Users
    { name: "Suppliers", icon: "M8 7V3H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-2H8zm4 10a3 3 0 11-6 0 3 3 0 016 0z" }, // Truck
    { name: "Settings", icon: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z" }, // Cog
    { name: "Exit", icon: " " }, // Arrow left on rectangle (logout)
    { name: "Help", icon: " " }, // Question mark circle
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r-2 border-gray-200`}
    >
      <div className="p-4 flex flex-col items-center border-b border-gray-200">
        <div className="flex justify-center mb-2">
          <button
            className="text-gray-500 px-6 py-3 text-2xl mr-1"
            onClick={() => setActiveItem(null)}
          >
            ←
          </button>
          <button
            className="text-gray-500 px-6 py-3 text-2xl"
            onClick={() => setActiveItem(null)}
          >
            →
          </button>
        </div>
        <h2 className="text-3xl font-bold">POS</h2>
        <h2 className="text-3xl font-bold">NAME</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 flex items-center"
          onClick={() => setActiveItem("Home")}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          </svg>
          Home
        </button>
        <button className="md:hidden mt-2" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={() => setActiveItem(item.name)}
            className={`flex items-center py-2 px-4 hover:bg-gray-100 ${
              index === 0 ? '' : 'border-b border-gray-200'
            } ${
              index === menuItems.length - 2 || index === menuItems.length - 1 ? '' : 'border-b border-gray-200'
            } ${
              activeItem === item.name && (item.name === "Exit" || item.name === "Help")
                ? "bg-red-100 text-red-500"
                : activeItem === item.name
                ? "bg-green-100 text-green-500"
                : item.name === "Exit" || item.name === "Help"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            {item.name === "Exit" && (
              <span className="mr-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs">
                X
              </span>
            )}
            {item.name === "Help" && (
              <span className="mr-2 flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-xs">
                ?
              </span>
            )}
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;