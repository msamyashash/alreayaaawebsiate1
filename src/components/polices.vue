<template>
  <div id="polices" class="">
    <v-container>
      <v-row>
          <v-col></v-col>
          <v-col>
            <h2 v-if="lang  == 'ar'" class="text-center">الشروط و الأحكام</h2>
            <h2 v-else style="direction:ltr;" class="text-center">Polices & Privacy</h2>
          </v-col>
          <v-col></v-col>
      </v-row>
      <v-row>
        <v-col class="col-5"></v-col>
        <v-col class="image-container">
            <img alt="Responsive image" class="policy-image" v-if="data.image != undefined" :src="'https://api.alreaaiaa.com/'+data.image">
        </v-col>
        <v-col class="col-5"></v-col>
      </v-row>
      <v-row>
        <v-col class="col-1"></v-col>
        <v-col class="col-12" style="padding: 0 40px 0 40px;">
            
          <pre v-html="data.rules"  class="text-center" v-if="lang  == 'ar'"></pre>
          <pre class="text-center" dir="ltr" v-else ltr>{{data.rules_en}}</pre>
        </v-col>
        <v-col class="col-1"></v-col>
      </v-row>
    </v-container>


  </div>
</template>
<script>
/* eslint-disable */
const API_URL = "https://alreaaiaa.com/api/public/api/"
// const API_URL = "http://127.0.0.1:8000/api/";
const axios = require("axios");
export default {
  name: "About",
  data() {
    return {
      data: {
        rules: "",
        rules_en: "",
        visitors_link: 0,
        image: ""
      },
      lang: 'ar'
    };
  },
  methods: {

    getAbout() {
      let app = this;
      app.spin = true;
      app.loading = true;
      app.message = "جاري تحميل البيانات..";
      axios.get(API_URL + "rules").then( res => {
        let d = res.data[0];
        this.data.rules = d.rules;
        this.data.rules_en = d.rules_en;
        this.data.image = d.image;
        console.log(d);
        console.log(this.data);
      }).catch(error => console.log(error));
    }
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem("lang");
    this.getAbout();
  }
};
</script>

<style lang="scss">
$small-size: 500px;
@import "boxicons/css/boxicons.min.css";

pre {
    overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

#polices {
    padding: 0 40px 0 40px;
    @media only screen and (max-width: $small-size) {
        padding: 0 20px 0 20px;
    }

}
.image-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.policy-image {
    width: 70%;
    @media only screen and (max-width: $small-size) {
        width: 100%;
    }
}


.border-test {
    border: 1px solid red;
}

.border-test1 {
    border: 1px solid blue;
}

.border-test2 {
    border: 1px solid green;
}


</style>
