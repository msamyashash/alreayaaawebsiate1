<template>
    <div id="Offers">
        <div class="page">
            <div class="rightNav"
                data-aos="fade-down"

                data-aos-delay="500"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="top-center"
                >
                <div class="navTitle">
                    {{ lang == 'ar' ? 'المناطق' : 'Zones' }}
                </div>
                <ul class="navDd">
                    <li v-if="zones.length == 0">
                        <div class="liCont">
                            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                    </li>
                    <li v-for="(zone, index) of zones">
                        <input type="radio" name="area" v-bind="{ 'id': 'area-'+zone.data.id}">
                        <div class="liCont">
                            <label @click="setCZone(zone.data.id)" v-bind="{ 'for': 'area-'+zone.data.id }">{{ lang == 'ar' ? zone.data.title_ar : zone.data.title_en }}</label>
                            <font-awesome-icon icon="chevron-left" v-if="(zone.sub_zones).length > 1" />
                        </div>
                        <ul class="custom-scrollbar green" v-if="(zone.sub_zones).length > 1">
                            <li v-for="city of zone.sub_zones">
                                <input type="radio" name="city" v-bind="{ 'id': 'city-'+city.id }">
                                <div class="liLiCont">
                                    <label @click="setCSubZone(city.id)" v-bind="{ 'for': 'city-'+city.id }">{{ lang == 'ar' ? city.title_ar : city.title_en }}</label>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="leftContent"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="top-center"
            >

                <div class="contArea">
                    <div class="nHeader"
                        data-aos="fade-down"

                        data-aos-duration="500"
                        data-aos-easing="ease-in-out"
                        data-aos-anchor-placement="top-center">
                        <h2>{{ lang == 'ar' ? 'العروض' : 'Offers' }}</h2>
                        <p>{{ lang == 'ar' ? 'أخر العروض الخاصة بالرعاية الصحية' : 'Latest exlusive offers for Alreaaiaa' }}</p>
                    </div>
                    <div class="content">
                        <div class="results">
                            <label v-if="offers.length > 0 && offers != 'search' && offers != 'none' && lang == 'ar'">يوجد {{ pages.results }} عروض</label>
                            <label v-if="offers == 'none' && lang == 'ar'">عفواً لا توجد  عروض</label>
                            <label v-if="offers == 'search' && offers != 'none' && lang == 'ar'">
                                <!-- <font-awesome-icon class="spinner" icon="spinner" />&ensp; -->
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                جاري البحث..
                            </label>
                            <!-- Lang = En -->
                            <label v-if="offers.length > 0 && offers != 'search' && offers != 'none' && lang == 'en'">Found {{pages.results }} offers</label>
                            <label v-if="offers == 'none' && lang == 'en'">Sorry, no offers were found</label>
                            <label v-if="offers == 'search' && offers != 'none' && lang == 'en'">
                                <!-- <font-awesome-icon class="spinner" icon="spinner" />&ensp; -->
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                Searching..
                            </label>
                            <ul v-if="offers.length > 0 && offers != 'search' && offers != 'none'">
                                <li v-for="offer of offers">
                                    <div class="liImg">
                                        <router-link :to="{ name: 'Offer', params: {id: offer.id} }">
                                            <img :src="'https://api.alreaaiaa.com/'+offer.spec_image" @error="imgUrlAlt">
                                        </router-link>
                                    </div>
                                    <div class="details">
                                        <div class="dText">
                                            <router-link :to="{ name: 'Offer', params: {id: offer.id} }">
                                                <h3>{{ lang == 'ar' ? offer.title_ar : offer.title_en }}</h3>
                                            </router-link>
                                        </div>
                                        <div class="dPhone">
                                            <font-awesome-icon icon="gift" />
                                            <router-link :to="{ name: 'Offer', params: {id: offer.id} }">{{ lang == 'ar' ? 'تفاصيل العرض' : 'Offer details' }}</router-link>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="pages.current < pages.total && offers.length > 0 && offers != 'search' && offers != 'none'" class="formCtrls">
                                <a v-if="!loadingMore" @click="getMoreOffers(pages.current + 1)" class="btnSuccess">{{ lang == 'ar' ? 'ﻋﺮض اﻟﻤﺰﻳﺪ ..' : 'Show more..' }}</a>
                                <div v-if="loadingMore" class="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
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
// const API_URL = "https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/"
//const API_URL = "http://alreaaiaa.net/api/public/api/"
     const API_URL = "https://api.alreaaiaa.com/api/";
