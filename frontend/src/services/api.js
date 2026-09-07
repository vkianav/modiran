import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Consultants
export const getConsultants = (params = {}) =>
  api.get("consultants/", { params });

export const getConsultant = (id) =>
  api.get(`consultants/${id}/`);
// get consultant services
export const getConsultantServices = (consultantId) =>
  api.get(`consultants/${consultantId}/services/`);

// Services
export const getServices = () =>
  api.get("services/");

export const getService = (id) =>
  api.get(`services/${id}/`);
//Consultation Requests
export const getConsultationChoices = () =>
  api.get("consultation-requests/choices/");


// Events
export const getEvents = () =>
  api.get("events/");

export const getEvent = (id) =>
  api.get(`events/${id}/`);


// Consultation Requests
export const createConsultationRequest = (data) =>
  api.post("consultation-requests/", data);


export default api;