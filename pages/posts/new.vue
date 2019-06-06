<template>
  <section class="container posts-page">

    <Postdata style="min-width: 900px" />

  </section>
</template>

<script>
  import Postdata from '~/components/Postdata'

  export default {
    components: {
      Postdata
    },
    data(){
      return{

      }
    }
  }

</script>

<style>
  .posts-page .el-table__row {
    cursor: pointer;
  }
</style>
