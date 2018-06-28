<style>
.box-card {
  margin-top:50px;
}
</style>

<template>
	<div>
    <el-row>
      <el-col :span="12" :offset="6" :xs="{span:24, offset:0}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">ようこそ</div>
          <p>このサービスを使用するためにはTwitter連携が必要です．</p>
          <login></login>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="6" :xs="{span:24, offset:0}">
        <el-card class="box-card">
          <config-form></config-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'

import { firebaseApp } from './firebaseApp.js';
import Login from "./login.vue"
import ConfigForm from "./configForm.vue"

export default {

  components: {
    'login' : Login,
    'config-form': ConfigForm
  },

  data: () => ({
    dialogFormVisible:true
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