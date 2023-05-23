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

const addNote = (note) => {
  return axios.post(API_URL + "addNote", note, { headers: authHeader() });
};

const updateNote = (id, newNote) => {
  return axios.put(API_URL + `updateNote/${id}`, newNote, {
    headers: authHeader(),
  });
};

const NoteService = {
  getNotesByUser,
  addNote,
  updateNote,
};

export default NoteService;
