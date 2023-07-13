import { axiosClient } from '../apiClient';

export const getWishList = () => axiosClient.get(`/users/wishlist`);

export const addToWishList = (courseId) => {
  return axiosClient.put(`/users/wishlist/add/${courseId}`);
};

export const removeFromWishList = (courseId) => {
  return axiosClient.put(`/users/wishlist/remove/${courseId}`);
};

export const enrollCourse = (courseId) => {
  return axiosClient.post(`/users/enroll/${courseId}`);
};

export const getMyCourses = () => {
  return axiosClient.get(`/users/mycourses`);
};

export const getAllUsers = (type) => {
  return axiosClient.get(`/users?type=${type}`);
};
