import axios from "axios";

const BASE_URL = "http://localhost:3000/categories";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addCategory = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}