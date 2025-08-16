import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Context/useAuth';
import axios from 'axios';
import uploadToCloudinary from '../../services/uploadToCloudinary';
import { toast } from 'react-toastify';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const companies = ['Square', 'Beximco', 'ACI', 'Renata', 'Incepta', 'ACME'];
const units = ['mg', 'ml','g','pc'];


const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    axios.get('https://ph-assignment-12-backend.vercel.app/admin/categories')
      .then((res) => {
        setCategories(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading categories...</div>;
  }


  const onSubmit = async (data) => {
    const imageFile = data.image[0];

    try {
      // 🔄 Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);

      const productData = {
        name: data.name,
        genericName: data.genericName,
        category: data.category,
        company: data.company,
        quantity: parseInt(data.quantity),
        unit: data.unit,
        price: parseFloat(data.price),
        discount: parseFloat(data.discount) || 0,
        description: data.description,
        image: imageUrl,
        sellerEmail: user?.email,
        uploadDate: new Date().toISOString(),
      };

      

      // ✅ POST to your backend
      try {
        const response = await axiosSecure.post('https://ph-assignment-12-backend.vercel.app/products', productData);
        console.log("Saved to DB:", response.data);
        toast.success("Upload Successful!");
      } catch (error) {
        console.error("Error saving to DB:", error);
      }

      reset();
      setPreview(null);

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };



  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Product Name */}
        <div>
          <label className="label">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="input input-bordered w-full"
            {...register('name', { required: 'Product name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Generic Name */}
        <div>
          <label className="label">Generic Name</label>
          <input
            type="text"
            placeholder="Enter generic name"
            className="input input-bordered w-full"
            {...register('genericName', { required: 'Generic name is required' })}
          />
          {errors.genericName && <p className="text-red-500 text-sm">{errors.genericName.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register('image', { required: 'Image is required' })}
            onChange={handleImagePreview}
          />
          {preview && <img src={preview} alt="Preview" className="mt-2 h-24 rounded" />}
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register('category', { required: 'Category is required' })}
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="label">Company</label>
          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register('company', { required: 'Company is required' })}
          >
            <option value="" disabled>Select company</option>
            {companies.map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        {/* Unit */}
        <div>
          <label className="label">Mass Unit</label>
          <select
            className="select select-bordered w-full"
            defaultValue=""
            {...register('unit', { required: 'Unit is required' })}
          >
            <option value="" disabled>Select unit</option>
            {units.map((u, idx) => (
              <option key={idx} value={u}>{u}</option>
            ))}
          </select>
          {errors.unit && <p className="text-red-500 text-sm">{errors.unit.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="label">Quantity</label>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Available quantity"
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' }
            })}
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="label">Per Unit Price (৳)</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            placeholder="Enter price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0.01, message: 'Price must be greater than 0' }
            })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Discount */}
        {/* <div>
          <label className="label">Discount % (optional)</label>
          <input
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            defaultValue={0}
            placeholder="Enter discount"
            {...register('discount', {
              min: { value: 0, message: 'Discount must be 0 or higher' },
              max: { value: 100, message: 'Discount cannot exceed 100%' }
            })}
          />
          {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
        </div> */}

        {/* Description */}
        <div>
          <label className="label">Short Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Short description..."
            rows={3}
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
