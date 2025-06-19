import { useState, useEffect } from 'react';

const FilterSection = ({ setFilters, resetFilters }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [thickness, setThickness] = useState("");

  const handleFilterChange = () => {
    setFilters({ search, category, color, thickness });
  };

  useEffect(() => {
    handleFilterChange();
  }, [search, category, color, thickness]);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Select Color</option>
          <option value="Silver">Silver</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
        <select
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">Select Thickness</option>
          <option value="1.2cm">1.2cm</option>
          <option value="N/A">N/A</option>
        </select>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setSearch("");
          setCategory("");
          setColor("");
          setThickness("");
          resetFilters();
        }}
      >
        Refresh
      </button>
    </div>
  );
};

export default FilterSection;