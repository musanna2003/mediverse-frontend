import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'First Aid', 'Diabetes Care', 'Heart Care'];

const AddProduct = () => {
const { register, handleSubmit, reset, formState: { errors } } = useForm();
const [preview, setPreview] = useState(null);

const imgbbApiKey = "e91481940f2813829e1d71293116b6cb"; // Replace with your real key

const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        // Upload image to ImgBB
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
        });

        const result = await res.json();

        if (result.success) {
        const imageUrl = result.data.url;

        const productData = {
            name: data.name,
            category: data.category,
            quantity: parseInt(data.quantity),
            price: parseFloat(data.price),
            description: data.description,
            image: imageUrl,
        };

        console.log("Uploaded Product:", productData);

        // You can now send `productData` to your backend (Firebase, Express, etc.)

        reset();
        setPreview(null);
        } else {
        console.error("Image upload failed:", result);
        }
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
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
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
          <label className="label">Price (৳)</label>
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

        {/* Description */}
        <div>
          <label className="label">Description</label>
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
