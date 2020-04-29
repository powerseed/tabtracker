<template>
  <div id="app">
    <v-app>
      <Header></Header>
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/Header"
import Register from "./components/Register";
import { mdiFormatListBulleted } from '@mdi/js';

export default {
  name: 'App',
  components: {
    Header,
    Register
  },
  props: {
    source: String,
  },
  data(){
    return{
      drawerIcon: mdiFormatListBulleted,
      drawer: null,
    }
  },
};
</script>
