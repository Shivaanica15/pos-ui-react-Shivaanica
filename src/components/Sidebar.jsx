const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = ["Home", "Sales", "Products", "Customers", "Orders", "Reports", "Settings"];
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-4">
        <h2 className="text-2xl font-bold">POS System</h2>
        <button className="md:hidden mt-2" onClick={toggleSidebar}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className="block py-2 px-4 hover:bg-gray-700">{item}</a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;