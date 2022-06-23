<template>
    <div id="MedicalNet">
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
                        <div class="liCont" >
                            <label @click="setCZone(zone.data.id)" v-bind="{ 'for': 'area-'+zone.data.id }" >{{ lang == 'ar' ? zone.data.title_ar : zone.data.title_en }}</label>
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
                    <div class="content">
                        <div class="contFilters">
                            <input type="text" v-bind="{'placeholder': lang == 'ar' ? 'كلمات البحث' : 'Keywords', 'dir' : lang == 'ar' ? 'rtl' : 'ltr'}" @keydown="searchCompanies" v-model="keywords">
                        </div>
                        <div class="contFilters">
                            <label>{{ lang == 'ar' ? 'فلتر البحث' : 'Filters' }}</label>
                            <ul data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-easing="ease-in-out"
                                data-aos-anchor-placement="top-center"
                                class="custom-scrollbar vertical">
                                <!-- <li v-if="!specialistsLoading">
                                    <input type="radio" name="specialist" id="specialist" v-bind="{ 'value': null, 'checked': cSpecialist == '' ? true : false }">
                                    <label for="specialist" @click="setCSpecialists('')">
                                        {{ lang == 'ar' ? 'الكل' : 'All' }}
                                    </label>
                                </li> -->
                                <!-- <li v-if="specialistsLoading">
                                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                </li> -->
                                <li>
                                    <input type="radio" name="specialist" :checked="other_services == 2">
                                    <label @click="getHotels()" >{{ lang == 'ar' ? `الفنادق` : `Hotels` }}</label>
                                </li>
                                <li>
                                    <input type="radio" name="specialist" :checked="other_services == 3">
                                    <label  @click="getFlights()" >{{ lang == 'ar' ? `الطيران` : `Flights` }}</label>
                                </li>
                            </ul>
                            <!-- <ul data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-easing="ease-in-out"
                                data-aos-anchor-placement="top-center"
                                class="custom-scrollbar vertical">
                                <li v-if="!specialistsLoading">
                                      <button type="button"  @click="getHotels()">{{ lang == 'ar' ? `الفنادق` : `Hotels` }}</button>

                                </li>
                                <li v-if="!specialistsLoading">
                                      <button type="button"   @click="getFlights()">{{ lang == 'ar' ? `الطيران` : `Flights` }}</button>

                                </li>
                                
                            </ul> -->
                        </div>
                        
                        <div class="results">
                            <label v-if="companies.length > 0 && companies != 'search' && companies != 'none' && lang == 'ar'">يوجد {{ pages.results }} نتيجة بحث</label>
                            <label v-if="companies == 'none' && lang == 'ar'">عفواً لا توجد نتيجة للبحث</label>
                            <label v-if="companies == 'search' && companies != 'none' && lang == 'ar'">
                                <!-- <font-awesome-icon class="spinner" icon="spinner" />&ensp; -->
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                جاري البحث..
                            </label>
                            <!-- Lang = En -->
                            <label v-if="companies.length > 0 && companies != 'search' && companies != 'none' && lang == 'en'">Found {{pages.results}} search results</label>
                            <label v-if="companies == 'none' && lang == 'en'">Sorry, no search results were found</label>
                            <label v-if="companies == 'search' && companies != 'none' && lang == 'en'">
                                <!-- <font-awesome-icon class="spinner" icon="spinner" />&ensp; -->
                                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                                Searching..
                            </label>
                            <ul v-if="companies.length > 0 && companies != 'search' && companies != 'none'">
                                <li v-for="company of companies">
                                    <div class="liImg">
                                        <router-link :to="{ name: 'Company', params: {id: company.id} }">
                                            <img :src="'https://api.alreaaiaa.com/'+company.image" @error="imgUrlAlt">
                                        </router-link>
                                    </div>
                                    <div class="details">
                                        <div class="dText">
                                            <router-link :to="{ name: 'Company', params: {id: company.id} }">
                                                <h3>{{ lang == 'ar' ? company.title_ar : company.title_en }}</h3>
                                                <p>{{ lang == 'ar' ? company.short_desc_ar : company.short_desc_en }}</p>
                                            </router-link>
                                        </div>
                                        <div class="dPhone">
                                            <font-awesome-icon icon="phone" />
                                            <a  v-for="(phone, index) in company.phones" :key="phone.id" v-if="company.phones[0] != undefined" :href="'tel:'+ phone.phone">{{ phone.phone }}{{ index != (company.phones.length - 1) && phone.phone != null ? ' - ' : '' }}</a>
                                            <a v-if="company.phones[0] == undefined" href="#">{{ lang == 'ar' ? 'لا يوجد' : 'N/A' }}</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-if="pages.current < pages.total && companies.length > 0 && companies != 'search' && companies != 'none'" class="formCtrls">
                                <a v-if="!loadingMore" @click="getMoreCompanies(pages.current + 1)" class="btnSuccess">{{ lang == 'ar' ? 'ﻋﺮض اﻟﻤﺰﻳﺪ ..' : 'Show more..' }}</a>
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
//const API_URL = "https://alreaaiaa.net/api/public/api/"
     const API_URL = "https://api.alreaaiaa.com/api/";
    export default {
  name: "MedicalNet",
  metaInfo: {
      title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
    },
  data() {
    return {
      zones: [],
      cZone: "",
      cSubZone: "",
      keywords: "",
      specialists: [],
      cSpecialist: "",
      other_services:2,
      country_id:[],
      companies: [],
      specialistsLoading: false,
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
      app.specialistsLoading = true
      let cSubZones = document.getElementsByName("city");
      cSubZones.forEach(element => {
        element.checked = false;
      });
      app.cSpecialist = ""
      app.getCompanies();
    },
    setCSubZone(id) {
      let app = this;
      app.cSubZone = id;
      app.cSpecialist = ""
      app.specialistsLoading = true
      app.getCompanies();
    },
    setCSpecialists(id) {
      let app = this;
      app.cSpecialist = id;
      app.getCompanies();
    },
    searchCompanies() {
      let app = this
      if(app.keywords.length > 2 && app.onSearch == false) {
        app.onSearch = true
        app.specialistsLoading = true
        setTimeout(() => {
          app.getCompanies()
        }, 500);
      }
    },
    getFlights(){
        let app =this
        app.other_services = 3
        app.getCompanies();
    },
    getHotels(){
        let app =this
        app.other_services = 2
        app.getCompanies();
    },
    getCompanies() {
      let app = this;
      app.companies = "search"
      app.loadingMore = false
      app.specialistsLoading = true
      let rData = {};
      if (app.keywords != "") {
        rData["title"] = app.keywords
      }
      if (app.cZone != "") {
        rData["zone_id"] = app.cZone
      }
      if (app.cSubZone != "") {
        rData["sub_zone_id"] = app.cSubZone
      }
      if (app.cSpecialist != "") {
        rData["health_specialist_id"] = app.cSpecialist
      }
      if (app.country_id != "") {
        rData["country_id"] = app.country_id
      }
      axios.post(API_URL + "web_search_by_all/"+app.lang+"?other_services="+app.other_services, rData).then(function(response) {
        let dataCompanies = response.data

        if (
          dataCompanies.data != undefined &&
          dataCompanies.data.length > 0
        ) {
          app.companies = dataCompanies.data;
          app.pages.current = response.data.current_page
          app.pages.total = response.data.last_page
          app.pages.results = response.data.total
        } else {
          app.companies = "none"
        }
        app.getSpecialists()
        app.onSearch = false
      });
    },
    findInAllCompanies(searchLang) {
      let app = this
      app.companies = "search"
      app.specialistsLoading = true
      let rData = {}
      axios
        .post(API_URL + "search_by_company_name", searchLang)
        .then(function(response) {
          let dataCompanies = response.data
          if (dataCompanies.length > 0) {
            app.companies = dataCompanies
          } else {
            app.companies = "none"
          }
          app.getSpecialists()
        });
    },
    getSubZoneCompanies() {
      let app = this;
      app.companies = "search"
      app.specialistsLoading = true
      axios
        .post(API_URL + "get_comp", {
          id: app.cSubZone
        })
        .then(function(response) {
          let dataCompanies = response.data
          if (
            dataCompanies.companies != undefined &&
            dataCompanies.companies.length > 0
          ) {
            app.companies = dataCompanies.companies
          } else {
            app.companies = "none"
          }
          app.getSpecialists()
        });
    },
    getAllCompanies() {
      let app = this;
      app.companies = "search"
      app.specialistsLoading = true
      let rData = {}
      axios.get(API_URL + "get_all_companies").then(function(response) {
        let dataCompanies = response.data
        dataCompanies = dataCompanies.data
        if (dataCompanies.length > 0) {
          app.companies = dataCompanies
          app.pages.current = response.data.current_page
          app.pages.total = response.data.last_page
          app.pages.results = response.data.total
        } else {
          app.companies = "none"
        }
        app.getSpecialists()
      });
    },
    getMoreCompanies(page) {
      let app = this;
      app.loadingMore = true
      let rData = {};
      if (app.keywords != "") {
        rData["title"] = app.keywords
      }
      if (app.cZone != "") {
        rData["zone_id"] = app.cZone
      }
      if (app.cSubZone != "") {
        rData["sub_zone_id"] = app.cSubZone
      }
      if (app.cSpecialist != "") {
        rData["health_specialist_id"] = app.cSpecialist
      }
       if (app.country_id != "") {
        rData["country_id"] = app.country_id
      }
      axios.post(API_URL + "web_search_by_all/"+app.lang+"?page="+page, rData).then(function(response) {
        let dataCompanies = response.data
        dataCompanies = dataCompanies.data
        if (dataCompanies.length > 0) {
          for(let i = 0;i < dataCompanies.length; i++) {
            app.companies.push(dataCompanies[i])
            app.loadingMore = false
          }
          app.pages.current = response.data.current_page
          app.pages.total = response.data.last_page
          app.pages.results = response.data.total
        }
      });
    },
    getSpecialists() {
      let app = this
      let rData = {}
      if (app.cZone != "") {
        rData["zone_id"] = app.cZone
      }
      if (app.cSubZone != "") {
        rData["sub_zone_id"] = app.cSubZone
      }
      axios.post(API_URL + "web_getSpecialists", rData).then(function(response) {
        app.specialists = response.data
        app.specialistsLoading = false
      });
    },
    imgUrlAlt(event) {
      event.target.src =
        "data:image/png;base64,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"
    }
  },
  created: function() {
    let app = this;
    app.getCompanies();
    if (app.$route.query.keywords != undefined) {
      app.keywords = app.$route.query.keywords
    }
        app.country_id=localStorage.getItem("country_id")

    app.lang = localStorage.getItem("lang")
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
      }
      app.getCompanies()
    });
  }
};
</script>
<style lang="scss">

$primary-color: #18b4bb;

#MedicalNet {
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
  #MedicalNet {
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
