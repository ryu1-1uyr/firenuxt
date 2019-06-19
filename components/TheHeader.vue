<template>
  <el-menu id="theheader" mode="horizontal" :router="true">

      <el-menu-item index="1" style="pointer-events:none;" :route="{ path: '/' }">
        PBL のアプリケーション
      </el-menu-item>

    <el-menu-item index="1" style="float: right;" :route="{ path: '/' }" >
      <span>Home</span>
    </el-menu-item>

    <el-menu-item index="2" :route="{ path: '/' }">
      投稿一覧
    </el-menu-item>

    <el-menu-item index="6" style="float: right" :route="{ path: '/posts/new' }">
      新規投稿
    </el-menu-item>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>
