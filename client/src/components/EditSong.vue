<template>
  <v-layout>
    <v-flex xs4>
      <Panel title="Song Material">
        <v-text-field
          label="Title"
          :rules="[required]"
          required
          v-model="song.title"
        />
        <v-text-field
          label="Artist"
          :rules="[required]"
          required
          v-model="song.artist"
        />
        <v-text-field
          label="Genre"
          :rules="[required]"
          required
          v-model="song.genre"
        />
        <v-text-field
          label="Album"
          :rules="[required]"
          required
          v-model="song.album"
        />
        <v-text-field
          label="Album Image"
          :rules="[required]"
          required
          v-model="song.albumImage"
        />
        <v-text-field
          label="Youtube Id"
          :rules="[required]"
          required
          v-model="song.youtubeId"
        />
      </Panel>
    </v-flex>

    <v-flex xs8 class="ml-4 text-center">
      <Panel title="Song Structure">
        <v-textarea
          label="Tab"
          :rules="[required]"
          required
          v-model="song.tab"
        />
        <v-textarea
          label="Lyrics"
          :rules="[required]"
          required
          v-model="song.lyrics"
        />
      </Panel>

      <div v-if="this.error" class="mt-2">
        {{error}}
      </div>
      <v-btn class="mt-4" color="primary" v-on:click="save">Save</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import Panel from "./Panel";
  import api from "../services/api";
  export default {
    name: "EditSong",
    components:{
      Panel
    },
    data(){
      return {
        error: '',
        song: {},
        required(value){
          if (!!value) {
            return true;
          }
          else {
            return 'required'
          }
        }
      }
    },
    methods:{
      async save(){
        for(var property in this.song){
          if(!this.song[property]){
            this.error = 'Please fill all the required fields. '
            return
          }
        }
        const response = await api.editSongs(this.song.id, this.song);
        this.$router.push({name: 'viewSong', params: {songId: this.song.id}})
      }
    },
    async mounted() {
      const songId = this.$store.state.route.params.songId;
      this.song = (await api.getASong(songId)).data;
    }
  }
</script>

<style scoped>

</style>
