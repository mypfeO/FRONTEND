import axios from 'axios';

export const API_URL = "http://localhost:5157/api/Formulaire";
export const updateFormulaire = async (payload,id) => {
  console.log("Data update payload: ", payload); // Log the payload directly

  try {
    const response = await axios.put(`${API_URL}/updateFormulaire/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error while creating formulaire:', error);
    throw error;
  }
};
export const createFormulaire = async (payload) => {
  console.log("Data submission payload: ", payload); // Log the payload directly

  try {
    const response = await axios.post(`${API_URL}/createFormulaire`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error while creating formulaire:', error);
    throw error;
  }
};
export const getFormsBySiteWebId = async (siteWebId) => {
  try {
    console.log("ELIII ", siteWebId);
    const response = await axios.get(`${API_URL}/getFormsBySiteWebId/${siteWebId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while calling getFormsBySiteWebId API:', error);
    throw error;
  }
};