export default {
  name: "Offers",
  metaInfo: {
      title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
    },
  data() {
    return {
      zones: [],
      cZone: "",
      cSubZone: "",
      country_id:"",
      offers: [],
      lang: "ar",
      loadingMore: false,
      onSearch: false,
      pages: {
        current: 1,
        total: 1,
        results: 0
      }
    };
  },
  methods: {
    setCZone(id) {
      let app = this;
      app.cZone = id;
      app.cSubZone = "";
      let cSubZones = document.getElementsByName("city");
      cSubZones.forEach(element => {
        element.checked = false;
      });
      app.getOffers();
    },
    setCSubZone(id) {
      let app = this;
      app.cSubZone = id;
      app.getOffers();
    },
    setCSpecialists(id) {
      let app = this;
      app.cSpecialist = id;
      app.getOffers();
    },
    searchOffers() {
      let app = this
      if(app.keywords.length > 2 && app.onSearch == false) {
        app.onSearch = true
        setTimeout(() => {
          app.getOffers()
        }, 500);
      }
    },
    getOffers() {
      let app = this;
      app.offers = "search"
      app.loadingMore = false
      app.specialists = []
      let rData = {};
      if (app.cZone != "") {
        rData["zone_id"] = app.cZone
      }
      if (app.cSubZone != "") {
        rData["sub_zone_id"] = app.cSubZone
      }
       if (app.country_id != "") {
        rData["country_id"] = app.country_id
      }
       axios.post(API_URL + "web_get_special_offers", rData).then(function(response) {
        let dataOffers = response.data
        if (
          dataOffers.data != undefined &&
          dataOffers.data.length > 0
        ) {
          app.offers = dataOffers.data;
          app.pages.current = response.data.current_page
          app.pages.total = response.data.last_page
          app.pages.results = response.data.total
        } else {
          app.offers = "none"
        }
        app.onSearch = false
      });
    },
    getMoreOffers(page) {
      let app = this;
      app.loadingMore = true
      let rData = {};
      if (app.cZone != "") {
        rData["zone_id"] = app.cZone
      }
      if (app.cSubZone != "") {
        rData["sub_zone_id"] = app.cSubZone
      }
       if (app.country_id != "") {
        rData["country_id"] = app.country_id
      }
      axios.post(API_URL + "web_get_special_offers"+"?page="+page, rData).then(function(response) {
        let dataOffers = response.data
        dataOffers = dataOffers.data
        if (dataOffers.length > 0) {
          for(let i = 0;i < dataOffers.length; i++) {
            app.offers.push(dataOffers[i])
            app.loadingMore = false
          }
          app.pages.current = response.data.current_page
          app.pages.total = response.data.last_page
          app.pages.results = response.data.total
        }
      });
    },
    imgUrlAlt(event) {
      event.target.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADICAIAAAAMfxhbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA4LTEyVDA1OjAzOjQ0KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA4LTEyVDA1OjAzOjQ0KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wOC0xMlQwNTowMzo0NCswMjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZmFlMmU0Ni0xZDAzLWVlNGEtYjFiOC0yNWM5NzBkMDVmNGQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkNjE0YWFlYS00OTU1LTZmNDUtOGIx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"
    }
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem("lang")
                  app.country_id=localStorage.getItem("country_id")

    axios.post(API_URL + "zones", { country_id: app.country_id }).then(function(response) {
      let zonesData = response.data
      let length = zonesData.length
      let searchLang = {}
      // app.cZone = zonesData[0].id

      if (app.lang == "ar") {
        searchLang = { title_ar: app.keywords }
      } else {
        searchLang = { title_en: app.keywords }
      }
      for (let i = 0; i < length; i++) {
        axios
          .post(API_URL + "sub_zones", { id: zonesData[i].id })
          .then(function(res) {
            let zones = app.zones
            let subZones = res.data.sub_zones
            let zone = {
              data: zonesData[i],
              sub_zones: subZones
            };
            app.zones.push(zone)
          });
          app.getOffers()
      }
    });
  }
};
</script>
<style lang="scss">
$primary-color: #18b4bb;
#Offers {
  width: 100%;
  .page {
    width: 100%;
    min-height: calc(100vh - 165px);
    overflow: hidden;
    .rightNav {
      border-left: 1px #c7c7c7 solid;
      width: 300px;
      float: right;
      transition: 0.3s;
      min-height: 100%;
      height: 100%;
      .navTitle {
        background: $primary-color;
        color: #fff;
        font-size: 120%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        vertical-align: middle;
      }
      .navDd {
        margin: 0;
        padding: 0;
        list-style: none;
        > li {
          cursor: pointer;
          input {
            opacity: 0;
            position: absolute;
          }
          .liCont {
            border-bottom: 1px #c7c7c7 solid;
            height: 45px;
            line-height: 45px;
            vertical-align: middle;
            transition: 0.3s background linear;
            svg {
              left: 0;
              margin-top: -45px;
              position: absolute;
              font-size: 110%;
              color: #898989;
              padding: 13px 10px;
              transition: 0.35s transform;
            }
            span,
            label {
              margin-right: 10px;
              color: #454545;
              font-size: 115%;
              cursor: pointer;
              width: 100%;
              display: block;
            }
            &:hover {
              background: #f7f7f7;
              svg {
                color: $primary-color;
              }
              label,
              span {
                font-weight: 700;
                color: $primary-color;
              }
            }
          }
          input:checked {
            ~ .liCont {
              background: #f7f7f7;
              svg {
                transform: rotate(-90deg);
                transition: 0.35s transform;
                color: $primary-color;
              }
              label,
              span {
                font-weight: 700;
                color: $primary-color;
              }
            }
            ~ ul {
              max-height: 310px;
              overflow: auto;
              transition: max-height 0.35s ease-in-out;
            }
          }
          > ul {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 0px;
            transition: max-height 0.15s;
            overflow: hidden;
            > li {
              transition: 0.3s background linear;
              background: #eff6f3;
              height: 45px;
              vertical-align: middle;
              line-height: 45px;
              .liLiCont {
                padding-right: 15px;
                color: #333333;
                font-size: 115%;
                label {
                  display: block;
                  width: 100%;
                  cursor: pointer;
                }
                &:hover {
                  background: $primary-color;
                  color: #fff;
                }
              }
              input:checked {
                ~ .liLiCont {
                  background: $primary-color;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .leftContent {
      width: calc(100% - 301.5px);
      float: right;
      .contArea {
        .nHeader {
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
        width: 800px;
        max-width: 100%;
        .content {
          padding: 0 40px;
          .contFilters {
            display: inline-block;
            width: 100%;
            padding: 10px 0;
            height: auto;
            line-height: 50px;
            vertical-align: middle;
            border-bottom: 1px #c7c7c7 solid;
            > label {
              color: $primary-color;
              font-weight: 700;
              font-size: 125%;
              display: block;
              width: 100px;
              float: right;
            }
            > input {
              display: block;
              width: calc(100% - 20px);
              margin: 5px;
              padding: 5px;
              height: 40px;
              outline: none;
              border-radius: 4px;
              color: #707070;
              border: 1.5px solid #dadada;
              font-size: 105%;
              font-weight: 700;
              &:focus {
                border-color: $primary-color;
                color: $primary-color;
              }
            }
            ul {
              width: calc(100% - 100px);
              margin: 0;
              padding: 0;
              list-style: none;
              height: auto;
              display: inline-block;
              white-space: nowrap;
              overflow-x: auto;
              li {
                margin-left: 10px;
                height: auto;
                display: inline-block;
                input {
                  opacity: 0;
                  position: absolute;
                }
                label {
                  border-radius: 50px;
                  display: block;
                  line-height: 40px;
                  height: 40px;
                  padding: 0 12px;
                  color: #707070;
                  border: 1.5px #c7c7c7 solid;
                  cursor: pointer;
                  transition: 0.3s;
                  span {
                    display: inline-block;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    font-size: 10px;
                    width: 20px;
                    margin-right: 10px;
                    border-radius: 5px;
                    background: rgba(0, 0, 0, 0.22);
                  }
                }
                &:hover {
                  label {
                    border-color: $primary-color;
                    color: $primary-color;
                  }
                }
                input:checked {
                  ~ label {
                    background: $primary-color;
                    border-color: $primary-color;
                    color: #fff;
                  }
                }
              }
            }
          }
          .results {
            > label {
              display: block;
              text-align: center;
              padding: 10px 0;
              color: #898989;
            }
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              li {
                margin-bottom: 25px;
                box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.32);
                min-height: 175px;
                border-radius: 3px;
                overflow: hidden;
                cursor: pointer;
                transition: 0.3s;
                &:hover {
                  box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.42);
                  background: #f7f7f7;
                }
                .liImg {
                  width: 175px;
                  height: 175px;
                  float: right;
                  border-left: 1px #c7c7c7 solid;
                  line-height: 175px;
                  overflow: hidden;
                  a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    img {
                      width: 100%;
                      max-height: 100%;
                    }
                  }
                }
                .details {
                  height: 175px;
                  width: calc(100% - 176px);
                  float: right;
                  .dText {
                    height: calc(100% - 45px);
                    a {
                      display: block;
                      height: 100%;
                      padding-top: 10px;
                      text-decoration: none;
                      h3 {
                        margin: 0;
                        color: $primary-color;
                      }
                      p {
                        margin: 0;
                        color: #707070;
                      }
                      padding-right: 10px;
                    }
                  }
                  .dPhone {
                    padding-right: 10px;
                    height: 44px;
                    line-height: 44px;
                    border-top: 1px #c7c7c7 solid;
                    vertical-align: middle;
                    a {
                      text-decoration: none;
                      color: #707070;
                      font-weight: 700;
                      transition: 0.3s;
                      &:hover {
                        color: $primary-color;
                      }
                    }
                    svg {
                      color: $primary-color;
                      padding-left: 5px;
                    }
                  }
                }
              }
            }
            .formCtrls {
              text-align: center;
              display: inline-block;
              width: 100%;
              margin: 50px 0;
              margin-top: 10px;
              .btnSuccess {
                text-decoration: none;
                color: #fff;
                background: $primary-color;
                border-radius: 6px;
                padding: 13px 40px;
                transition: 0.3s all;
                cursor: pointer;
                border: 1.5px transparent solid;
                &:hover {
                  background: #fff;
                  color: $primary-color;
                  border: 1.5px $primary-color solid;
                  font-weight: 700;
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
  #Offers {
    width: 100%;
    .page {
      width: 100%;
      min-height: calc(100vh - 120px);
      height: 100%;
      .rightNav {
        border-bottom: 1.5px #c7c7c7 solid;
        border-left: none;
        width: 100%;
        float: none;
        min-height: auto;
        overflow: hidden;
        display: inline-block;
      }
      .leftContent {
        width: 100%;
        float: none;
        display: inline-block;
        .contArea {
          width: 800px;
          max-width: 100%;
          .content {
            padding: 0 20px;
            .contFilters {
              height: auto;
              width: 100%;
              display: inline-block;
              label {
                width: 100%;
                text-align: center;
              }
              ul {
                height: auto;
                width: 100%;
                text-align: center;
                li {
                  float: none;
                  margin: 0 12px;
                  padding: 5px 4px;
                }
              }
            }
            .results {
              ul {
                li {
                  .liImg {
                    width: 100%;
                    line-height: unset;
                    border-left: none;
                    border-bottom: 1px #e7e7e7 solid;
                    height: auto;
                    padding: 15px 0;
                  }
                  .details {
                    width: 100%;
                    height: auto;
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
