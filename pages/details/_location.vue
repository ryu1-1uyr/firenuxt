<template>
    <div>
      詳細の画面です
      {{this.location.latitude}}
      {{this.location.longitude}}
    </div>
</template>

<script>
    export default {
      data () {
        return {
          location: {
            latitude: this.$nuxt.$route.params.location.split(',')[0] ,
            longitude: this.$nuxt.$route.params.location.split(',')[1]
          }
        }
      },
        name: "_location"
    }
</script>

<style scoped>

</style>
