import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from '../../auth/hooks/useAuth';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await profileService.updateProfile(profileData);
      setProfile(updatedProfile);
      return { success: true, data: updatedProfile };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar el perfil';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
};