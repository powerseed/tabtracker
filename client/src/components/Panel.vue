<template>
  <div class="white elevation-2">
    <v-toolbar
      color="blue darken-3"
      dark
      dense
    >
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="search"></slot>
      <v-spacer></v-spacer>
      <slot name="action"></slot>
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Panel",
      props:{
          title: ''
      }
    }
</script>

<style scoped>

</style>
