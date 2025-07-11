import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../Context/useAuth';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import uploadToCloudinary from '../services/uploadToCloudinary';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [editField, setEditField] = useState('');
  const [editedValue, setEditedValue] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // For photo preview
  const [selectedFile, setSelectedFile] = useState(null); // For photo file

  // Fetch user info (same as before)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users/profile', {
            params: { email: user.email },
        });
        setUserData(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (user?.email) {
      fetchUser();
    }
  }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleUpdate = async () => {
        document.getElementById('edit-modal').close();

        try {
            let updated = { ...userData };

            if (editField === 'photoURL' && selectedFile) {
            const imageUrl = await uploadToCloudinary(selectedFile);

            if (!imageUrl) {
                toast.error("Image upload failed");
                return;
            }

            updated.photoURL = imageUrl;
            } else {
            updated[editField] = editedValue;
            }

            const res = await axios.put('http://localhost:3000/users/update', updated);

            if (res.data?.modifiedCount > 0) {
            toast.success('Profile updated!');
            setUserData(updated);
            setEditField('');
            setSelectedFile(null);
            setPreviewImage(null);
            } else {
            toast.warn('No changes made.');
            }
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update!');
        }
    };


  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-4">
        {/* Editable Profile Image */}
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img
              src={userData.photoURL}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setEditField('photoURL');
              setEditedValue('');
              setSelectedFile(null);
              setPreviewImage(null);
              document.getElementById('edit-modal').showModal();
            }}
          >
            <FaEdit />
          </button>
        </div>

        {/* Name */}
        <div className="flex justify-between items-center">
          <div>
            <strong>Name:</strong> {userData.name}
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setEditField('name');
              setEditedValue(userData.name);
              document.getElementById('edit-modal').showModal();
            }}
          >
            <FaEdit />
          </button>
        </div>

        {/* Email (not editable) */}
        <div className="flex justify-between items-center">
          <div>
            <strong>Email:</strong> {userData.email}
          </div>
        </div>

        {/* Phone */}
        <div className="flex justify-between items-center">
          <div>
            <strong>Phone:</strong> {userData.phone || 'N/A'}
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setEditField('phone');
              setEditedValue(userData.phone || '');
              document.getElementById('edit-modal').showModal();
            }}
          >
            <FaEdit />
          </button>
        </div>

        {/* Address */}
        <div className="flex justify-between items-center">
          <div>
            <strong>Address:</strong> {userData.address || 'N/A'}
          </div>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => {
              setEditField('address');
              setEditedValue(userData.address || '');
              document.getElementById('edit-modal').showModal();
            }}
          >
            <FaEdit />
          </button>
        </div>

        {/* Role */}
        <div className="flex justify-between items-center">
          <div>
            <strong>Role:</strong> {userData.role}
          </div>
        </div>
      </div>

      {/* 🔧 Edit Modal */}
      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit {editField}</h3>

          {editField === 'photoURL' ? (
            <>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full mb-4"
                onChange={handleFileChange}
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-24 h-24 rounded mb-4 object-cover" />
              )}
            </>
          ) : (
            <input
              type="text"
              className="input input-bordered w-full mb-4"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          )}

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-sm" type="submit">
                Cancel
              </button>
              <button className="btn btn-sm btn-primary" type="button" onClick={handleUpdate}>
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
