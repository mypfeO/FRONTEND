import axios from 'axios';

export const API_URL = "http://localhost:5027/gateway/auth/api/auth";



export const login = async (username, Password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, Password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Assuming the server returns a JWT token upon successful login
    const token = response.data.token;

    // Store the token in local storage for future use
    localStorage.setItem('jwtToken', token);

    // Optionally, you can return additional data from the server if needed
    return response.data;
  } catch (error) {
    console.error('Error while calling login API:', error);
    throw error;
  }
};
