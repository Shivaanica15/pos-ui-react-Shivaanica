import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
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
    const color = ['Red', 'Blue', 'Green', 'Silver', 'Black', 'White'][Math.floor(Math.random() * 6)];
    const thickness = ['Thin', 'Medium', 'Thick', '1.2cm', 'N/A'][Math.floor(Math.random() * 5)];
    const diameter = ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)];

    data.push({
      id: i,
      name: base.name,
      code: code,
      barcode: barcode,
      category: base.category,
      tax: base.tax,
      price: price,
      store: store,
      warehouse: warehouse,
      color: color,
      thickness: thickness,
      diameter: diameter,
    });
  }

  return data;
};

const mockData = generateMockData();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    searchQuery: '',
    searchBy: 'Name',
    product: '',
    sortBy: '',
    category: '',
    color: '',
    thickness: '',
    diameter: '',
    globalSearch: '',
  });
  const [filteredProducts, setFilteredProducts] = useState(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    const reset = {
      searchQuery: '',
      searchBy: 'Name',
      product: '',
      sortBy: '',
      category: '',
      color: '',
      thickness: '',
      diameter: '',
      globalSearch: '',
    };
    setFilters(reset);
    setFilteredProducts(mockData);
  };

  useEffect(() => {
    let filtered = [...mockData];

    // Apply global search
    if (filters.globalSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
        product.code.toLowerCase().includes(filters.globalSearch.toLowerCase()) ||
        product.barcode.includes(filters.globalSearch)
      );
    }

    // Apply specific search by Name or ID
    if (filters.searchQuery && filters.searchBy === 'Name') {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    } else if (filters.searchQuery && filters.searchBy === 'ID') {
      filtered = filtered.filter((product) =>
        product.code.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply product filter
    if (filters.product && filters.product !== 'All') {
      filtered = filtered.filter((product) => product.name === filters.product);
    }

    // Apply category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Apply color filter
    if (filters.color && filters.color !== 'All') {
      filtered = filtered.filter((product) => product.color === filters.color);
    }

    // Apply thickness filter
    if (filters.thickness && filters.thickness !== 'All') {
      filtered = filtered.filter((product) => product.thickness === filters.thickness);
    }

    // Apply diameter filter
    if (filters.diameter && filters.diameter !== 'All') {
      filtered = filtered.filter((product) => product.diameter === filters.diameter);
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        if (filters.sortBy === 'Name') {
          return a.name.localeCompare(b.name);
        } else if (filters.sortBy === 'Price') {
          const priceA = parseFloat(a.price.replace('$', ''));
          const priceB = parseFloat(b.price.replace('$', ''));
          return priceA - priceB;
        }
        return 0;
      });
    }

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
    const productWithId = {
      ...newProduct,
      id: mockData.length + 1,
      price: "$0",
      store: "In Stock",
      warehouse: "Available",
      color: newProduct.color || 'N/A',
      thickness: newProduct.thickness || 'N/A',
      diameter: newProduct.diameter || 'N/A',
    };
    setFilteredProducts((prev) => [...prev, productWithId]);
    mockData.push(productWithId); // Update mockData to persist new product
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col transition-all duration-300" style={{ marginLeft: sidebarOpen ? '256px' : '0' }}>
        <TopNav onAddProductsClick={openAddProductModal} onFilterChange={handleFilterChange} />
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