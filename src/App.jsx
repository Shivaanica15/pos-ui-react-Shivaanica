import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import FilterSection from './components/FilterSection';
import ProductTable from './components/ProductTable';
import Modal from './components/Modal';
import AddProductModal from './components/AddProductModal';
import './index.css';

const baseData = [
  { name: "Laptop", code: "LAP", category: "Electronics", tax: "10%", basePrice: 999, storeOptions: ["In Stock", "Not Available"], warehouseOptions: ["Available", "Not Available"] },
  { name: "Mouse", code: "MOU", category: "Accessories", tax: "5%", basePrice: 25, storeOptions: ["In Stock", "Not Available"], warehouseOptions: ["Available", "Not Available"] },
  { name: "Keyboard", code: "KEY", category: "Accessories", tax: "5%", basePrice: 50, storeOptions: ["In Stock", "Not Available"], warehouseOptions: ["Available", "Not Available"] },
];

const generateMockData = (count = 200) => {
  const data = [];

  for (let i = 1; i <= count; i++) {
    const base = baseData[Math.floor(Math.random() * baseData.length)];

    const code = `${base.code}${String(i).padStart(3, '0')}`;
    const barcode = Math.floor(100000000 + Math.random() * 900000000).toString();
    const price = `$${(base.basePrice * (0.9 + Math.random() * 0.2)).toFixed(2)}`;
    const store = base.storeOptions[Math.floor(Math.random() * base.storeOptions.length)];
    const warehouse = base.warehouseOptions[Math.floor(Math.random() * base.warehouseOptions.length)];

    data.push({
      id: i,
      name: base.name,
      code: code,
      barcode: barcode,
      category: base.category,
      tax: base.tax,
      price: price,
      store: store,
      warehouse: warehouse
    });
  }

  return data;
};

const mockData = generateMockData();
console.log(mockData);


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open on desktop
  const [filters, setFilters] = useState({ search: "", category: "", color: "", thickness: "" });
  const [filteredProducts, setFilteredProducts] = useState(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

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

  const openAddProductModal = () => setAddProductModalOpen(true);
  const closeAddProductModal = () => setAddProductModalOpen(false);

  const addProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: mockData.length + 1, price: "$0", store: "In Stock", warehouse: "Available" };
    setFilteredProducts((prev) => [...prev, productWithId]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content with Margin to Accommodate Sidebar */}
      <div className="flex-1 flex flex-col ml-64 transition-all duration-300" style={{ marginLeft: sidebarOpen ? '256px' : '0' }}>
        <TopNav />
        <div className="flex-1 overflow-y-auto p-4">
          <button
            className="md:hidden mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={toggleSidebar}
          >
            Toggle Sidebar
          </button>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Products</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={openAddProductModal}
            >
              + Add Product
            </button>
          </div>
          
          <ProductTable products={filteredProducts} openModal={openModal} />
        </div>
        <Modal isOpen={modalOpen} closeModal={closeModal} product={selectedProduct} />
        <AddProductModal isOpen={addProductModalOpen} closeModal={closeAddProductModal} addProduct={addProduct} />
      </div>
    </div>
  );
}

export default App;


