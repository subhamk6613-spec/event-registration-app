import api from '../api';

export const registrationService = {
  registerForEvent: (eventId, formData) => api.post(`/events/${eventId}/register`, formData),
  getEventRegistrations: (eventId) => api.get(`/events/${eventId}/registrations`),
};
