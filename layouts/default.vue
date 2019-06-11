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
  export default {
    components: {
      TheHeader,
      Postdata
    }
  }
</script>
