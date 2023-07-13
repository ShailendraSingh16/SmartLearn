import { axiosClient } from '../apiClient';

export const getAllCourses = (query) =>
  axiosClient.get(`/courses?category=${query ? query : ''}`);

export const createCourse = (data) => axiosClient.post(`/courses`, data);

export const updateCourse = (courseId, data) =>
  axiosClient.put(`/courses/${courseId}`, data);

export const deleteCourse = (courseId) =>
  axiosClient.delete(`/courses/${courseId}`);

export const getCourse = (courseId) => axiosClient.get(`/courses/${courseId}`);

export const getCourseByAuthorId = (authorId) => {
  return axiosClient.get(`/courses/author/${authorId}`);
};
