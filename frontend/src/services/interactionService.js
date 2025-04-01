import api from './api';

const INTERACTIONS_URL = '/interactions';

const interactionService = {
  getAllInteractions: async () => {
    const response = await api.get(INTERACTIONS_URL);
    return response.data;
  },

  getInteractionById: async (id) => {
    const response = await api.get(`${INTERACTIONS_URL}/${id}`);
    return response.data;
  },

  createInteraction: async (interactionData) => {
    const response = await api.post(INTERACTIONS_URL, interactionData);
    return response.data;
  },

  updateInteraction: async (id, interactionData) => {
    const response = await api.put(`${INTERACTIONS_URL}/${id}`, interactionData);
    return response.data;
  },

  deleteInteraction: async (id) => {
    const response = await api.delete(`${INTERACTIONS_URL}/${id}`);
    return response.data;
  },

  getInteractionsByCustomerId: async (customerId) => {
    const response = await api.get(`${INTERACTIONS_URL}/customer/${customerId}`);
    return response.data;
  },

  getInteractionsByFollowUpDateRange: async (start, end) => {
    const response = await api.get(`${INTERACTIONS_URL}/follow-up`, {
      params: { start, end },
    });
    return response.data;
  },

  getInteractionsByCreatedBy: async (username) => {
    const response = await api.get(`${INTERACTIONS_URL}/created-by/${username}`);
    return response.data;
  },
};

export default interactionService; 