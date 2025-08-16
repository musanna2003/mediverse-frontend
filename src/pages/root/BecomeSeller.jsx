import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Context/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
// import uploadToCloudinary from '../../services/uploadToCloudinary';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const BecomeSeller = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
    //   const nidFrontFile = data.nidFront[0];
    //   const nidBackFile = data.nidBack[0];
    //   const tradeLicenseFile = data.tradeLicense[0];

    //   // Upload images to imgbb (but do not store in DB)
    //   await Promise.all([
    //     uploadToCloudinary(nidFrontFile)  ,
    //     uploadToCloudinary(nidBackFile),
    //     uploadToCloudinary(tradeLicenseFile),
    //   ]);

      const sellerData = {
        name: user.displayName || "N/A",
        email: user.email,
        phone: data.phone,
        storeName: data.storeName,
        nidNumber: data.nidNumber,
        licenseNumber: data.licenseNumber,
        address: data.address,
        state: 'pending',
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post('https://ph-assignment-12-backend.vercel.app/sellers', sellerData);
      if (res.data.insertedId) {
        toast.success("Seller application submitted!");
        reset();
      } else {
        toast.error("Submission failed.");
      }

    } catch (err) {
      console.error("Form submission failed:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded">
      <h2 className="text-3xl font-bold mb-6 text-center">Become a Verified Seller</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Display name */}
        <div className="md:col-span-2">
          <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
        </div>

        {/* Display email */}
        <div className="md:col-span-2">
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* Store Name */}
        <div className="md:col-span-2">
          <label className="label">Store/Pharmacy Name</label>
          <input type="text" {...register("storeName", { required: true })} className="input input-bordered w-full" />
          {errors.storeName && <p className="text-error text-sm">Store name is required</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <input type="tel" {...register("phone", { required: true })} className="input input-bordered w-full" />
          {errors.phone && <p className="text-error text-sm">Phone is required</p>}
        </div>

        {/* NID Number */}
        <div>
          <label className="label">NID Number</label>
          <input type="text" {...register("nidNumber", { required: true })} className="input input-bordered w-full" />
          {errors.nidNumber && <p className="text-error text-sm">NID number is required</p>}
        </div>

        {/* Trade License Number */}
        <div>
          <label className="label">Trade License Number</label>
          <input type="text" {...register("licenseNumber", { required: true })} className="input input-bordered w-full" />
          {errors.licenseNumber && <p className="text-error text-sm">License number is required</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="label">Pharmacy Address</label>
          <textarea {...register("address", { required: true })} className="textarea textarea-bordered w-full"></textarea>
          {errors.address && <p className="text-error text-sm">Address is required</p>}
        </div>

        {/* NID and License Uploads (not stored in DB) */}
        <div>
          <label className="label">Upload NID (Front)</label>
          <input type="file" {...register("nidFront", { required: false })} className="file-input file-input-bordered w-full" />
        </div>

        <div>
          <label className="label">Upload NID (Back)</label>
          <input type="file" {...register("nidBack", { required: false })} className="file-input file-input-bordered w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="label">Upload Trade License</label>
          <input type="file" {...register("tradeLicense", { required: false })} className="file-input file-input-bordered w-full" />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">Submit Application</button>
        </div>
      </form>
    </div>
  );
};

export default BecomeSeller;

