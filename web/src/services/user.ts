import api from './api';

export const getUser = async (accessToken: string) => {
  const { data } = await api.get(`/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
    },
  });

  return data;
};
