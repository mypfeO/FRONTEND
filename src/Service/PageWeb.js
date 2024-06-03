import axios from 'axios';

export const API_URL = "http://localhost:5157/api/PageWeb";

export const getPagesByAdmin = async (Admin) => {
    try {
        const response = await axios.get(`${API_URL}/by-user/${Admin}`, {
            headers: {                           
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Ensure the token is securely managed
            },
        });

        // Returns the data received from the server, typically an array or object
        return response.data;
    } catch (error) {
        console.error('Error while calling getPagesByAdmin API:', error);
        throw error;
    }
};


export const createPage = async (newPage) => {
    try {
        const response = await axios.post(`${API_URL}/createWebPage`, newPage, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error while calling createPage API:', error);
        throw error;
    }
};
export const updatePage = async ( updatedPage) => {
  try {
    const response = await axios.put(`${API_URL}/updateWebPage`, updatedPage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while calling updatePage API:', error);
    throw error;
  }
};
export const deletePage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error while calling deletePage API:', error);
    throw error;
  }
};