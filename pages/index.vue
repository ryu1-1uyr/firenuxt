<template>
  <div>
    <div class="inline">
      <el-button style="margin-bottom: 10px; text-align: center" type="primary" @click="getSampleData">refresh</el-button>
    </div>

  <section class="container">

    <div v-if="userlist">
      <el-card v-for="user of userlist" style="max-width: 800px;margin-bottom: 10px">
        <a :href="'details/'+user.latitude+','+user.longitude+','+counter++" >
          <p>{{user.name}}</p>
          <p> comment : {{user.comment}}</p>
          <p> latitude : {{user.latitude}} </p>
          <p> longitude : {{user.longitude}}</p>
          <img v-if="user.image" :src="user.image" style="max-width: 300px" >
          <small v-else> no image </small>
        </a>
      </el-card>
      <p style="display: none">{{counter=0}}</p>
    </div>
    <div v-else>
      <el-button type="primary" @click="getSampleData">refresh</el-button>
    </div>
  </section>
  </div>
</template>

<script>
  import Postdata from '~/components/Postdata'
  import { mapGetters, mapActions ,mapState } from 'vuex'
  import firebase from '~/plugins/firebase'
  let tmp

  export default {
    components:{
      Postdata
    },
    asyncData({ store }) {
      tmp = store.state.list

    },
    data (){
      return {
        userlist:tmp,
        counter :0
      }
    },
    computed: mapState(['user']),
    computed: {

      buttonText() {
        return this.isCreateMode ? '新規登録' : 'ログイン'
      },
      ...mapGetters(['user']),
    },
    mounted(){
      this.$nextTick(()=>{
        let a=0
        const time = setInterval (_=>{
          console.log(a++);
          if(a==300){
            this.getSampleData()
            clearInterval(time)
          }});
      })
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

      },

      async handleClickSubmit() {
        console.log("in handle click")
        if (this.isCreateMode) {
          console.log("on if")
          try {

            this.$notify({
              type: 'success',
              title: 'アカウント作成完了',
              message: `${this.formData.id} として登録しました`,
              position: 'bottom-right',
              duration: 1000
            })

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
      ...mapActions(['login', 'register','setUser'])
    }
  }
</script>

<style scoped>
  .form-content {
    margin: 16px 0;
  }
</style>
