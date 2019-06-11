<template>
  <div>
    <TheHeader />
    <el-button @click="testlog">test log</el-button>
    <p style='display: none'>{{loadList}}</p>
    <!--<Postdata />-->
    <div class="wrapper">
      <nuxt class="container" />
    </div>
  </div>
</template>

<script>
  import TheHeader from '~/components/TheHeader.vue'
  import Postdata from '~/components/Postdata'
  import firebase from '~/plugins/firebase'
  import { mapGetters, mapActions ,mapState } from 'vuex'

  export default {
    data(){
      return {
        userlist:[]
      }
    },
    components: {
      TheHeader,
      Postdata
    },
    methods: {
      testlog(){

        // this.$store.commit('listElement/addList',{element:this.userlist})

        let test = this.$store.state.list
        console.log(test)

      },
    },
    computed: {

      loadList () {
        const db =  firebase.firestore()
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userlist.push(doc.data());
          });
          this.$store.commit('setList', this.userlist )
        })

      },
      ...mapGetters(['user']),
    },
  }
</script>
