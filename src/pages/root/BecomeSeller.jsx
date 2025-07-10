import React from 'react';
import { useForm } from 'react-hook-form';
import uploadToImgbb from '../../services/uploadToImgbb';

const BecomeSeller = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
    try {
        const nidFrontFile = data.nidFront[0];
        const nidBackFile = data.nidBack[0];
        const tradeLicenseFile = data.tradeLicense[0];

        // Upload files to imgbb
        const [nidFrontURL, nidBackURL, licenseURL] = await Promise.all([
        uploadToImgbb(nidFrontFile),
        uploadToImgbb(nidBackFile),
        uploadToImgbb(tradeLicenseFile)
        ]);

        // Combine form data with uploaded URLs
        const sellerData = {
        ...data,
        nidFront: nidFrontURL,
        nidBack: nidBackURL,
        tradeLicense: licenseURL
        };

        console.log("Final seller data:", sellerData);

        // ✅ TODO: Send `sellerData` to backend / Firestore

        reset();
    } catch (error) {
        console.error("Form submission failed:", error);
        // Show toast error
    }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded">
        <h2 className="text-3xl font-bold mb-6 text-center">Become a Verified Seller</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name */}
            <div>
            <label className="label">Full Name</label>
            <input type="text" {...register("fullName", { required: true })} className="input input-bordered w-full" />
            {errors.fullName && <p className="text-error text-sm mt-1">Full Name is required</p>}
            </div>

            {/* Email */}
            <div>
            <label className="label">Email</label>
            <input type="email" {...register("email", { required: true })} className="input input-bordered w-full" />
            {errors.email && <p className="text-error text-sm mt-1">Email is required</p>}
            </div>

            {/* Phone */}
            <div>
            <label className="label">Phone Number</label>
            <input type="tel" {...register("phone", { required: true })} className="input input-bordered w-full" />
            {errors.phone && <p className="text-error text-sm mt-1">Phone number is required</p>}
            </div>

            {/* Store Name */}
            <div>
            <label className="label">Store/Pharmacy Name</label>
            <input type="text" {...register("storeName", { required: true })} className="input input-bordered w-full" />
            </div>

            {/* NID Number */}
            <div>
            <label className="label">NID Number</label>
            <input type="text" {...register("nidNumber", { required: true })} className="input input-bordered w-full" />
            </div>

            {/* Trade License Number */}
            <div>
            <label className="label">Trade License Number</label>
            <input type="text" {...register("licenseNumber", { required: true })} className="input input-bordered w-full" />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
            <label className="label">Pharmacy Address</label>
            <textarea {...register("address", { required: true })} className="textarea textarea-bordered w-full"></textarea>
            </div>

            {/* NID Upload */}
            <div>
            <label className="label">Upload NID (Front)</label>
            <input type="file" {...register("nidFront", { required: true })} className="file-input file-input-bordered w-full" />
            </div>

            <div>
            <label className="label">Upload NID (Back)</label>
            <input type="file" {...register("nidBack", { required: true })} className="file-input file-input-bordered w-full" />
            </div>

            {/* License Upload */}
            <div className="md:col-span-2">
            <label className="label">Upload Trade License</label>
            <input type="file" {...register("tradeLicense", { required: true })} className="file-input file-input-bordered w-full" />
            </div>

            {/* Password */}
            <div>
            <label className="label">Password</label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input input-bordered w-full" />
            </div>

            <div>
            <label className="label">Confirm Password</label>
            <input type="password" {...register("confirmPassword", { required: true })} className="input input-bordered w-full" />
            </div>

            {/* Agreement */}
            <div className="md:col-span-2">
            <label className="flex items-center space-x-2">
                <input type="checkbox" {...register("agreement", { required: true })} className="checkbox" />
                <span className="label-text">I agree to the terms and conditions.</span>
            </label>
            {errors.agreement && <p className="text-error text-sm mt-1">You must agree before submitting.</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
            <button type="submit" className="btn btn-primary w-full">Submit Application</button>
            </div>
        </form>
        </div>
    );
};

export default BecomeSeller;
