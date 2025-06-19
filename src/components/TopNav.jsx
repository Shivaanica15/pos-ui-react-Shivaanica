
import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const TopNav = ({ onAddProductsClick, onFilterChange }) => {
  // State for all filters
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

  // Debounce search inputs to prevent excessive updates
  const [debouncedGlobalSearch] = useDebounce(filters.globalSearch, 500);
  const [debouncedSearchQuery] = useDebounce(filters.searchQuery, 500);

  // Notify parent when filters change (including debounced search)
  useEffect(() => {
    onFilterChange?.(filters);
  }, [
    debouncedGlobalSearch,
    debouncedSearchQuery,
    filters.searchBy,
    filters.product,
    filters.sortBy,
    filters.category,
    filters.color,
    filters.thickness,
    filters.diameter,
  ]);

  // Handle input changes for text inputs and dropdowns
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle refresh button click
  const handleRefresh = () => {
    const resetFilters = {
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
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  // Sample options for dropdowns (replace with dynamic data from API if available)
  const searchByOptions = ['Name', 'ID'];
  const sortByOptions = ['Name', 'Price'];
  const categoryOptions = ['All', 'Electronics', 'Clothing', 'Books'];
  const colorOptions = ['All', 'Red', 'Blue', 'Green'];
  const thicknessOptions = ['All', 'Thin', 'Medium', 'Thick'];
  const diameterOptions = ['All', 'Small', 'Medium', 'Large'];
  const productOptions = ['All', 'Product A', 'Product B', 'Product C'];

  return (
    <div className="w-full bg-white p-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            name="globalSearch"
            value={filters.globalSearch}
            onChange={handleInputChange}
            placeholder="Search Products..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg
            className="w-5 h-5 absolute right-2 top-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-2 h-2"></span>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600">👤</span>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Bill
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Products</span>
          <div className="relative w-1/4">
            <input
              type="text"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleInputChange}
              placeholder="Search product by name or id..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              className="w-5 h-5 absolute right-2 top-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Search By</label>
            <select
              name="searchBy"
              value={filters.searchBy}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {searchByOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Select Product</label>
            <select
              name="product"
              value={filters.product}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {productOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sortByOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Color</label>
            <select
              name="color"
              value={filters.color}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {colorOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Thickness</label>
            <select
              name="thickness"
              value={filters.thickness}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {thicknessOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Diameter</label>
            <select
              name="diameter"
              value={filters.diameter}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {diameterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center mt-6"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
