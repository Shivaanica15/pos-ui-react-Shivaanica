const Modal = ({ isOpen, closeModal, product }) => {
  if (!isOpen || !product) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Code:</strong> {product.code}</p>
        <p><strong>Barcode:</strong> {product.barcode}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Tax:</strong> {product.tax}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Store:</strong> {product.store}</p>
        <p><strong>Warehouse:</strong> {product.warehouse}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Thickness:</strong> {product.thickness}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;