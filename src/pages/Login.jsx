import React from 'react';
import useAuth from '../Context/useAuth';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {

    const { signInUser , googleSignIn,bk } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const errorTost = (msg) =>{toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });} 
  

    const handelSignIn = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInUser(email,password)
        .then(() => {
            toast.success("login successful!");
            navigate( location?.state || "/");
            // Signed in 
            // const user = userCredential.user;
           
          })
        .catch((error) => {
        let message = "";
        if (error.code === "auth/user-not-found") {
            message = "User not found. Please register first.";
        } else if (error.code === "auth/invalid-credential") {
            message = "Incorrect password. Please try again.";
        } else {
            message = "Login failed. " + error.message;
        }
        errorTost(message); // Use the same message directly
        });
    }

    const handelGoogle = () =>{
        alert(bk)
        googleSignIn()
        .then((res) => {
            console.log(res)
            toast.success("Registration successful!");
            navigate( location?.state || "/");

        })
        .catch((error) => {
            console.log(error)
            let message = "";

            if (error.code === "auth/popup-closed-by-user") {
                message = "Popup closed before signing in.";
            } else if (error.code === "auth/cancelled-popup-request") {
                message = "Popup request was cancelled.";
            } else if (error.code === "auth/popup-blocked") {
                message = "Popup was blocked by the browser.";
            } else if (error.code === "auth/network-request-failed") {
                message = "Network error. Please check your internet connection.";
            } else {
                message = "Google sign-in failed. " + error.message;
            }
            errorTost(message);
          });
    }

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handelSignIn} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Social Login (Optional) */}
        <button onClick={handelGoogle} className="btn w-full bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
        </button>

        {/* Bottom link */}
        <p className="text-center text-sm mt-4">
          New here? <a href="/register" className="link link-primary">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;