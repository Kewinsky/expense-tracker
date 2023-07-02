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

const addNote = async (note) => {
  try {
    return await axios.post(API_URL + "addNote", note, {
      headers: authHeader(),
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

const updateNote = async (id, newNote) => {
  try {
    return await axios.put(API_URL + `updateNote/${id}`, newNote, {
      headers: authHeader(),
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
  addNote,
  updateNote,
};

export default NoteService;
