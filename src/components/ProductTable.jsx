import React from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";

const ProductTable = ({ products, onSelect, onView,onDelete,onEdit }) => {
  const role ='seller'
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
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category || 'N/A'}</td>
                <td>{product.price}</td>
                <td>{product.stock || 'Available'}</td>
                <td className="flex gap-2">
                  <button
                        onClick={() => onView(product)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        <FaEye />
                      </button>
                  {role === 'user' ? (
                    <>
                      <button
                        onClick={() => onSelect(product)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        <FaCartShopping />
                      </button>
                    
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onEdit(product)}
                        className="btn btn-sm btn-outline btn-warning"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
                        className="btn btn-sm btn-outline btn-error"
                      >
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
    </div>
  );
};

export default ProductTable;
