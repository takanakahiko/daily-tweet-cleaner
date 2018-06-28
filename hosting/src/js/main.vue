<style>

</style>

<template>
	<div>
    <login></login>
  </div>
</template>

<script>
import Vue from 'vue'

import { firebaseApp } from './firebaseApp.js';
import Login from "./login.vue"

export default {

  components: {
    'login' : Login
  },

  data: () => ({

  }),

  firebase: ()=> {
    return{
      //teams: firebaseApp.database().ref("hoge")
    }
  },

  computed: {

  },

  created: function() {

  },

  methods: {

  }

};
</script>