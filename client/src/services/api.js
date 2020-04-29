const axios = require('axios')

const URL = "http://localhost:8081/"

export default {
  register(credentials) {
    return axios.post(URL + "register", credentials);
  },
  login(credentials) {
    return axios.post(URL + "login", credentials);
  },
  getSongs(search){
    return axios.get(URL + "songs", {
      params:{
        search: search
      }
    });
  },
  createSongs(song){
    return axios.post(URL + "songs", song);
  },
  editSongs(songId, song){
    return axios.put(URL + "edit/" + songId, song);
  },
  getASong(songId){
    return axios.get(`${URL}songs/${songId}`);
  },
  getABookmark(userId, songId){
    return axios.get(`${URL}bookmark`, {
      params:{
        userId: userId,
        songId: songId
      }
    });
  },
  getAllBookmarks(userId){
    return axios.get(`${URL}allBookmarks`, {
      params:{
        userId: userId,
      }
    });
  },
  createABookmark(userId, songId){
    return axios.post(`${URL}bookmark`, {
        userId: userId,
        songId: songId
    });
  },
  deleteABookmark(userId, songId){
    return axios.delete(`${URL}bookmark`, {
      params:{
        userId: userId,
        songId: songId
      }
    });
  }
}
