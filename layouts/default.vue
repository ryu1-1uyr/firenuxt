<template>
  <div>
    <MobileHeader style="margin-bottom: 10px" />
    <p style='display: none'>{{loadList}}</p>
    <div class="wrapper">
      <nuxt class="container" :userList="userlist" />
    </div>
  </div>
</template>

<script>
  import TheHeader from '~/components/TheHeader.vue'
  import MobileHeader from '~/components/MobileHeader.vue'
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
      Postdata,
      MobileHeader
    },
    methods: {
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
