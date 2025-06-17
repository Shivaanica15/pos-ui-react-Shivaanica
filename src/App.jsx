import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import TopNav from './components/TopNav';
import FilterSection from './components/FilterSection';
import ProductTable from './components/ProductTable';
import Modal from './components/Modal';
import './index.css';

// Mock data
const mockData = [
  { id: 1, name: "Laptop", code: "LAP001", barcode: "123456789", category: "Electronics", tax: "10%", price: "$999", store: "In Stock", warehouse: "Available", color: "Silver", thickness: "1.2cm" },
  { id: 2, name: "Mouse", code: "MOU002", barcode: "987654321", category: "Accessories", tax: "5%", price: "$25", store: "Not Available", warehouse: "Available", color: "Black", thickness: "N/A" },
  { id: 3, name: "Keyboard", code: "KEY003", barcode: "456789123", category: "Accessories", tax: "5%", price: "$50", store: "In Stock", warehouse: "Not Available", color: "White", thickness: "N/A" },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", category: "", color: "", thickness: "" });
  const [filteredProducts, setFilteredProducts] = useState(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const resetFilters = () => {
    setFilters({ search: "", category: "", color: "", thickness: "" });
    setFilteredProducts(mockData);
  };

  useEffect(() => {
    const filtered = mockData.filter((product) => {
      return (
        product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (filters.category ? product.category === filters.category : true) &&
        (filters.color ? product.color === filters.color : true) &&
        (filters.thickness ? product.thickness === filters.thickness : true)
      );
    });
    setFilteredProducts(filtered);
  }, [filters]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-64">
        <TopNav />
        <div className="p-4">
          <button className="md:hidden mb-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={toggleSidebar}>
            Toggle Sidebar
          </button>
          <FilterSection setFilters={setFilters} resetFilters={resetFilters} />
          <ProductTable products={filteredProducts} openModal={openModal} />
        </div>
        <Modal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} />
      </div>
    </div>
  );
}

export default App;