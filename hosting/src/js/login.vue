<style>

</style>


<template>
    <div style="display: inline-block">
        <el-button v-on:click="login"  type="primary" round>ログイン</el-button>
        <!--<el-button v-on:click="logout" type="primary" round>サインアウト</el-button>
        <el-button v-on:click="switchLoginState" type="primary" round>切り替え</el-button>
        <span>{{ isAuth ? "ログイン中" : "ログインしていません"}}</span>-->
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import { firebaseApp } from './firebaseApp.js';

export default {
    data:()=>({
        user:null
    }),
    computed:{
        isAuth:function(){return this.user!==null}
    },
    methods:{
        switchLoginState(){
            if( this.isAuth ) this.logout();
            else this.login();
        },
        login(){
            let provider = new firebase.auth.TwitterAuthProvider();
	        firebaseApp.auth().signInWithPopup(provider).then(ret=>{
                firebaseApp.database().ref('credencials/' + ret.user.uid).set({
                    accessToken: ret.credential.accessToken,
                    secret: ret.credential.secret
                });
            });
        },
        logout(){
            firebaseApp.auth().signOut();
        }
    },
    created: function() {
        firebaseApp.auth().onAuthStateChanged((user)=>{
            this.$data.user=user;
        });
    }
}
</script>
