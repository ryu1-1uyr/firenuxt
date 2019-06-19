<template >
  <div>
      <el-card style="max-width: 355px ;margin-top: 35px" >

        <h1>データをポストするための場所だよ</h1>

        <br>
        <img v-show="uploadedImage" :src="uploadedImage" style="max-width: 300px" />

        <form>
          <div class="a">
            <span>comment</span><br>
            <el-input placeholder="comment" v-model="formdata.comment" />
          </div>
          <br>
          <div class="i">
            <input type="file" v-on:change="onFileChange">
          </div>
          <div class="u">
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
  import geolocation from 'geolocation'


  export default {
    data(){
      return {
        uploadedImage : '',
        formdata : {
          comment: '',
          image: '',
          latitude: 0,
          longitude: 0
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
      async submitData () {

        const db =  firebase.firestore()

        await geolocation.getCurrentPosition( (err, position) => {
          if (err) {console.error((err))}
          const location = position.coords

          this.formdata.latitude = location.latitude
          this.formdata.longitude = location.longitude

          db.collection("users").add({
            comment: this.formdata.comment,
            image: this.formdata.image,
            latitude: location.latitude,
            longitude: location.longitude,
            name: 'ryu' //今は定数のユーザー名だけどそのうちなんとかする
          })
        })
        console.log("submit!")
        //闇の実装
        // location.href = "http://localhost:3000/"
      },
      async locationtest () {
        await geolocation.getCurrentPosition( (err, position) => {
          if (err) {console.error((err))}
          const location = position.coords

          this.formdata.latitude = location.latitude
          this.formdata.longitude = location.longitude
        })
      },
    }

    }
</script>

