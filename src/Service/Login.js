import axios from 'axios';
import bcrypt from 'bcryptjs';

export const API_URL = "http://localhost:5027/api/auth";

export const login = async (username, hashedPassword) => {
  try {
    console.log("ELI ", username, hashedPassword);

    // Correctly add query parameters to the URL
    const response = await axios.get(`${API_URL}/login`, {
      params: {
        username,
        password: hashedPassword // Update 'Password' to 'password' to match the parameter name
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response.data;
  } catch (error) {
    console.error('Error while calling login API:', error);
    throw error;
  }
};
export const register = async (username, password, role) => {
  try {
    const fixedSalt = '$2a$10$CwTycUXWue0Thq9StjUM0u'; // A fixed salt for demonstration purposes
    const hashedPassword = bcrypt.hashSync(password, fixedSalt);

    const response = await axios.post(`${API_URL}/register`, {
      username,
      password: hashedPassword,
      role
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Extract the message from the backend error response
      const backendError = error.response.data;
      throw new Error(backendError.message || 'An unexpected error occurred.');
    } else {
      console.error('Error while calling register API:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};
