import { useState } from 'react';

const AddProductModal = ({ isOpen, closeModal, addProduct }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    gst: false,
    hst: false,
    vat: false,
    tax: false,
    imageUpload: "",
    useScale: false,
    productCode: "",
    quantity: "",
    unitOfScale: "kg",
    location: "",
    rackName: "",
    rackColumn: "",
    rackRow: "",
    reOrderLevel: "",
    expireAlertDays: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    closeModal();
  };

  const handleRefresh = () => {
    setFormData({
      productName: "",
      category: "",
      description: "",
      gst: false,
      hst: false,
      vat: false,
      tax: false,
      imageUpload: "",
      useScale: false,
      productCode: "",
      quantity: "",
      unitOfScale: "kg",
      location: "",
      rackName: "",
      rackColumn: "",
      rackRow: "",
      reOrderLevel: "",
      expireAlertDays: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Product</h2>
            <button
              type="button"
              onClick={() => alert("Scan Barcode functionality to be implemented")}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Scan Barcode
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 border-2 border-green-500 p-4 rounded">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Product Descriptions</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
              />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="gst"
                      checked={formData.gst}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    GST
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="hst"
                      checked={formData.hst}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    HST
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="vat"
                      checked={formData.vat}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    VAT
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="tax"
                      checked={formData.tax}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Tax
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Upload</label>
              <input
                type="file"
                name="imageUpload"
                onChange={(e) => setFormData((prev) => ({ ...prev, imageUpload: e.target.files[0] }))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="useScale"
                  checked={formData.useScale}
                  onChange={handleChange}
                  className="mr-2"
                />
                Use Scale
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="productCode"
                value={formData.productCode}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit of Scale</label>
              <input
                type="text"
                name="unitOfScale"
                value={formData.unitOfScale}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Re Order Level (Stock) <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="reOrderLevel"
                value={formData.reOrderLevel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expire Alert Days <span className="text-red-500">*</span></label>
              <input
                type="number"
                name="expireAlertDays"
                value={formData.expireAlertDays}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Product Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rack Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="rackName"
                  value={formData.rackName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rack Column <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="rackColumn"
                  value={formData.rackColumn}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rack Row <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="rackRow"
                  value={formData.rackRow}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleRefresh}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;