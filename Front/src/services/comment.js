import axios from "axios";

const BASE_URL = "http://localhost:3000/comments";

export const fetchCommentsByRecipe = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/recipe/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const addComment = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}`, data, {
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