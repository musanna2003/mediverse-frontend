import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import uploadToCloudinary from '../../services/uploadToCloudinary';
import { toast } from 'react-toastify';

const ManageCategories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dialogRef = useRef(null);
  const queryClient = useQueryClient();

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:3000/admin/categories');
    return res.data;
  };

  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const handleAddCategory = async () => {
    if (!categoryName) return toast.error('Category name is required');

    try {
      setUploading(true);
      let imageUrl = '';

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const newCategory = { name: categoryName, image: imageUrl };

      await axios.post('http://localhost:3000/admin/categories', newCategory);

      toast.success('Category added!');
      dialogRef.current.close();
      setCategoryName('');
      setImageFile(null);
      queryClient.invalidateQueries(['categories']);
    } catch (err) {
      toast.error('Failed to add category',err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`http://localhost:3000/admin/categories/${name}`);
      toast.success('Category deleted');
      queryClient.invalidateQueries(['categories']);
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load categories</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button
          onClick={() => dialogRef.current.showModal()}
          className="btn btn-primary"
        >
          <FaPlus className="mr-1" /> Add Category
        </button>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.name}>
              <td>
                <img src={cat.image} className="w-12 h-12 rounded" alt={cat.name} />
              </td>
              <td>{cat.name}</td>
              <td className="text-right">
                <button className="btn btn-sm btn-warning mr-2">
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(cat.name)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add Category */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Add New Category</h3>
          <div className="space-y-2">
            <label className="label">Category Name</label>
            <input
              type="text"
              placeholder="e.g. Pain Relief"
              className="input input-bordered w-full"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <label className="label">Category Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={handleAddCategory}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Add'}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => dialogRef.current.close()}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageCategories;
