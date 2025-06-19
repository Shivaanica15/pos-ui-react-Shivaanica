import { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { name: "Sales", icon: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm10 10l4 4m0 0l-4 4m4-4H2" }, // Shopping cart
    { name: "Products", icon: "M12 6v6m0 0v6m0-6h6m-6 0H6" }, // Grid of boxes (product layout)
    { name: "Utilities", icon: "M9.663 17h4.673M12 3v1m0 16v1m8.5-10.5h.01M3.5 13.5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }, // Wrench
    { name: "Stocks", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2zm5 0v8m3-8v8m3-8v8m3-8v8" }, // Stacked boxes (inventory)
    { name: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2zm-1.5-2v2m0-6V7" }, // Document with chart
    { name: "Users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0zm6 9a4 4 0 11-8 0 4 4 0 018 0z" }, // Group of people
    { name: "Suppliers", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zm4 0a2 2 0 11-4 0 2 2 0 014 0zm4 0a2 2 0 11-4 0 2 2 0 014 0zm2-7h-1V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h11l4-4V10z" }, // Delivery truck
    { name: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }, // Gear
    { name: "Exit", icon: "" },
    { name: "Help", icon: "" },
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
              index === 0 ? '' : 'border-b border-gray-200' // No line after Home
            } ${
              index === menuItems.length - 2 || index === menuItems.length - 1 ? '' : 'border-b border-gray-200' // No line after Exit and Help
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