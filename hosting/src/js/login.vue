<style>
.square_btn{
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    background: #668ad8;/*ボタン色*/
    color: #FFF;
    border-bottom: solid 4px #627295;
    border-radius: 3px;
    cursor: pointer;
}
.square_btn:active {/*ボタンを押したとき*/
    -ms-transform: translateY(4px);
    -webkit-transform: translateY(4px);
    transform: translateY(4px);/*下に動く*/
    border-bottom: none;/*線を消す*/
}
</style>


<template>
    <div style="display: inline-block" class="text-right">
        <a v-on:click="login" class="square_btn">ログイン</a>
        <a v-on:click="logout" class="square_btn">サインアウト</a>
        <span>{{ isAuth ? "ログイン中" : "ログインしていません"}}</span>
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
        isAuth:function(){return this.user}
    },
    methods:{
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
