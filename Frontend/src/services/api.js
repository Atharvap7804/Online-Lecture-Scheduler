import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// For Admin
export const fetchAllInstructors = () => API.get('/admin/instructors');
export const addInstructor = (data) => API.post('/admin/instructors', data);

export const fetchAllCourses = () => API.get('/admin/courses');
export const addCourse = (data) => API.post('/admin/courses', data);

export const assignLecture = (data) => API.post('/admin/schedules', data);

//For Instructor
export const fetchInstructorSchedules = (instructorId) => API.get(`/instructor/schedules/${instructorId}`);