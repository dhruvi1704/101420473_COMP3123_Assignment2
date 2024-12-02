import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3333/api/v1',
});

// Add Authorization header for authenticated requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User APIs
export const login = (credentials) => API.post('/user/login', credentials);
export const signup = (userData) => API.post('/user/signup', userData);

// Employee APIs
export const fetchEmployees = () => API.get('/emp/employees');
export const fetchEmployeeById = (id) => API.get(`/emp/employees/${id}`);
export const createEmployee = (employeeData) => API.post('/emp/employees', employeeData);
export const updateEmployee = (id, employeeData) => API.put(`/emp/employees/${id}`, employeeData);
export const deleteEmployee = (id) => API.delete(`/emp/employees/${id}`);
