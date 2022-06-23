<template>
    <div id="About">
        <div class="page">
            <div class="aboutContent">
                <div class="aHeader"
                    data-aos="fade-down"

                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-anchor-placement="top-center">
                    <h2>{{ lang == 'ar' ? 'من نحن' : 'About Us' }}</h2>
                    <p>{{ lang == 'ar' ? 'تعرف على الشركة' : 'Get to know about our company' }}</p>
                </div>
                <label class="loading" v-if="status == 'search' && status != 'none'">
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    {{ lang == 'ar' ? 'جاري التحميل..' : 'Loading..' }}
                </label>
                <div class="aDetails" v-if="status == 'available'"
                    v-bind="{'dir': lang == 'ar' ? 'rtl' : 'ltr' }"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-anchor-placement="top-center">
                    <h3>{{ lang == 'ar' ? 'عن الشركة' : 'About The Company' }}</h3>
                    <div class="aText">
                        <p>{{ lang == 'ar' ? about.about_us_ar : about.about_us_en }}</p>
                    </div>
                    <h3>{{ lang == 'ar' ? 'تابعنا' : 'Follow Us' }}</h3>
                    <div class="hSocial">
                        <ul>
                            <li>
                              <a :href="about.twitter" target="_blank">
                                <img src="../assets/imgs/home/tw.png">
                              </a>
                            </li>
                            <li>
                              <a :href="about.insta" target="_blank">
                                <img src="../assets/imgs/home/in.png">
                              </a>
                            </li>
                            <li>
                              <a :href="about.facebook" target="_blank">
                                <img src="../assets/imgs/home/fb.png">
                              </a>
                            </li>
                            <li>
                              <a :href="about.youtube" target="_blank">
                                <img src="../assets/imgs/home/yt.png">
                              </a>
                            </li>
                            <li>
                              <a :href="about.snapchat" target="_blank">
                                <img src="../assets/imgs/home/sn.png">
                              </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5ba88858c9abba579677d3d7/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
const axios = require("axios");
// const API_URL = "https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/";
 const API_URL = "https://api.alreaaiaa.com/api/";
   // const API_URL = "http://alreaaiaa.net/api/public/api/";
export default {
  name: "About",metaInfo: {
      title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
    },
  data() {
    return {
      about: {},
      status: "search",
      lang: "ar"
    };
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem("lang");
    axios.get(API_URL + "about").then(function(response) {
      app.about = response.data[0];
      app.status = "available";
    });
  }
};
</script>

<style lang="scss">
$primary-color: #18b4bb;
#About {
  .page {
    width: 100%;
    min-height: calc(100vh - 165px);
    overflow: hidden;
    .aboutContent {
      width: 800px;
      max-width: 100%;
      margin: 0 auto;
      .aHeader {
        text-align: center;
        h2 {
          color: $primary-color;
          margin-bottom: 0;
        }
        p {
          margin: 0;
          color: #909090;
        }
      }
      .aDetails {
        width: calc(100% -40px);
        padding: 10px 20px;
        h3 {
          color: $primary-color;
          padding-top: 35px;
        }
        .aText {
          background: $primary-color;
          box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);
          p {
            color: #fff;
            white-space: pre-line;
            padding: 10px 20px;
            text-align: justify;
          }
        }
        .hSocial {
          width: 100%;
          display: inline-block;
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
              float: right;
              cursor: pointer;
              a {
                img {
                  width: 70px;
                  padding: 5px;
                  transition: 0.3s all;
                  border-radius: 50%;
                  &:hover {
                    width: 80px;
                    padding: 0;
                    filter: brightness(120%);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
