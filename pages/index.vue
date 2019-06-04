<template>
  <section class="container">
    <div>
    <!--<el-card style="flex: 1">-->
      <!--<div slot="header" class="clearfix">-->
        <!--<span>ログイン</span>-->
      <!--</div>-->

      <!--&lt;!&ndash;<div @click="getSampleData">&ndash;&gt;-->
        <!--&lt;!&ndash;<button>test GET mydata</button>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->

      <!--<form>-->
        <!--<div class="form-content">-->
          <!--<span>ユーザー ID</span>-->
          <!--<el-input placeholder="" v-model="formData.id" />-->
        <!--</div>-->
        <!--<div class="form-content">-->
          <!--<el-checkbox v-model="isCreateMode">アカウントを作成する</el-checkbox>-->
        <!--</div>-->
        <!--<div class="text-right">-->
          <!--<el-button type="primary" @click="handleClickSubmit">{{buttonText}}</el-button>-->
        <!--</div>-->
      <!--</form>-->
    <!--</el-card>-->

      <div @click="getSampleData">
      <button>test GET mydata</button>
      </div>
    </div>
    <br>
    <div>
      <el-card v-for="user of userlist" style="max-width: 800px">

        {{user}}
        <p>{{user.name}}</p>
      </el-card>
      <!--<input type="none" value="{{loadList}}"  />-->
      <p style='display: none'>{{loadList}}</p>
    </div>
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
    data (){
      return {
        userlist:[]
      }
    },
    computed: {
      buttonText() {
        return this.isCreateMode ? '新規登録' : 'ログイン'
      },
      loadList () {
        const db =  firebase.firestore()
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userlist.push(doc.data());
          });
        })
      },
      ...mapGetters(['user'])
    },
    methods: {

      async getSampleData () {
        this.userlist = []

        const db =  firebase.firestore()
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userlist.push(doc.data());
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
        // const cookies = new Cookies()
        if (this.isCreateMode) {
          console.log("on if")
          try {
            // await this.register({ ...this.formData })
            // console.log(JSON.stringify(this.user))
            this.$notify({
              type: 'success',
              title: 'アカウント作成完了',
              message: `${this.formData.id} として登録しました`,
              position: 'bottom-right',
              duration: 1000
            })
            // cookies.set('user', JSON.stringify(this.user))
            // console.log(JSON.stringify(this.user))
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
            // cookies.set('user', JSON.stringify(this.user))
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
