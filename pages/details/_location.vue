<template>
    <div class="map" style="margin-top: 20px">

      <div class="details">
        <p>{{tmp}}</p>
        <div >
          <span v-if="detailsJSON">
            <p> {{detailsJSON.comment}}</p>
            <p> latitude : {{detailsJSON.latitude}} </p>
            <p> longitude : {{detailsJSON.longitude}}</p>
            <img v-if="detailsJSON.image" :src="detailsJSON.image" style="max-width: 300px" >
            <small v-else> no image </small>
          </span>
          <span v-else>

            <p style="text-align: center">^o^</p>
            <div class="sk-cube-grid">
              <div class="sk-cube sk-cube1"></div>
              <div class="sk-cube sk-cube2"></div>
              <div class="sk-cube sk-cube3"></div>
              <div class="sk-cube sk-cube4"></div>
              <div class="sk-cube sk-cube5"></div>
              <div class="sk-cube sk-cube6"></div>
              <div class="sk-cube sk-cube7"></div>
              <div class="sk-cube sk-cube8"></div>
              <div class="sk-cube sk-cube9"></div>
            </div>

          </span>
        </div>
      </div>

      <div>
        <iframe :src=basedata id="map" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>

    </div>
</template>

<script>
  let tmp

    export default {
      async asyncData({ store ,route }) {
        tmp = await store.state.list[route.params.location.split(',')[2]]
        console.log(tmp,route.params.location.split(',')[2])
      },
      data () {
        return {
          basedata:`https://maps.google.co.jp/maps?output=embed&t=m&hl=ja&z=18&ll=${this.$nuxt.$route.params.location.split(',')[0]},${this.$nuxt.$route.params.location.split(',')[1]}`,
          loadFlag:false,
          location: {
            latitude: this.$nuxt.$route.params.location.split(',')[0] ,
            longitude: this.$nuxt.$route.params.location.split(',')[1]
          },
          elementNumber:this.$nuxt.$route.params.location.split(',')[2],
          detailsJSON: this.$store.state.list[this.$nuxt.$route.params.location.split(',')[2]]
        }
      },
      mounted(){
        this.$nextTick(()=>{
          let a=0
          const time = setInterval (_=>{
            console.log(a++);
            if(a==300){
              this.loadFlag = true
              this.detailsJSON = this.$store.state.list[this.elementNumber]
              clearInterval(time)
          }});
        })
      },
      methods:{

        test(){
          console.log(this.detailsJSON,this.$store.state.list,this.$store.state.list[this.elementNumber])
          this.detailsJSON = this.$store.state.list[this.elementNumber]
        }
      },
        name: "_location"
    }
</script>

<style>
</style>
