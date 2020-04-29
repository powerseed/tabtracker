<template>
  <v-toolbar fixed color="blue darken-3 toolbar" dark>
    <v-toolbar-title class="mr-4">
        TabTracker
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn color="blue darken-3" v-bind:to="{name: 'songs'}">
        Browser
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if='!$store.state.isUserLoggedIn' color="blue darken-3" v-bind:to="{name: 'login'}">
        Login
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn v-if='!$store.state.isUserLoggedIn' color="blue darken-3" v-bind:to="{name: 'register'}">
        Sign up
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items>
      <v-btn v-if='$store.state.isUserLoggedIn' color="blue darken-3" v-on:click="logout" v-bind:to="{name: 'login'}">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mdiFormatListBulleted } from '@mdi/js';

  export default {
    name: 'Header',
    props: {
      source: String,
    },
    data(){
      return{
        drawerIcon: mdiFormatListBulleted,
        drawer: false,
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUser', null);
      }
    }
  };
</script>

<style scoped>
  .v-btn--contained{
    box-shadow: none;
  }

  .title-return-home{
    cursor: pointer;
  }

  .title-return-home:hover{
    color: lightsteelblue;
  }

  .toolbar{
    flex: none;
  }
</style>
