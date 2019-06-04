<template>
    <div style="flex: 1">
      <el-card>
        <h1>データをポストするための場所だよ</h1>
        <br>
        <img v-show="uploadedImage" :src="uploadedImage" />

        <form>
          <div class="form-content">
            <span>comment</span><br>
            <el-input placeholder="comment" v-model="formdata.comment" />
          </div>
          <br>
          <div class="form-content">
            <input type="file" v-on:change="onFileChange">
          </div>
          <div class="text-right">
            <el-button type="primary" @click="submitData" >submit</el-button>
          </div>
          <div>
            {{formdata,uploadedImage}}
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
        formdata : {
          comment: '',
          image: ''
        }
      }
    },
    methods: {
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        console.log(files[0])
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
          this.formdata.image = e.target.result
        };

        reader.readAsDataURL(file);
      },
      submitData () {
        const db =  firebase.firestore()
        db.collection("users").add({
          comment: this.formdata.comment,
          image: this.formdata.image,
          name: 'ryu' //今は定数のユーザー名だけどそのうちなんとかする
        })
      }
    }

    }
</script>

<style scoped>

</style>
