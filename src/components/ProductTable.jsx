import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

const ProductTable = ({ products, onSelect, onDelete, onEdit, role }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleView = (product) => {
    setSelectedProduct(product);
    document.getElementById('product-view-modal').showModal();
  };

  const handleDeletePrompt = (product) => {
    setDeleteTarget(product);
    document.getElementById('delete-confirmation-modal').showModal();
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Medicine Name</th>
            <th>Category</th>
            <th>Price (৳)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id || index}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded" />
                </td>
                <td>{product.name}</td>
                <td>{product.category || 'N/A'}</td>
                <td>{product.price}</td>
                <td>{product.stock || 'Available'}</td>
                <td className="flex gap-2">
                  <button onClick={() => handleView(product)} className="btn btn-sm btn-outline btn-info">
                    <FaEye />
                  </button>
                  {role === 'user' ? (
                    <button onClick={() => onSelect(product)} className="btn btn-sm btn-outline btn-primary">
                      <FaCartShopping />
                    </button>
                  ) : (
                    <>
                      <button onClick={() => onEdit(product)} className="btn btn-sm btn-outline btn-warning">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeletePrompt(product)} className="btn btn-sm btn-outline btn-error">
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔍 View Modal */}
      <dialog id="product-view-modal" className="modal">
        <div className="modal-box max-w-md md:max-w-xl">
          <h3 className="font-bold text-xl mb-4">Product Details</h3>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-40 object-contain rounded"
                />
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedProduct.name}</p>
                <p><strong>Generic Name:</strong> {selectedProduct.genericName}</p>
                <p><strong>Category:</strong> {selectedProduct.category}</p>
                <p><strong>Company:</strong> {selectedProduct.company}</p>
                <p>
                  <strong>Price:</strong> ৳{selectedProduct.price}
                  {selectedProduct.discount > 0 && (
                    <span className="ml-2 text-green-600">(-{selectedProduct.discount}% Off)</span>
                  )}
                </p>
                <p><strong>Description:</strong> {selectedProduct.description}</p>
              </div>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* ❗ Delete Confirmation Modal */}
      <dialog id="delete-confirmation-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Confirm Delete</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteTarget?.name}</span>?
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-sm">Cancel</button>
              <button onClick={confirmDelete} className="btn btn-sm btn-error">
                Yes, Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductTable;
