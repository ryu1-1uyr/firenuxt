<template>
  <div>

    <el-button type="primary" @click="getSampleData">refresh</el-button>
    <!--<el-button @click="testlog">test log</el-button>-->
  <section class="container">

    <div>

      <el-card v-for="user of userlist" style="max-width: 800px">
        <a :href="'details/'+user.latitude+','+user.longitude+','+counter++" >

        <p>{{user}}</p>
        <p>{{user.name}}</p>
        <img :src="user.image" >

        </a>
      </el-card>

    </div>
    <p style='display: none'>{{loadList}}</p>
  </section>
  </div>
</template>

<script>
  import Postdata from '~/components/Postdata'
  import { mapGetters, mapActions } from 'vuex'
  import firebase from '~/plugins/firebase'

  export default {
    components:{
      Postdata
    },
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
