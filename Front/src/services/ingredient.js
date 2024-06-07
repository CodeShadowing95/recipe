import axios from "axios";

const BASE_URL = "http://localhost:3000/ingredients";

export const addIngredient = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}`, { name: data }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addIngredientsToRecipe = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/recipe`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getIngredientsByRecipe = async (idRecipe) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipe/${idRecipe}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}