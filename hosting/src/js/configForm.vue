<style>

</style>


<template>
    <div>
        <el-form label-position="top" label-width="100px" :model="form">
            <el-form-item label="何日まえのツイートを消すか">
                <el-input-number v-model="form.howManyDaysAgo" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="消したくないツイート(id,ハッシュタグ)">
                <el-input v-model="form.exceptions"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">更新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import { firebaseApp } from './firebaseApp.js';

export default {
    data:()=>({
        form:{
            howManyDaysAgo:1,
            exceptions:""
        }
    }),
    computed:{
    },
    methods:{
        onSubmit(){

        }
    },
    created: function() {

    }
}
</script>
