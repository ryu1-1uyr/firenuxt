<template>
  <section class="container">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
      </div>

      <div @click="getSampleData">
        <button>test GET mydata</button>
      </div>

      <form>
        <div class="form-content">
          <span>ユーザー ID</span>
          <el-input placeholder="" v-model="formData.id" />
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">アカウントを作成する</el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">{{buttonText}}</el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Cookies from 'universal-cookie'
  import firebase from '~/plugins/firebase'

  export default {
    asyncData({ redirect, store }) {
      if (store.getters['user']) {
        redirect('/posts/')
      }
      return {
        isCreateMode: false,
        formData: {
          id: ''
        }
      }
    },
    computed: {
      buttonText() {
        return this.isCreateMode ? '新規登録' : 'ログイン'
      },
      ...mapGetters(['user'])
    },
    methods: {

      async getSampleData () {
        // const getelement = this.$axios.$get('https://nuxtonfirebaseapp.firebaseio.com/user.json',{
        //   headers: {
        //     apiKey: "AIzaSyBE_wTS0kMYi_21K0O7s5HDl1BujTKTaRg",
        //   },
        //   data: {}
        // })
        // console.log(getelement)

        const db =  firebase.firestore()
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        })

        // db.collection("users").add({
        //   first: "Ada",
        //   last: "Lovelace",
        //   born: 1815
        // }) データ追加のイメージ

      },

      async handleClickSubmit() {
        console.log("in handle click")
        const cookies = new Cookies()
        if (this.isCreateMode) {
          console.log("on if")
          try {
            await this.register({ ...this.formData })
            console.log(JSON.stringify(this.user))
            this.$notify({
              type: 'success',
              title: 'アカウント作成完了',
              message: `${this.formData.id} として登録しました`,
              position: 'bottom-right',
              duration: 1000
            })
            cookies.set('user', JSON.stringify(this.user))
            console.log(JSON.stringify(this.user))
            this.$router.push('/posts/')
          } catch (e) {
            this.$notify.error({
              title: 'アカウント作成失敗',
              message: '既に登録されているか、不正なユーザー ID です',
              position: 'bottom-right',
              duration: 1000
            })
          }
        } else {
          console.log("in else")
          try {
            console.log("in try")
            await this.login({ ...this.formData })
            this.$notify({
              type: 'success',
              title: 'ログイン成功',
              message: `${this.formData.id} としてログインしました`,
              position: 'bottom-right',
              duration: 1000
            })
            cookies.set('user', JSON.stringify(this.user))
            this.$router.push('/posts/')
          } catch (e) {
            this.$notify.error({
              title: 'ログイン失敗',
              message: '不正なユーザー ID です',
              position: 'bottom-right',
              duration: 1000
            })
          }
        }
      },
      ...mapActions(['login', 'register'])
    }
  }
</script>

<style scoped>
  .form-content {
    margin: 16px 0;
  }
</style>
