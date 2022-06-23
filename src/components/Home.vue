<template>
  <div id="Home">
    <div class="hSocial">
      <ul>
        <li>
          <a :href="about.website" target="_blank">
            <img src="../assets/imgs/home/whatsapp.png">
          </a>
        </li>
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
    <div class="heroSection"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-once="false"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
      <div class="video"
        v-bind="{'style': lang == 'ar' ? 'float:right' : 'float:left' }"
      data-aos="fade-left"
      data-aos-delay="350"
      data-aos-duration="500"
      data-aos-once="false"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
        <iframe v-bind="{'style': lang == 'ar' ? 'float:right' : 'float:left' }" width="360" height="225" :src="about.video" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div class="text"
        v-bind="{'style': lang == 'ar' ? 'float:right' : 'float:left' }"
      data-aos="fade-right"
      data-aos-offset="-300"
      data-aos-delay="350"
      data-aos-duration="500"
      data-aos-once="false"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
        <h1 v-bind="{'dir': lang == 'ar' ? 'rtl' : 'ltr' }">{{ lang == 'ar' ? about.short_description_ar : about.short_description_en }}</h1>
        <router-link to="/Medical-Network"  v-bind="{'style': lang == 'ar' ? 'float:right' : 'float:left' }">{{ lang == 'ar' ? 'الشبكة الطبية' : 'Medical Network' }}</router-link>
         <router-link to="/Subscribe"  v-bind="{'style': lang == 'ar' ? 'float:right;margin-right:20px;' : 'float:left;margin-left:50px;' }">{{ lang == 'ar' ? ' اطلب البطاقة' : 'Order Card' }}</router-link>

      </div>
    </div>
    <img class="homeBg" src="../assets/imgs/home/bg.png" alt="bg">
    <div class="cards">
      <div class="card"
      data-aos="zoom-in-left"
      data-aos-offset="-200"
      data-aos-duration="500"
      data-aos-delay="450"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
        <div class="cBody">
          <router-link to="/Contracts">
            <div class="cImg">
              <img src="../assets/imgs/home/contracts.png" alt="Contracts"
        data-aos="fade-down"
        data-aos-offset="-300"
        data-aos-duration="500"
        data-aos-delay="450"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center">
            </div>
            <div class="cText"
        data-aos="fade-up"
        data-aos-offset="-350"
        data-aos-duration="500"
        data-aos-delay="450"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center">
              <h1>{{ lang == 'ar' ? 'تعاقدات' : 'Contracts' }}</h1>
              <p>{{ lang == 'ar' ? content.contracts_details_ar : content.contracts_details_en }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="card"
      data-aos="fade-up"
      data-aos-offset="-200"
      data-aos-duration="500"
      data-aos-delay="450"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
        <div class="cBody active">
          <router-link to="/Events">
            <div class="cImg">
              <img src="../assets/imgs/home/events.png" alt="Events"
        data-aos="fade-down"
        data-aos-offset="-300"
        data-aos-duration="500"
        data-aos-delay="450"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center">
            </div>
            <div class="cText"
        data-aos="fade-up"
        data-aos-offset="-350"
        data-aos-duration="500"
        data-aos-delay="450"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-center">
            <h1>{{ lang == 'ar' ? 'فعاليات' : 'Events' }}</h1>
              <p>{{ lang == 'ar' ? content.event_details_ar : content.event_details_en }}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="card"
      data-aos="zoom-in-right"
      data-aos-offset="-200"
      data-aos-duration="500"
      data-aos-delay="450"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center"
    >
        <div class="cBody">
          <router-link to="/Awards">
          <div class="cImg">
            <img src="../assets/imgs/home/awards.png" alt="Awards"
      data-aos="fade-down"
      data-aos-offset="-300"
      data-aos-duration="500"
      data-aos-delay="450"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center">
          </div>
          <div class="cText"
      data-aos="fade-up"
      data-aos-offset="-350"
      data-aos-duration="500"
      data-aos-delay="450"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement="top-center">
            <h1>{{ lang == 'ar' ? 'تكريمات' : 'Awards' }}</h1>
            <p>{{ lang == 'ar' ? content.honors_details_ar : content.honors_details_en }}</p>
          </div>
        </router-link>
        </div>
      </div>
    </div>
    <div class="partners"
      data-aos="fade-up"
      data-aos-offset="-200"
      data-aos-delay="50"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <h1>{{ lang == 'ar' ? 'شركاء النجاح' : 'Success Partners' }}</h1>
      <div class="pSlider" dir="ltr">
        <div class="pPrev" @click="prev()">
          <font-awesome-icon icon="chevron-left" size="3x" />
        </div>
        <carousel
          :autoplay="true"
          :perPageCustom="[[320, 1], [767, 3], [1023, 4] ,[1199, 5]]"
          paginationActiveColor="$primary-color"
          :mouseDrag="true"
          :navigationEnabled="true"
          :scrollPerPage="false"
          :loop="true"
          :speed="500"
          class="pSlides"
        >
          <slide v-for="p in partners" class="pSlide" :key="p.title_en">
            <img :src="'https://api.alreaaiaa.com/'+p.image" :alt="p.title_ar" @error="imgUrlAlt">
            <h3>{{ lang == 'ar' ? p.title_ar : p.title_en }}</h3>
          </slide>
        </carousel>
        <div class="pNext" @click="next()">
          <font-awesome-icon icon="chevron-right" size="3x" />
        </div>
      </div>
    </div>
    <FooterL></FooterL>
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
// const API_URL = 'https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/'
//const API_URL = "http://alreaaiaa.net/api/public/api/"
     const API_URL = "https://api.alreaaiaa.com/api/";
    import { Carousel, Slide } from 'vue-carousel';
export default {
  name: "Home",
  data() {
    return {
      about: {},
      content: [],
      partners: {},
      lang: "ar"
    }
  },metaInfo: [
     { title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية'},
        { charset: 'utf-8' },
     {  name: 'viewport', content: 'شعار الرعاية الصحية ... خصومات طبية وتجميلية غير مسبوقة.. تصل إلى 80 %. من نحن. bg ... تعاقدات. تعرف على التعاقدات الجديدة المنضمة لشبكة خدمة الرعاية الصحية.' }
    ],
  components: {
    Carousel,
    Slide
  },
  methods: {
    getAbout() {
      let app = this;
      axios.get(`${API_URL}about?country_id=${window.localStorage.country_id}`).then(function(response) {
        app.about = response.data[0];
      });
    },
    getContent() {
      let app = this;
      axios.get(API_URL + "contnet").then(function(response) {
        app.content = response.data;
      });
    },
    getPartners() {
      let app = this;
      axios.get(API_URL + "success").then(function(response) {
        // console.log(response.data);
        app.partners = response.data;
      });
    },
    next() {
      let nextButton = document.getElementsByClassName('VueCarousel-navigation-next')[0]
      nextButton.click()
    },
    prev() {
      let prevButton = document.getElementsByClassName('VueCarousel-navigation-prev')[0]
      prevButton.click()
    },
    imgUrlAlt(event) {
      event.target.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAYAAACuwEE+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA3LTI2VDAyOjQ5OjA0KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA3LTI2VDAyOjUxOjQ0KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNy0yNlQwMjo1MTo0NCswMjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZjFjZGFhNC1jMGQ0LThmNGYtYjg4Yy0zODU5Y2I0NWFmMTUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiODcxZDBiMC04NzZhLWFhNDgtODQ1NS03YmY1MjQ3ZTM3YjgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NzUzMTkyOS1hZGRlLTc5NDYtOGIxZS00YzZhYTk0MWQ0YWUiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY3NTMxOTI5LWFkZGUtNzk0Ni04YjFlLTRjNmFhOTQxZDRhZSIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0yNlQwMjo0OTowNCswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplMzI4M2Y4Mi0xZTE5LTc0NDQtYWU3Mi03MzI3MzIwOTgzNzgiIHN0RXZ0OndoZW49IjIwMTgtMDctMjZUMDI6NDk6MDQrMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MGYxY2RhYTQtYzBkNC04ZjRmLWI4OGMtMzg1OWNiNDVhZjE1IiBzdEV2dDp3aGVuPSIyMDE4LTA3LTI2VDAyOjUxOjQ0KzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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"
    }
  },
  created: function() {
    let app = this
    app.lang = localStorage.getItem('lang')
    app.getAbout()
    app.getContent()
    app.getPartners()
  }
}
</script>

<style lang="scss">

$primary-color: #18b4bb;

.VueCarousel-navigation-button {
  display:none;
}
.VueCarousel-slide {
  margin: 0 auto;
}
ul[role=tablist] {
  display: none!important;
}
#Home {
  width: 100%;
  display: block;
  overflow: hidden;
  min-height: calc(100vh - 115px);
  .hSocial {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 50%;
    transform: translate( 0%, -50%);
    background-color: rgba(0,0,0,0.06);
    box-shadow: inset -1em 1em 1em rgba(62, 169, 140, 0.14);
    padding: 1.5em 0.7em 0.5em;
    border-radius: 0 1em 1em 0;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin-bottom: 5px;
        a {
          img {
            width: 35px;
            padding: 0;
            transition: 0.3s all;
            &:hover {
              padding: 0;
              filter: brightness(120%);
            }
          }
        }
      }
    }
  }
  .heroSection {
    display: block;
    overflow: hidden;
    background: url(../assets/imgs/home/heroS.jpg) no-repeat center center;
    background-size: cover;
    padding: 40px 15%;
    .video {
      text-align: right;
      width: 45%;
      float: right;
      padding: 20px 0;
      overflow: hidden;
    }
    .text {
      width: calc(55% - 20px);
      float: right;
      padding: 10px;
      padding-top: 13px;

      h1 {
        font-size: 1.9em;
        color: #fff;
      }
      a {
        padding: 10px 25px;
        background: #fff;
        color: $primary-color;
        text-decoration: none;
        font-size: 100%;
        font-weight: 700;
        transition: 0.2s;
        &:hover {
          box-shadow: 0 0 7px 0 $primary-color;
          background: $primary-color;
          color: #fff;
        }
      }
    }
  }
  .cards {
    min-height: 360px;
    padding: 5% 10%;
    text-align: center;
    a {
      text-decoration: none;
    }
    .card {
      width: 33.3333333%;
      float: right;
      text-align: center;
      .cBody {
        background: #ffffff;
        box-shadow: 0 0 25px 1px #f0f6e5;
        height: calc(100% - 100px);
        width: calc(100% - 100px);
        margin: 40px;
        padding: 25px 10px;
        text-align: center;
        transition: 0.4s;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 35px 1px #f0f6e5;
          height: auto;
          width: calc(100% - 60px);
          margin: 20px;
          .cText {
            padding: 10px 0;
            p {
              height: 60px;
              padding: 10px 25px;
              transition: 0.5s;
            }
          }
        }
        .cImg {
          padding: 5px 20px;
          img {
            width: 160px;
          }
        }
        .cText {
          transition: 0.5s;
          h1 {
            margin: 0;
            font-size: 140%;
            color: $primary-color;
            transition: 0.5s;
          }
          p {
            font-size: 14px;
            font-weight: 600;
            color: #707070;
            transition: 0.2s;
          }
        }
      }
    }
  }
  .homeBg {
    position: absolute;
    padding-top: 75px;
    z-index: -1;
    width: auto;
    max-height: 70%;
    max-width: 100vw;
    left: 50%;
    transform: translateX(-50%);
  }
  .partners {
    padding: 0 7%;
    padding-bottom: 40px;
    text-align: center;
    h1 {
      color: $primary-color;
      font-weight: 700;
    }
    .pSlider {
      width: 100%;
      display: inline-block;
      .pPrev {
        padding-top: 30px;
        width: 75px;
        float: left;
        color: #909090;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
      .pNext {
        padding-top: 30px;
        width: 75px;
        float: right;
        color: #909090;
        transition: 0.2s;
        cursor: pointer;
        &:hover {
          color: #666;
        }
      }
      .pSlides {
        width: calc(100% - 150px);
        float: left;
        white-space: nowrap;
        overflow: hidden;
        .pSlide {
          width: 20%;
          display: inline-block;
          text-align: center;
          img {
            width: 100px;
          }
          h3 {
            margin: 0;
            font-weight: 300;
            color: #707070;
            white-space: pre-wrap;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  #Home {
    .hSocial {
      padding: 1em 0.5em 0.3em;

      ul {
        li {
          margin-bottom: 5px;
          a {
            img {
              width: 30px;
            }
          }
        }
      }
    }
    // .hSocial {
    // top: 50%;
    // transform: translate( 0%, -50%);
    //   ul {
    //     li {
    //       a {
    //         img {
    //           width: 60px;
    //         }
    //       }
    //     }
    //   }
    // }
    .heroSection {
      padding: 30px 3%;
    }
    .cards {
      padding: 7% 2%;
      .card {
        .cBody {
          &:hover {
            box-shadow: 0 0 35px 1px #f0f6e5;
            height: auto;
            width: 100%;
            margin: 20px auto;
            padding: 10px 30px;
            .cText {
              padding: 10px 0;
              p {
                height: 60px;
                padding: 10px 25px;
                transition: 0.5s;
              }
            }
          }
        }
      }
    }
    .partners {
      .pSlider {
        .pSlides {
          .pSlide {
            width: 33.33%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #Home {
    .hSocial {
      padding: 1em 0.5em 0.3em;

      ul {
        li {
          margin-bottom: 5px;
          a {
            img {
              width: 30px;
            }
          }
        }
      }
    }
    // .hSocial {
    // top: 50%;
    // transform: translate( 0%, -50%);
    //   ul {
    //     li {
    //       a {
    //         img {
    //           width: 40px;
    //         }
    //       }
    //     }
    //   }
    // }

    .heroSection {
      padding: 20px 10%;
      .video {
        width: 100%;
        text-align: center;

        iframe {
          float: unset !important;
        }
      }
      .text {
        padding: 0;
        padding-bottom: 20px;
        width: 100%;
        text-align: center;
      }

      h1 {
        margin-top: 0;
      }

      a {
        display: inline-block;
        float: unset !important;
      }
    }
    .cards {
      padding: 7% 2%;
      min-height: 950px;
      .card {
        width: 100%;
        .cBody {
          max-width: 250px;
          margin: 0 auto;
          margin-bottom: 40px;
        }
      }
    }
    .partners {
      .pSlider {
        .pSlides {
          .pSlide {
            width: 50%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 425px) {
  #Home {
    .heroSection {
      a {
        margin-bottom: 10px;
        margin-right: 0 !important;
      }
    }
    .partners {
      .pSlider {
        .pSlides {
          .pSlide {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
