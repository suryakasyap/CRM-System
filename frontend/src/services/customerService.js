import api from './api';

const CUSTOMERS_URL = '/customers';

const customerService = {
  getAllCustomers: async () => {
    const response = await api.get(CUSTOMERS_URL);
    return response.data;
  },

  getCustomerById: async (id) => {
    const response = await api.get(`${CUSTOMERS_URL}/${id}`);
    return response.data;
  },

  createCustomer: async (customerData) => {
    const response = await api.post(CUSTOMERS_URL, customerData);
    return response.data;
  },

  updateCustomer: async (id, customerData) => {
    const response = await api.put(`${CUSTOMERS_URL}/${id}`, customerData);
    return response.data;
  },

  deleteCustomer: async (id) => {
    const response = await api.delete(`${CUSTOMERS_URL}/${id}`);
    return response.data;
  },

  getCustomersByStatus: async (status) => {
    const response = await api.get(`${CUSTOMERS_URL}/status/${status}`);
    return response.data;
  },

  getCustomersByCompany: async (company) => {
    const response = await api.get(`${CUSTOMERS_URL}/company/${company}`);
    return response.data;
  },
};

export default customerService; 