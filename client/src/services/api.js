const axios = require('axios')

const URL = ""

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
      },
      headers: {
        'Content-Type': 'application/json'
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
    return axios.get(`${URL}songs/${songId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getABookmark(userId, songId){
    return axios.get(`${URL}bookmark`, {
      params:{
        userId: userId,
        songId: songId
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  getAllBookmarks(userId){
    return axios.get(`${URL}allBookmarks`, {
      params:{
        userId: userId,
      },
      headers: {
        'Content-Type': 'application/json'
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
