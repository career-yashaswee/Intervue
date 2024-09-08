import axios from "axios";
import { RESUME_API_URI } from "@/routes/route-api";

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", localStorage.getItem("_id"));
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: RESUME_API_URI.UPLOAD,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: formData,
    };
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const uploadResumeOnboarding = async (file, gsession) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("gsession", gsession);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: RESUME_API_URI.GUEST_UPLOAD,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const listResume = async (_id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: RESUME_API_URI.LIST(_id),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const downloadResume = async (fileName) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: RESUME_API_URI.DOWNLOAD(fileName),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};
