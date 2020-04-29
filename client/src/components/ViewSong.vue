<template>
  <div>
    <v-layout class="mb-4">
      <v-flex xs6 class="mr-4">
        <Panel title="Songs Metadata">
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
              <v-btn class="primary" v-bind:to=" {name: 'editSong', params: {songId: song.id}} ">Edit</v-btn>
              <v-btn class="primary" v-if="this.$store.state.isUserLoggedIn && !this.isBookMarked" v-on:click="bookmark">Bookmark</v-btn>
              <v-btn class="primary" v-if="this.$store.state.isUserLoggedIn && this.isBookMarked" v-on:click="unbookmark">Unbookmark</v-btn>
            </v-flex>

            <v-flex xs6>
              <img class="album-image" :src="song.albumImage">
            </v-flex>
          </v-layout>
        </Panel>
      </v-flex>

      <v-flex xs6>
        <Panel title="Youtube video" class="text-center">
          <youtube :video-id="song.youtubeId"></youtube>
        </Panel>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs6>
        <Panel title="Tab" class="mr-4">
          <textarea readonly cols="86" rows="15">{{ song.tab }}</textarea>
        </Panel>
      </v-flex>

      <v-flex xs6>
        <Panel title="Lyrics">
          <textarea readonly cols="87" rows="15">{{ song.lyrics }}</textarea>
        </Panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import api from "../services/api";
  import Panel from "./Panel";
    export default {
      name: "ViewSong",
      components:{
        Panel
      },
      data(){
        return{
          song: {},
          isBookMarked: false
        }
      },
      methods:{
        async bookmark(){
          await api.createABookmark(this.$store.state.user.id, this.song.id);
          this.isBookMarked = true;
        },
        async unbookmark(){
          const result = await api.deleteABookmark(this.$store.state.user.id, this.song.id);
          this.isBookMarked = false;
        }
      },
      async mounted() {
        const songId = this.$store.state.route.params.songId;
        this.song = (await api.getASong(songId)).data;
        if(this.$store.state.isUserLoggedIn){
          const bookmark = (await api.getABookmark(this.$store.state.user.id, this.song.id)).data;
          this.isBookMarked = !!(bookmark);
        }
      }
    }
</script>

<style scoped>
  .album-image{
    width: 100%;
  }
</style>
