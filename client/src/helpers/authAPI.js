import axios from "axios";
import { AUTH_API_URI } from "@/routes/route-api";
export const isUniqueUsername = async (username) => {
  try {
    const response = await axios.get(AUTH_API_URI.CHECK_USERNAME(username));
    return response.data.status; // Ensure this returns a boolean
  } catch (error) {
    return error;
  }
};

export const registerUser = async (userData) => {
  const data = JSON.stringify({
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: AUTH_API_URI.REGISTER_USER,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const verifyOTP = async (email, code) => {
  let data = JSON.stringify({
    email: email,
    code: code,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: AUTH_API_URI.VERIFY_OTP,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const validateToken = async (token) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: AUTH_API_URI.VALIDATE_TOKEN,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};
