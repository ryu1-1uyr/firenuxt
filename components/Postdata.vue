<template>
    <div style="flex: 1">
      <el-card>
        <h1>データをポストするための場所だよ</h1>
        <br>
        <img v-show="uploadedImage" :src="uploadedImage" />

        <form>
          <div class="form-content">
            <span>comment</span><br>
            <input placeholder="comment" />
          </div>
          <div class="form-content">
            <input type="file" v-on:change="onFileChange">
          </div>
          <div class="text-right">
            <el-button type="primary" >{{}}</el-button>
          </div>
        </form>

      </el-card>
    </div>
</template>

<script>
  import firebase from '~/plugins/firebase'

  export default {
    data(){
      return {
        uploadedImage : '',
        comment: ''
      }
    },
    methods: {
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    }

    }
</script>

<style scoped>

</style>
