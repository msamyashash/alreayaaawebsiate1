<template>
  <div id="footerL">
    <div class="footerBg">
      <div class="footerCont">
        <div class="footerImg">
          <img
            src="../assets/imgs/footer/mobileChat.png"
            alt="Mobile Chat"
            data-aos="fade-left"
            data-aos-offset="-200"
            data-aos-delay="150"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          />
        </div>
        <div class="footerText">
          <div class="fTextCont">
            <h1
              data-aos="fade-down"
              data-aos-offset="-200"
              data-aos-delay="250"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
            >{{ lang == 'ar' ? 'حمل التطبيق الآن' : 'Get Our App Now' }}</h1>
            <h3
              data-aos="fade-right"
              data-aos-offset="-200"
              data-aos-delay="300"
              data-aos-duration="500"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
            >{{ lang == 'ar' ? 'متوفر على' : 'Available On' }}</h3>
            <div class="appDownloads" v-if="about != []">
              <a
                :href="about.google_play"
                target="_blank"
                class="ios"
                data-aos="fade-left"
                data-aos-offset="-300"
                data-aos-delay="350"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
              >
                <img src="../assets/imgs/footer/appiOS.png" alt="iOS App Download" />
              </a>
              <a
                :href="about.app_store"
                target="_blank"
                class="android"
                data-aos="fade-right"
                data-aos-offset="-300"
                data-aos-delay="350"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
              >
                <img src="../assets/imgs/footer/appAndroid.png" alt="Android App Download" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios");
// const API_URL = 'https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/'
//const API_URL = "http://alreaaiaa.net/api/public/api/"
const API_URL = "https://api.alreaaiaa.com/api/";
export default {
  name: "FooterL",
  metaInfo: {
    title:
      localStorage.getItem("lang") == "en" ? "Health Care" : "الرعاية الصحية"
  },
  data() {
    return {
      lang: "ar",
      about: []
    };
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem("lang");
    axios.get(API_URL + "about").then(function(response) {
      app.about = response.data[0];
    });
  }
};
</script>
<style lang="scss">

$primary-color: #18b4bb;


#footerL {
  display: block;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  .footerBg {
    padding-top: 100px;
    min-height: 500px;
    background: url(../assets/imgs/footer/bg.png) no-repeat center bottom;
    background-size: 100% auto;
    .footerCont {
      padding: 0 10%;
      .footerText {
        width: 60%;
        float: right;
        .fTextCont {
          padding: 0 130px;
          padding-top: 100px;
          h1 {
            color: $primary-color;
          }
          h3 {
            color: $primary-color;
          }
          .appDownloads {
            width: 100%;
            .ios,
            .android {
              width: 50%;
              float: right;
              text-align: right;
              img {
                max-width: 90%;
              }
            }
          }
        }
      }
      .footerImg {
        width: 40%;
        float: right;
        text-align: center;
        img {
          width: 80%;
          max-width: 400px;
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  #footerL {
    .footerBg {
      .footerCont {
        .footerText {
          .fTextCont {
            padding: 0 50px;
            padding-top: 20px;

            .appDownloads {
              .ios,
              .android {
                padding: 5% 0;
                text-align: center;
                img {
                  width: 80%;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #footerL {
    display: block;
    width: 100%;
    min-height: 600px;
    overflow: hidden;
    .footerBg {
      padding-top: 20px;
      min-height: 400px;
      background: url(../assets/imgs/footer/bg.png) no-repeat center bottom;
      background-size: 100% auto;
      .footerCont {
        padding: 0 10%;
        .footerText {
          width: 100%;
          float: right;
          .fTextCont {
            padding: 0 10px;
            padding-top: 20px;
            h1 {
              color: $primary-color;
            }
            h3 {
              color: $primary-color;
            }
            .appDownloads {
              width: 100%;
              .ios,
              .android {
                width: 100%;
                padding: 5% 0;
                text-align: center;
                img {
                  width: 80%;
                }
              }
            }
          }
        }
        .footerImg {
          width: 100%;
          text-align: center;
          img {
            width: 80%;
            max-width: 400px;
          }
        }
      }
    }
  }
}
</style>
