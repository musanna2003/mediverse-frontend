import axios from 'axios';

const uploadToCloudinary = async (imageFile) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const res = await axios.post(url, formData);
    return res.data.secure_url; // ✅ returns the hosted image URL
  } catch (err) {
    console.error("Cloudinary image upload failed:", err);
    throw err;
  }
};

export default uploadToCloudinary;
