<template>
  <v-layout>
    <v-flex xs4
            v-if="this.$store.state.isUserLoggedIn">
      <Panel title="Bookmarks" class="mb-4">
        <v-data-table
          :headers="headers"
          :items="bookmarks"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.action="item">
            <v-btn class="primary" small v-bind:to="{name: 'viewSong', params:{
            songId: item.item.id
            }}">View</v-btn>
          </template>
        </v-data-table>
      </Panel>
    </v-flex>

    <v-flex v-bind:class="{
      xs8: this.$store.state.isUserLoggedIn,
      xs12: !this.$store.state.isUserLoggedIn,
    }"
            class="ml-4">
      <Panel title="Songs">
        <v-text-field slot="search" class="ml-4" v-model="search"
          hide-details
          prepend-icon="search"
        ></v-text-field>

        <v-btn slot="action" fab small class="cyan" v-bind:to="{name: 'createSong'}">
          <v-icon>add</v-icon>
        </v-btn>

        <div v-for="song in songs" v-bind:key="song.id" class="mt-4">
          <v-layout class="text-center">
            <v-flex xs6>
              <div class="title">
                {{song.title}}
              </div>
              <div class="artist">
                {{song.artist}}
              </div>
              <div class="album">
                {{song.album}}
              </div>
              <br>
              <v-btn class="primary" v-bind:to="{name: 'viewSong', params: {songId: song.id}}">View</v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImage">
            </v-flex>
          </v-layout>
        </div>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
  import Panel from "./Panel";
  import api from "../services/api";
    export default {
      name: "Songs",
      components:{
          Panel
      },
      data(){
        return{
          songs: {},
          search: '',
          headers: [
            { text: 'Title', value: 'title' },
            { text: 'Artist', value: 'artist' },
            { text: 'Album', value: 'album' },
            { text: '', value: 'action' }
          ],
          bookmarks: [],
        }
      },
      async mounted() {
        const response = (await api.getSongs(this.search))
        this.songs = response.data;

        if(this.$store.state.isUserLoggedIn) {
          const response = await api.getAllBookmarks(this.$store.state.user.id);
          const bookmarksOfThisUser = response.data;

          if (Array.isArray(bookmarksOfThisUser)) {
            for (var bookmark in bookmarksOfThisUser) {
              const song = (await api.getASong(bookmarksOfThisUser[bookmark]['songId'])).data;
              this.bookmarks.push(song)
            }
          } else {
            console.log({response})
            console.log({bookmarksOfThisUser})
          }
        }
      },
      watch:{
        search(){
          const route = {
            name: 'songs'
          }
          route.query = {
            search: this.search
          }
          this.$router.push(route)
        },
        "$route.query.search":{
          immediate: true,
          async handler(value){
            this.search = value
            this.songs = (await api.getSongs(this.search)).data;
          }
        }
      }
    }
</script>

<style scoped>
  .album-image{
    width: 35%;
  }

  tr{
    cursor: pointer;
  }
</style>
