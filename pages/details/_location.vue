<template>
    <div class="map" style="margin-top: 20px">
      <button @click="test">{{test}}</button>

      <div>
        <div style="background-color: azure;width: 450px;height: 600px;margin-right: 50px">
          <span v-if="detailsJSON">
          <p>{{JSON.stringify(detailsJSON['comment'])}}</p>
            <p>latitude : {{detailsJSON.latitude}} , longitude : {{detailsJSON.longitude}}</p>
            <img v-if="detailsJSON" :src="detailsJSON.image" alt="うつってへんよ">
            </span>
        </div>
      </div>

      <div>
        <iframe :src=basedata width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>

    </div>
</template>

<script>
  let tmp

    export default {
      asyncData({ store ,route }) {
        tmp = store.state.list[route.params.location.split(',')[2]]
        // console.log(tmp,route.params.location.split(',')[2])

      },
      // asyncData({ store }) {
      //   let hoge = store.getters['getList']
      //   console.log("a",hoge)
      //
      // },
      data () {
        return {
          basedata:`https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=18&ll=${this.$nuxt.$route.params.location.split(',')[0]},${this.$nuxt.$route.params.location.split(',')[1]}`,
          location: {
            latitude: this.$nuxt.$route.params.location.split(',')[0] ,
            longitude: this.$nuxt.$route.params.location.split(',')[1]
          },
          elementNumber:this.$nuxt.$route.params.location.split(',')[2],
          detailsJSON: tmp
        }
      },
      methods:{
        test(){
          // this.detailsJSON = JSON.stringify(this.$store.state.list[this.elementNumber])
          console.log(this.detailsJSON)
        }
      },
        name: "_location"
    }
</script>

<style>
</style>
