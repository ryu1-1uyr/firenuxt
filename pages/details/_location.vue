<template>
    <div class="map" style="margin-top: 20px">

      <div class="details">
        <p>{{tmp}}</p>
        <div >
          <span v-if="detailsJSON">
            <p> {{detailsJSON.comment}}</p>
            <p> latitude : {{detailsJSON.latitude}} </p>
            <p> longitude : {{detailsJSON.longitude}}</p>
            <img v-if="detailsJSON" :src="detailsJSON.image" alt="noimage">
          </span>
          <span v-else>
            <el-button @click="test">refresh</el-button>
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
              this.test()
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
