import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;