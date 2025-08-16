// hooks/useUpdateUser.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUserData) => {
      const res = await axios.put('https://ph-assignment-12-backend.vercel.app/users/update', updatedUserData);
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.modifiedCount > 0) {
        toast.success('Profile updated!');
        // Optional: Invalidate cached profile data if you're caching it
        queryClient.invalidateQueries(['user', variables.email]);
      } else {
        toast.info('No changes were made.');
      }
    },
    onError: (err) => {
      console.error("Update error:", err);
      toast.error("Failed to update user");
    }
  });
};

export default useUpdateUser;