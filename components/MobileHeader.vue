<template>
  <!--<div id="mobileheader">-->
    <el-menu class="mobileheader" mode="horizontal" :router="true">

      <el-menu-item index="1"  :route="{ path: '/' }" >
        <span>Home</span>
      </el-menu-item>

      <el-menu-item index="2" style="float: right" :route="{ path: '/posts/new' }">
        新規投稿
      </el-menu-item>

    </el-menu>
  <!--</div>-->
</template>

<script>
    export default {
        name: "MobileHeader"
    }
</script>

<style scoped>

</style>
