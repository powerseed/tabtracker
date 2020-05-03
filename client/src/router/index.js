import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from "@/components/Login";
import App from "../App";
import Songs from "../components/Songs";
import CreateSong from "../components/CreateSong";
import ViewSong from "../components/ViewSong";
import EditSong from "../components/EditSong";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/createSong',
      name: 'createSong',
      component: CreateSong
    },
    {
      path: '/song/:songId',
      name: 'viewSong',
      component: ViewSong
    },
    {
      path: '/edit/:songId',
      name: 'editSong',
      component: EditSong
    }
  ]
})
