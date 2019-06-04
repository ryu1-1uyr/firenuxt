<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <div slot="header" class="clearfix">
        <span>新着投稿</span>
      </div>
      <el-table
        :data="showPosts"
        style="width: 100%"
        class="table"
      >
        <el-table-column
          prop="title"
          label="タイトル">
        </el-table-column>
        <el-table-column
          prop="user.id"
          label="投稿者"
          width="180">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          width="240">
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
  export default {
    computed: {
      showPosts() {
        return [
          {
          id: '001',
          title: 'これはタイトルです',
          body: '心理的安全を確保していこうな',
          created_at: '2019/06/04 11:00:00',
          user: {
            id: 'ryu1__1uyr'
          }
        },
          {
            id: '002',
            title: 'これもタイトルです',
            body: 'は〜〜〜〜〜〜〜感情〜〜〜〜〜',
            created_at: '2019/06/04 11:00:00',
            user: {
              id: '†ryu†'
            }
          },
        ]
      },
    },
  }
</script>

<style scoped>
  .posts-page .el-table__row {
    cursor: pointer;
  }
</style>
