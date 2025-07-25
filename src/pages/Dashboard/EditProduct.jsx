import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import uploadToCloudinary from '../../services/uploadToCloudinary';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLoaderData, useNavigate } from 'react-router';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const categories = ['Pain Relief', 'Antibiotics', 'Vitamins', 'First Aid', 'Diabetes Care', 'Heart Care'];
const companies = ['Square', 'Beximco', 'ACI', 'Renata', 'Incepta', 'ACME'];
const units = ['mg', 'ml'];

const EditProduct = () => {
    const product = useLoaderData();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(product?.image || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
        // Set default values for form fields
        setValue('name', product.name);
        setValue('genericName', product.genericName);
        setValue('category', product.category);
        setValue('company', product.company);
        setValue('quantity', product.quantity);
        setValue('unit', product.unit);
        setValue('price', product.price);
        setValue('discount', product.discount || 0);
        setValue('description', product.description);
        }
    }, [product, setValue]);

    const onSubmit = async (data) => {
        try {
            let imageUrl = product.image;

            if (data.image?.length > 0) {
                imageUrl = await uploadToCloudinary(data.image[0]);
            }

            const updatedProduct = {
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
                uploadDate: new Date().toISOString(),
            };

            const res = await axiosSecure.patch(`http://localhost:3000/products/${product._id}`, updatedProduct);

            if (res.data?.modifiedCount > 0) {
                toast.success("Product updated successfully!");
                navigate('/dashboard/manage-medicines'); // 🧭 Redirect to product list page
                reset();
            } else {
                toast.error("Failed to update product.");
            }

        } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Something went wrong.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Product Name */}
            <div>
            <label className="label">Product Name</label>
            <input className="input input-bordered w-full" {...register('name', { required: true })} />
            {errors.name && <p className="text-red-500 text-sm">Product name is required</p>}
            </div>

            {/* Generic Name */}
            <div>
            <label className="label">Generic Name</label>
            <input className="input input-bordered w-full" {...register('genericName', { required: true })} />
            {errors.genericName && <p className="text-red-500 text-sm">Generic name is required</p>}
            </div>

            {/* Image */}
            <div>
            <label className="label">Change Image (Optional)</label>
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full"
                {...register('image')} onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
            {preview && <img src={preview} className="mt-2 h-24 rounded" alt="Preview" />}
            </div>

            {/* Category */}
            <div>
            <label className="label">Category</label>
            <select className="select select-bordered w-full" {...register('category', { required: true })}>
                <option disabled>Select category</option>
                {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
            </div>

            {/* Company */}
            <div>
            <label className="label">Company</label>
            <select className="select select-bordered w-full" {...register('company', { required: true })}>
                <option disabled>Select company</option>
                {companies.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            {errors.company && <p className="text-red-500 text-sm">Company is required</p>}
            </div>

            {/* Unit */}
            <div>
            <label className="label">Unit</label>
            <select className="select select-bordered w-full" {...register('unit', { required: true })}>
                <option disabled>Select unit</option>
                {units.map((u, i) => <option key={i} value={u}>{u}</option>)}
            </select>
            {errors.unit && <p className="text-red-500 text-sm">Unit is required</p>}
            </div>

            {/* Quantity */}
            <div>
            <label className="label">Quantity</label>
            <input type="number" className="input input-bordered w-full"
                {...register('quantity', { required: true, min: 1 })} />
            {errors.quantity && <p className="text-red-500 text-sm">Enter valid quantity</p>}
            </div>

            {/* Price */}
            <div>
            <label className="label">Price (৳)</label>
            <input type="number" step="0.01" className="input input-bordered w-full"
                {...register('price', { required: true, min: 0.01 })} />
            {errors.price && <p className="text-red-500 text-sm">Enter valid price</p>}
            </div>

            {/* Discount */}
            <div>
            <label className="label">Discount (%)</label>
            <input type="number" step="0.01" className="input input-bordered w-full"
                {...register('discount', { min: 0, max: 100 })} />
            {errors.discount && <p className="text-red-500 text-sm">0% - 100% only</p>}
            </div>

            {/* Description */}
            <div>
            <label className="label">Description</label>
            <textarea rows={3} className="textarea textarea-bordered w-full"
                {...register('description', { required: true })}></textarea>
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
            </div>

            {/* Submit */}
            <div className="text-right">
            <button type="submit" className="btn btn-primary">Update Product</button>
            </div>
        </form>
        </div>
    );
};

export default EditProduct;
