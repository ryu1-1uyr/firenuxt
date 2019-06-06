<template>
  <div>
    <TheHeader />
    <!--<Postdata />-->
    <div class="wrapper">
      <nuxt class="container" />
    </div>
  </div>
</template>

<script>
  import TheHeader from '~/components/TheHeader.vue'
  import Postdata from '~/components/Postdata'
  export default {
    components: {
      TheHeader,
      Postdata
    }
  }
</script>
