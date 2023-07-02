import axios from "axios";
import { authHeader } from "./authHeader";
import AuthService from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/notes/";

const userId = AuthService.getCurrentUser();
const getNotesByUser = async () => {
  return await axios.get(API_URL + `getNotesByUser/${userId.id}`, {
    headers: authHeader(),
  });
};

const updateNote = async (id, newNote) => {
  try {
    return await axios
      .put(API_URL + `updateNote/${id}`, newNote, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
    } else if (err.request) {
      throw new Error("Server is not responding. Please try again later.");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};

const NoteService = {
  getNotesByUser,
  updateNote,
};

export default NoteService;
