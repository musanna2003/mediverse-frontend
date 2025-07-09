import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../Context/useAuth';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router';

const Register = () => {
    const imgbbApiKey = "e91481940f2813829e1d71293116b6cb"; 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const { createUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
        // Upload image to ImgBB
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, formData);
        const imageUrl = res.data?.data?.url;

        if (!imageUrl) throw new Error("Image upload failed");

        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            photoURL: imageUrl,
        };

        console.log("User Registered:", userData);

        // TODO: send this userData to your backend or Firebase Auth
        createUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                updateProfile(user, {
                    displayName: data.name,
                    photoURL: imageUrl
                }).then(() => {
                    toast.success("Registration successful!");
                    navigate(location?.state || "/");
                }).catch((error) => {
                    console.error("Profile update error:", error);
                    toast.error("Failed to update profile.");
                });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === "auth/email-already-in-use") {
                    toast.error("Email already in use. Try logging in.");
                } else if (error.code === "auth/invalid-email") {
                    toast.error("Invalid email address.");
                } else {
                    toast.error("Registration failed. " + error.message);
                }
            });
        reset();
        } catch (err) {
        console.error("Registration Error:", err.message);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <label className="label"><span className="label-text">Full Name</span></label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="label"><span className="label-text">Photo</span></label>
            <input
              type="file"
              accept="image/*"
              {...register('photo', { required: 'Photo is required' })}
              className="file-input file-input-bordered w-full"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'At least 6 characters required' }
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>

         {/* Divider */}
        <div className="divider">OR</div>

        {/* Social Login (Optional) */}
        <button className="btn w-full bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Register with Google
        </button>

        {/* Bottom Link */}
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="link link-primary">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;