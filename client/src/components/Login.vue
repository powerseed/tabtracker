<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  name="Email"
                  type="email"
                  v-model="email"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  v-model="password"
                />

                <div v-html="error"></div>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" v-on:click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import {mdiAccount, mdiFormatListBulleted} from '@mdi/js';
  import Header from "./Header";
  import api from "../services/api";
  import authentication from "../authentication";

  export default {
    name: 'Login',
    components: {
      Header
    },
    data() {
      return {
        loginIcon: mdiAccount,
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      async login() {
        var resultOfAuthentication = authentication({
          email: this.email,
          password: this.password
        });

        // if there is an error
        if(resultOfAuthentication != null){
          this.error = resultOfAuthentication.message;
        }
        else{
          try {
            const response = await api.login({
              email: this.email,
              password: this.password
            })
            this.error = response;

            this.$store.dispatch('setToken', response.data.token);
            this.$store.dispatch('setUser', response.data.user);

            this.$router.push({
              name: "songs"
            })
          } catch (e) {
            this.error = e.response.data
          }
        }
      }
    }
  }
</script>

<style scoped>
  .v-btn--contained{
    box-shadow: none;
  }
</style>
