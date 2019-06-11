<template>
    <div class="map" style="margin-top: 20px">

      <div>
        <div style="background-color: azure;width: 450px;height: 600px;margin-right: 50px">{{user||"からだよ"}}</div>
        <button @click="test"></button>
      </div>

      <div>
        <iframe :src=basedata width="900" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>

    </div>
</template>

<script>
    export default {
      data () {
        return {
          basedata:`https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=18&ll=${this.$nuxt.$route.params.location.split(',')[0]},${this.$nuxt.$route.params.location.split(',')[1]}`,
          location: {
            latitude: this.$nuxt.$route.params.location.split(',')[0] ,
            longitude: this.$nuxt.$route.params.location.split(',')[1]
          }
        }
      },
      methods:{
        test(){
        }
      },
        name: "_location"
    }
</script>

<style>
</style>
