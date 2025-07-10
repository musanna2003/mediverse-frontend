// utils/uploadToImgbb.js
import axios from 'axios';

const uploadToImgbb = async (imageFile) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY; // replace this with your actual key
  const formData = new FormData();
  formData.append("image", imageFile);

  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  try {
    const res = await axios.post(url, formData);
    return res.data.data.url; // returns the uploaded image URL
  } catch (err) {
    console.error("Image upload failed:", err);
    throw err;
  }
};

export default uploadToImgbb;
