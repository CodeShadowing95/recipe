import axios from "axios";

const BASE_URL = "http://localhost:3000/recipes";

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const fetchRecipe = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const fetchRecipesByCategory = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addRecipe = async (data) => {
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