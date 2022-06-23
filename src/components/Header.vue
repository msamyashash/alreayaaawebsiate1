<template>
<div class="header" :dir="lang==`en`?`ltr`:`rtl`">
  <div class="top-header notifications" v-if="!isVisitor"  v-bind="{ 'class' : noti ? 'active' : '' }">
    <div class="header-title">
      <span>{{ lang == 'ar' ? 'بطاقة الرعاية الصحية' : 'Health Care Card' }}</span>
    </div>
    <div class="header-buttons">
      <div class="header-lang-button" @click="setLang(lang == 'ar' ? 'en' : 'ar')">
        <span>{{ lang == 'ar' ? 'English' : 'عربي' }}</span>
      </div>

      <div class="" v-bind:class="{ 'header-search-active': search==true, 'header-search-notactive': search==false }" >
        <input class="" type="text" v-bind="{ placeholder : lang == 'ar' ? 'بحث' : 'Search'}" @keyup="searchFunc($event)" v-model="keywords" />
        <div class="search-icon">
          <i class='bx bx-search'></i>
        </div>
        
      </div>

      <div class="header-icon" @click="toggleSearch()" >
        <i class='bx bx-search'></i>
      </div>

      <div class="header-icon" @click="toggleGlobe()"  v-on-clickaway="awayglobe">
        <div class="dropdown" style="float:right;">
          <font-awesome-icon size="1x" icon="globe" />
          <!-- <button class="dropbtn">{{lang == 'ar' ? selectedCountry.title_ar : selectedCountry.title_en}}</button> -->
          <div class="" v-bind:class="{ 'dropdown-content-active': globe==true, 'dropdown-content-notactive': globe==false }">
            <a
              v-for="(countryy, index) in countries"
              :key="index"
              @click="setCountry(countryy)"
            >{{ lang == 'ar' ? countryy.title_ar : countryy.title_en }}</a>
          </div>
        </div>
      </div>
      
      <div class="header-icon" @click="toggleNoti()"  v-on-clickaway="away">
        <i class='bx bx-bell'></i>
        <div class="counter" v-if="notifications.length > 0">{{ notifications.length }}</div>
      </div>
      

    </div>
    <!-- NOTIFICATIONS DROPDOWN -->
    <div v-bind:class="{ 'nDropDown-active': noti==true, 'nDropDown-notactive': noti==false }">
      <ul>
        <div v-for="n in notifications" :key="n.id">
          <li v-if="n.special_offer_id != null" @click="gotTo('/Offers/'+n.special_offer_id)">
            <div class="nImg">
              <img src="../assets/imgs/header/unread.png" />
            </div>
            <div class="nDetails">
              <h3>{{ lang == 'ar' ? n.special_offer.title_ar : n.special_offer.title_en }}</h3>
            </div>
          </li>
          <li v-if="n.event_id != null" @click="gotTo('/Events/'+n.events.id)">
            <div class="nImg">
              <img src="../assets/imgs/header/unread.png" />
            </div>
            <div class="nDetails">
              <h3>{{ lang == 'ar' ? n.events.title_ar : n.events.title_en }}</h3>
            </div>
          </li>
          <li v-if="n.contract_id != null" @click="gotTo('/Contracts')">
            <div class="nImg">
              <img src="../assets/imgs/header/unread.png" />
            </div>
            <div class="nDetails">
              <h3>{{ lang == 'ar' ? n.contract.title_ar : n.contract.title_en }}</h3>
            </div>
          </li>
          <li v-if="n.description_ar != null">
            <div class="nImg">
              <img src="../assets/imgs/header/unread.png" />
            </div>
            <div class="nDetails">
              <h3>{{ lang == 'ar' ? n.description_ar : n.description_en }}</h3>
            </div>
          </li>
        </div>
        <li
          v-if="notifications.length <= 0"
          class="noNoti"
        >{{ lang == 'ar' ? 'لا توجد إشعارات الأن' : 'No notifications available' }}</li>
      </ul>
    </div>
  </div>

  

  <div class="navbar">
    <div class="navlinks-block" >
      <router-link class="router-link" to="/" exact>
        <div class="logo">
          <img src="../assets/imgs/header/reaaialogo.png" alt="شعار الرعاية الصحية" />
        </div>
      </router-link>
      
      <div class="navlinks-link">
        <span><router-link class="router-link" to="/" exact>{{ lang == 'ar' ? 'الرئيسية' : 'Home' }}</router-link></span>
      </div>
      <div class="navlinks-link">
        <span><router-link class="router-link" to="/Medical-Network">{{ lang == 'ar' ? 'الشبكة الطبية' : 'Medical Network' }}</router-link></span>
      </div>
      <div class="navlinks-link">
        <span><router-link class="router-link" to="/serviceNet">{{ lang == 'ar' ? 'الخدمات المساندة' : 'Other Services' }}</router-link></span>
      </div>
      <div class="navlinks-link">
        <span><router-link class="router-link" to="/Offers">{{ lang == 'ar' ? 'عروض' : 'Offers' }}</router-link></span>
      </div>
      <div class="navlinks-link">
        <span><router-link class="router-link" to="/Contact-Us">{{ lang == 'ar' ? 'تواصل معنا' : 'Contact' }}</router-link></span>
      </div>

    </div>
    <div class="order-card-block">
      <div class="router-link-button"  @click="goToAddCard()">
        <div class="order-card-button">
          <span>{{ lang == 'ar' ? 'اطلب بطاقة' : 'Order Card' }}</span>
        </div>
      </div>
      
    </div>

    <div class="navbar-menu-block" @click="menuopen=!menuopen">
      
      <i class='bx bx-menu'></i>
      
    </div>

    <div class="navbar-side-menu-block" v-bind:class="{ 'animation-open': menuopen==true, 'animation-close': menuopen==false }" >
      <div class="top-close" @click="menuopen=false">
        <i class='bx bx-x'></i>
      </div>
      <div class="logo-top-menu">
        <img src="../assets/imgs/header/reaaialogo.png" alt="شعار الرعاية الصحية" />
      </div>
      <div class="side-menu-links-block">
        <div class="side-menu-link">
          <span><router-link class="router-link" to="/" exact>{{ lang == 'ar' ? 'الرئيسية' : 'Home' }}</router-link></span>
        </div>
      
      
        <div class="side-menu-link">
          <span><router-link class="router-link" to="/Medical-Network">{{ lang == 'ar' ? 'الشبكة الطبية' : 'Medical Network' }}</router-link></span>
        </div>
      
      
        <div class="side-menu-link">
          <span><router-link class="router-link" to="/serviceNet">{{ lang == 'ar' ? 'الخدمات المساندة' : 'Other Services' }}</router-link></span>
        </div>
      
      
        <div class="side-menu-link">
          <span><router-link class="router-link" to="/Offers">{{ lang == 'ar' ? 'عروض' : 'Offers' }}</router-link></span>
        </div>
      
      
        <div class="side-menu-link">
          <span><router-link class="router-link" to="/Contact-Us">{{ lang == 'ar' ? 'تواصل معنا' : 'Contact' }}</router-link></span>
        </div>
        <div class="side-menu-add-card">
          <span><router-link class="router-link" to="/Subscribe">{{ lang == 'ar' ? 'اطلب بطاقة' : 'Order New Card' }}</router-link></span>
        </div>

      </div>
      
    </div>

  </div>
  
</div>

</template>
<script>
import { directive as onClickaway } from 'vue-clickaway';


const axios = require("axios");
// const API_URL = "https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/"
//const API_URL = "http://alreaaiaa.net/api/public/api/"
const API_URL = "https://api.alreaaiaa.com/api/";
export default {

  directives: {
    onClickaway: onClickaway,
  },

  name: "Header",
  metaInfo: {
    title:
      localStorage.getItem("lang") == "en" ? "Health Care" : "الرعاية الصحية"
  },
  data() {
    return {
      lang: "ar",
      keywords: "",
      selected: 1,
      countries: [],
      notifications: [],
      menu: false,
      search: false,
      noti: false,

      menuopen: false,
      globe:false,
    };
  },
  computed: {
    goToAddCard() {
      window.open("/Subscribe", "_self");
    },
    isVisitor() {
      const visitorLinks = ["MedicalNetVisitor", "CompanyVisitor"];
      return visitorLinks.includes(this.$route.name);
    },
    selectedCountry() {
      return localStorage.country_id
        ? this.countries.filter(
            country => country.id == localStorage.country_id
          )[0]
        : this.countries[0];
    }
  },

  
  methods: {
    away: function() {
      
      if (this.noti == true) {
        // alert('noti is true');
        this.noti=false;
      }else{
        // alert('noti is false');
        
      }
    },
    awaysearch: function() {
      
      if (this.search == true) {
        // alert('noti is true');
        this.search=false;
      }else{
        // alert('noti is false');
        
      }
    },
    awayglobe: function() {
      
      if (this.globe == true) {
        // alert('noti is true');
        this.globe=false;
      }else{
        // alert('noti is false');
        
      }
    },
    awaymenu: function() {
      
      if (this.menuopen == true) {
        // alert('noti is true');
        this.menuopen=false;
      }else{
        // alert('noti is false');
        
      }
    },

    closenoti(){},


    getCountry() {
      let app = this;
      axios.get(API_URL + "countries").then(function(response) {
        app.countries = response.data;
      });
    },

    

    

    

    

    setCountry(country) {
      let app = this;
      this.selectedCountry = country;
      localStorage.setItem("country_id", country.id);

      location.reload();
    },

    setLang(lang) {
      localStorage.setItem("lang", lang);
      // console.log(lang);
      this.$router.go();
    },
    searchFunc(event) {
      if (this.keywords.length > 0 && event.keyCode == 13) {
        // console.log("enter pressed");
        if (this.isVisitor) {
          this.$router.push({
            // path: "/Medical-Network-Visitors",
            name: "MedicalNetVisitor",
            query: { keywords: this.keywords }
          });
        } else {
          this.$router.push({
            path: "/Medical-Network",
            query: { keywords: this.keywords }
          });
          // this.$router.go({
          //   path: "/Medical-Network",
          //   query: { keywords: this.keywords }
          // });
        }
      }
    },
    toggleMenu() {
      let app = this;
      if (app.menu == false) {
        app.menu = true;
      } else {
        app.menu = false;
      }
    },
    toggleSearch() {
      let app = this;
      if (app.search == false) {
        app.search = true;
      } else {
        app.search = false;
      }
    },
    toggleNoti() {
      let app = this;
      if (app.noti == false) {
        app.noti = true;
      } else {
        app.noti = false;
      }
      // let app = this;

      // app.noti = !app.noti;
    },
    toggleGlobe() {
      let app = this;
      if (app.globe == false) {
        app.globe = true;
      } else {
        app.globe = false;
      }
      // let app = this;

      // app.noti = !app.noti;
    },
    gotTo(url) {
      // this.$router.push(url)
      // this.$router.go(url)
      let baseUrl = window.location.origin;
      window.location = baseUrl + url;
    }
  },

  

  created: function() {
    let app = this;
    app.getCountry();
    if (localStorage.getItem("country_id") != null) {
      app.selected = localStorage.getItem("country_id");
    } else {
      app.selected = 1;
      localStorage.setItem("country_id", 1);
    }

    app.lang = localStorage.getItem("lang");
    axios.get(API_URL + "web_get_notifications").then(function(response) {
      app.notifications = response.data.data;
    });
  }
};




</script>
<style lang="scss">
@import "boxicons/css/boxicons.min.css";

.border-test {
  border: 1px solid red
}
.border-test1 {
  border: 1px solid blue
}
.border-test2 {
  border: 1px solid green
}
$primary-color: #18b4bb;
$gray-color :rgb(82, 82, 82);
$small-size: 500px;

$padding-main : 40px;
$small-padding-main: 20px;

// CUSTOM DESIGN
.header {
  width: 100%;
  
  
  
  .top-header {
    
    width: 100%;
    height: 60px;
    background-color: $primary-color;
    color: white;
    display: flex;
    justify-content: space-between;
    position: relative;
    // z-index: 3;
    
    // position: absolute;
    .nDropDown-active{
      position: absolute;
      text-align: right;
      z-index: 2;
      background: #fff;
      height: 400px;
      opacity: 1;
      max-height: 366px;
      // min-width: 350px;
      max-width: 380px;
      margin-left: 20px;
      left: 0;
      top: 60px;
      overflow: auto;
      border-radius: 4px;
      box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);
      transition: 0.3s all;
      @media only screen and (max-width: $small-size){
        width: 90%;
      }
      .nArrow {
        position: absolute;
        margin-top: -20px;
        margin-right: 30px;
        z-index: 10001;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: auto;
        max-height: 366px;
        overflow: auto;
        border-radius: 4px;
        li {
          height: auto;
          max-height: 122px;
          width: 100%;
          display: inline-block;
          padding: 10px 0;
          overflow: hidden;
          border-bottom: 1.5px #e7e7e7 solid;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: #f7f7f7;
          }
          .nImg {
            width: 80px;
            float: right;
            img {
              width: 50px;
              padding: 10px 15px;
            }
          }
          .nDetails {
            width: calc(100% - 80px);
            float: right;
            overflow: hidden;
            h3 {
              margin: 0;
              font-weight: 700;
              color: #707070;
              font-size: 105%;
              cursor: pointer;
            }
            p {
              margin: 0;
              font-size: 80%;
              line-height: 19px;
              padding-left: 10px;
              color: #909090;
              cursor: pointer;
            }
          }
        }
      }
    }
    .nDropDown-notactive{
      position: absolute;
      text-align: right;
      z-index: 2;
      background: #fff;
      height: 400px;
      opacity: 1;
      max-height: 366px;
      // min-width: 350px;
      max-width: 380px;
      margin-left: 20px;
      left: 0px;
      top: -400px;
      overflow: auto;
      border-radius: 4px;
      box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);
      transition: 0.3s all;
      @media only screen and (max-width: $small-size){
        width: 90%;
      }
      .nArrow {
        position: absolute;
        margin-top: -20px;
        margin-right: 30px;
        z-index: 10001;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: auto;
        max-height: 366px;
        overflow: auto;
        border-radius: 4px;
        li {
          height: auto;
          max-height: 122px;
          width: 100%;
          display: inline-block;
          padding: 10px 0;
          overflow: hidden;
          border-bottom: 1.5px #e7e7e7 solid;
          overflow: hidden;
          cursor: pointer;
          &:hover {
            background: #f7f7f7;
          }
          .nImg {
            width: 80px;
            float: right;
            img {
              width: 50px;
              padding: 10px 15px;
            }
          }
          .nDetails {
            width: calc(100% - 80px);
            float: right;
            overflow: hidden;
            h3 {
              margin: 0;
              font-weight: 700;
              color: #707070;
              font-size: 105%;
              cursor: pointer;
            }
            p {
              margin: 0;
              font-size: 80%;
              line-height: 19px;
              padding-left: 10px;
              color: #909090;
              cursor: pointer;
            }
          }
        }
      }
    }
    .header-title {
      padding-inline-start: $padding-main;
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: start;
      @media only screen and (max-width: $small-size){
        width: auto;
        padding-inline-start: $small-padding-main;
      }
    }
    .header-buttons {
      padding-inline-end: $padding-main;
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: end;
      @media only screen and (max-width: $small-size){
        padding-inline-end: $small-padding-main;
        width: auto;
      }
      .header-icon {
        height: 100%;
        min-width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        position: relative;
        cursor: pointer;
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content-notactive {
          display: none;
          position: absolute;
          right: -120px;
          top: 51px;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          text-align: left;
        }
        .dropdown-content-active {
          display: block;
          position: absolute;
          right: -120px;
          top: 51px;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          text-align: center;
        }

        .dropdown-content-active a {
          color: black;
          padding: 2px 4px;
          text-decoration: none;
          display: block;
          cursor: pointer;
          font-size: 16px;
        }

        .dropdown-content-active a:hover {
          background-color: #f1f1f1;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }
        &:hover {
          background-color: rgba($color: white, $alpha: 0.22);
        }
        @media only screen and (max-width: $small-size){
          min-width: 35px;
        }
        .counter {
          
          top: -10px;
          left: 12px;
          position: absolute;
          margin-right: 21px;
          margin-top: 20px;
          vertical-align: middle;
          line-height: 15px;
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          background: #dd4b4b;
          padding: 2px 4px 2px 3px;
          font-weight: 900;
          @media only screen and (max-width: $small-size){
            left: -2px;
          }
        }
      }
      .header-lang-button {
        height: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: 18px;
        cursor: pointer;
        padding: 0 10px;
        &:hover {
          background-color: rgba($color: white, $alpha: 0.22);
        }
      }
      .header-search-active {
        position: absolute;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        top: 60px;
        width: 300px;
        height: 40px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid $primary-color;
        z-index:4 ;
        transition: all 0.4s;
        opacity: 1;
        box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.25);
        .search-icon {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $gray-color;
          font-size: 32px;
          transition: all 0.4s;
          cursor: pointer;
          &:hover {
            background-color: rgba($color: $primary-color, $alpha: 0.22);
          }
        }
        input {
          width: 80%;
          height: 38px;
          border-radius: 5px;
          padding: 0 20px 0 20px;
          border: 0;
          &:focus {
              outline: none !important;
          }
          &::placeholder {
              color: $gray-color;
              font-size: 16px;
              font-weight: 700;
          }
        }
      }
      .header-search-notactive {
        position: absolute;
        // display: flex;
        // justify-content: space-between;
        align-items: center;
        top: 0px;
        width: 300px;
        height: 40px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid $primary-color;
        z-index:4 ;
        transition: all 0.4s;
        opacity: 0;
        display:none;

        .search-icon {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $gray-color;
          font-size: 32px;
          transition: all 0.4s;
          cursor: pointer;
          &:hover {
            background-color: rgba($color: $primary-color, $alpha: 0.22);
          }
        }
        input {
          width: 80%;
          height: 38px;
          border-radius: 5px;
          padding: 0 20px 0 0;
          border: 0;
          &:focus {
              outline: none !important;
          }
          &::placeholder {
              color: $gray-color;
              font-size: 16px;
              font-weight: 700;
          }
        }
      }
    }
  }
  
  .navbar {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    .navlinks-block {
      // padding-inline-start: $padding-main;
      padding: 0 $padding-main 0 0;
      width: auto;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .logo {
        width: auto;
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0 0 0 30px;
        img {
          height: 80%;
          object-fit: cover;
        }
      }
      .navlinks-link {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: 600;
        margin: 0 20px;
        color: rgb(82, 82, 82);
        @media only screen and (max-width: $small-size){
          display: none;
        }
        span {
          .router-link {
            color: rgb(82, 82, 82);
            text-decoration: none;
            transition: all 0.4s;
            &:hover {
              color: $primary-color;
            }
          }
          .router-link-active {
              color: $primary-color;
          }
        }
      }
    }
    .order-card-block {
      padding-inline-end: $padding-main;
      height: 100%;
      width: auto;
      display: flex;
      align-items: center;
      justify-content: end;
      @media only screen and (max-width : $small-size){
        display: none;
      }
      .router-link-button {
        cursor: pointer;
        color: white;
        text-decoration: none;
      }
      .order-card-button {
        width: 170px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $primary-color;
        border: 2px solid $primary-color;
        color: white;
        font-weight: 600;
        font-size: 18px;
        border-radius: 5px;
        transition: all 0.4s;
        &:hover {
          background-color: white;
          color: $primary-color;
          // border: 2px solid $primary-color;
        }
        

      }
    }

    .navbar-menu-block {
      display: none;
      @media only screen and (max-width: $small-size){
        padding-inline-end: $small-padding-main;
        display: flex;
        align-items: center;
        font-size: 34px;
        color: $gray-color;
      }
    }

    .animation-open {
      right: 0;
      transition: all 0.4s;
      box-shadow: 5px 4px 8px 5px rgba(0, 0, 0, 0.25), 5px 6px 8px 5px rgba(0, 0, 0, 0.25);
    }
    .animation-close {
      right: -200px;
      transition: all 0.4s;
      box-shadow: 5px 4px 8px 5px rgba(0, 0, 0, 0), 5px 6px 8px 5px rgba(0, 0, 0, 0);

    }

    .navbar-side-menu-block {
      display:none;
      @media only screen and (max-width: $small-size){
        width: 200px;
        height: 100vh;
        position: fixed;
        
        // border: 1px solid $primary-color;
        
        top: 0px;
        background-color: white;
        z-index: 1;
        display: block;
        transition: all 0.4s;
        
        .top-close {
          display: flex;
          justify-content: end;
          font-size: 40px;
        }
        .logo-top-menu {
          width: 100%;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            object-fit: cover;
            height: 100%;
          }
        }
        .side-menu-links-block {
          width: 100%;
          .side-menu-link {
            margin: 5px 0 0 0;
            width: 100%;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba($color: $primary-color, $alpha: 0.22);
            .router-link {
              text-decoration: none;
              color: $gray-color;
              // font-weight: 600;
            }
          }
          .side-menu-add-card {
            margin: 5px 0 0 0;
            width: 100%;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba($color: $primary-color, $alpha: 1.0);
            .router-link {
              text-decoration: none;
              color: white;
              // font-weight: 600;
            }
          }
        }
      }
      
    }
  }
  
 
}

#Header {
  height: 75px;
  background: #fff;
  left: 0;
  right: 0;
  z-index: 1001;
  width: 100%;
  padding: 10px 0;
  box-shadow: inset -1em 1em 3em #f4f7f2, 0 0 3px 1px rgba($color: #000000, $alpha: 0.22);
  position: absolute;

  .noNoti {
    text-align: center;
    color: #707070;
    vertical-align: middle;
    line-height: 70px;
  }

  .logo {
    float: right;
    margin-right: 15px;
    margin-left: 15px;
    height: 45px;
    padding-top: 13px;
    max-width: 15%;

    img {
      height: 100%;
      padding: 5px;
    }
  }

  .nav {
    float: right;
    width: 85%;
    max-width: 85%;
    
    .menu {
      float: right;
      width: 70%;
      max-width: 70%;

      .menuToggle {
        display: none;
      }

      ul {
        list-style: none;
        margin: 0;
        padding-top: 15px;
        padding-right: 0;

        li {
          float: right;
          padding: 10px 5px;

          a {
            text-decoration: none;
            color: #89898a;
            font-size: 90%;
            font-weight: 700;
            transition: 0.3s;
            &:hover {
              color: #18b4bb;
            }
            &.router-link-active {
              color: #18b4bb;
            }
          }
        }
      }
    }

    .search {
      float: left;
      width: 30%;
      max-width: 30%;
      padding: 0;
      
      .search-bar {
        position: relative;
        float: left;
        width: calc(70% - 22px);
        padding: 2px 7px;
        margin: 24px 0;
        margin-right: 20px;
        border-radius: 50px;
        background: #fff;
        height: 30px;
        border: 1.25px #bdc8d5 solid;

        input {
          width: 85%;
          color: #707070;
          font-size: 100%;
          padding: 0 2.5%;
          text-align: right;
          margin: 0 auto;
          border: none;
          outline: none;
          background: transparent;
        }

        svg {
          color: #bdc8d5;
          position: absolute;
          top: 11px;
          left: 12px;
        }
      }

      .nav-icons {
        > div {
          float: left;

          svg {
            font-size: 1.2em;
            margin-top: 1.7em;
            color: #44b899;
            cursor: pointer;
          }
        }
      }

      .notifications {
        position: relative;

        svg {
          margin-right: 0.8em;
        }

        &.active {
          .nDropDown {
            position: fixed;
            left: 0;
            top: 90px;
            opacity: 1;
            transition: 0.5s;
            z-index: 1000;
            height: auto;
            overflow: visible;
          }
        }

        .counter {
          cursor: pointer;
          top: 0;
          position: absolute;
          margin-right: 21px;
          margin-top: 20px;
          vertical-align: middle;
          line-height: 15px;
          border-radius: 50%;
          color: #fff;
          font-size: 10px;
          background: #dd4b4b;
          padding: 2px 4px 2px 3px;
          font-weight: 900;
        }
        .nDropDown {
          position: absolute;
          text-align: right;
          z-index: -1;
          background: #fff;
          height: 0;
          opacity: 0;
          max-height: 366px;
          min-width: 350px;
          max-width: 380px;
          margin-left: 20px;
          left: 0;
          overflow: auto;
          border-radius: 4px;
          box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.25);
          transition: 0.3s opacity;
          .nArrow {
            position: absolute;
            margin-top: -20px;
            margin-right: 30px;
            z-index: 10001;
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
            height: auto;
            max-height: 366px;
            overflow: auto;
            border-radius: 4px;
            li {
              height: auto;
              max-height: 122px;
              width: 100%;
              display: inline-block;
              padding: 10px 0;
              overflow: hidden;
              border-bottom: 1.5px #e7e7e7 solid;
              overflow: hidden;
              cursor: pointer;
              &:hover {
                background: #f7f7f7;
              }
              .nImg {
                width: 80px;
                float: right;
                img {
                  width: 50px;
                  padding: 10px 15px;
                }
              }
              .nDetails {
                width: calc(100% - 80px);
                float: right;
                overflow: hidden;
                h3 {
                  margin: 0;
                  font-weight: 700;
                  color: #707070;
                  font-size: 105%;
                  cursor: pointer;
                }
                p {
                  margin: 0;
                  font-size: 80%;
                  line-height: 19px;
                  padding-left: 10px;
                  color: #909090;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
.header-fix {
  height: 35px;
}

  #Header {
    height: 55px;
    padding: 10px 0;

    .logo {
      padding-top: 2px;
    }
    .nav {
      width: 83%;
      max-width: 83%;
      .menu {
        width: 78%;
        min-width: 78%;
        margin: 0;
        ul {
          padding-top: 9px;
          li {
            padding: 5px;
            a {
              font-size: 0.73em;
            }
          }
        }
      }

      .search {
        width: 21%;
        max-width: 21%;

        &.active {
          max-width: 34%;
          width: 355px;
          display: inline-block;
          padding: 0;
        }
        .search-bar {
          width: 65px;
          margin: 14px 3px;

          input {
            font-size: 75%;
          }
        }
        .nav-icons {
        > div {
          float: left;

          svg {
            font-size: 1em;
            margin-top: 1.5em;
          }
        }
      }

        .notifications {
          svg {
            margin-left: 3px;
            margin-right: 3px;
          }
          
          &.active .nDropDown {
            top: 70px !important;
            max-width: 350px;
            .nArrow {
              margin-right: 120px;
            }
          }

          .counter {
            margin-right: 10px;
            margin-top: 16px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  #Header {
    padding: 5px 0;
    height: 70px;
    .logo {
      width: 125px;
      height: 55px;
      margin: 0 auto;
      padding-left: 20px;
      padding-right: 10px;
      img {
        width: auto;
        max-width: 100%;
        padding: 5px 0;
      }
    }
    .nav {
      float: right;
      width: calc(100% - 160px);
      .menu {
        width: 200px;
        position: absolute;
        z-index: 9999;
        &:hover {
          z-index: 9999999 !important;
        }
        .menuToggle {
          display: inline-block;
          color: #909090;
          text-align: right;
          cursor: pointer;
          line-height: 40px;
          font-size: 120%;
          font-weight: 700;
        }
        ul {
          z-index: 9999;
          position: absolute;
          background: #ffffff;
          padding-top: 15px;
          padding-right: 0;
          width: auto;
          height: 50px;
          overflow: hidden;
          transition: 0.6s height, 0.6s width, 0.6s margin;
          left: 50%;
          margin-left: -125px;
          li {
            background: transparent;
            width: 100%;
            text-align: center;
            margin: 0;
            height: 58.5px;
            padding: 0;
            vertical-align: middle;
            line-height: 58.5px;
            border-bottom: 1.5px #e7e7e7 solid;
            &:hover {
              background: #f7f7f7;
            }
          }
          &.active {
            margin-left: -125px;
            box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.22);
            padding: 0;
            height: auto;
            // width: 300px;
            transition: 0.3s height, 0.3s width, 0.3s margin;
            .menuToggle {
              display: block;
              text-align: center;
              vertical-align: middle;
              line-height: 60px;
            }
          }
        }
      }
      .search {
        min-width: auto;
        left: 0;
        margin-left: 9px;
        position: absolute;
        z-index: 999999;
        width: auto;
        max-width: unset;

        &.active {
          margin: 0;
          min-width: 100vw;
          background: #fff;
          padding: 0;
          max-width: 150vw;
          z-index: 1000000;
        }
        .search-bar {
          position: absolute;
          z-index: 99999999;
          left: 0;
          width: auto;
          padding-top: 22px;
          background: transparent;
          //   border: none;
          border-color: transparent;
          margin: 0;
          transition: 0.4s all;
          &.active {
            border-radius: 50px;
            border: 1.5px #e7e7e7 solid;
            z-index: 9999999;
            width: calc(100% - 20px);
            max-width: calc(100% - 20px);
            margin-left: 10px;
            margin-top: 5px;
            height: 40px;
            padding: 10px 0;
            background: #fff;
            //   box-shadow: 0 0 3px 0 rgba(0,0,0,0.25);
            transition: 0.4s;
            input {
              height: 100%;
              display: block;
              position: relative;
              width: 200px;
              opacity: 1;
              transition: 0.4s width, 0.7 opacity;
            }
            .sClose {
              position: absolute;
              top: 0;
              left: 0;
              margin-top: 18px;
              margin-left: 15px;
              &:hover {
                color: red;
              }
            }
          }
          input {
            position: absolute;
            opacity: 0;
            width: 0px;
            transition: 0.4s width, 0.7 opacity;
            font-size: 100%;
            padding: 0 2.5%;
            text-align: center;
            margin: 0 auto;
            border: none;
            outline: none;
          }
          svg {
            color: #bdc8d5;
            font-size: 120%;
            float: left;
            cursor: pointer;
            margin-top: 13px;

            &:hover {
              color: #707070;
            }
          }
        }
        .nav-icons {
          margin-left: 34px;
          font-size: 1.1em;
          margin-top: 0;
        }
        .notifications {
          svg {
            margin: 1.5em 0.8em;
          }
          .nDropDown {
            left: 0;
            min-width: 350px;
            max-width: 350px;
            margin-top: 0px;
            top: 78px !important;
            .nArrow {
              margin-right: 256px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 435px) {
  #Header {
    padding: 5px 0;
    height: 70px;
    .logo {
      width: 100px;
      margin: 0 auto;
      img {
        width: 105px;
        padding: 7px 0;
      }
    }
    .nav {
      float: right;
      width: calc(100% - 125px);
      .menu {
        width: auto;
        min-width: auto;
        height: 60px;
        position: absolute;
        z-index: 999999;
        ul {
          margin-left: -110px;
          background: transparent;
          transition: 0.5s;
          width: 90px;
          &.active {
            background: #fff;
            left: unset;
            right: unset;
            margin-left: -220px;
            box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.22);
            padding: 0;
            // height: 353px;
            width: 200px;
            transition: 0.3s height, 0.3s width, 0.3s margin;
            .menuToggle {
              display: block;
              text-align: center;
              vertical-align: middle;
              line-height: 60px;
            }
          }
        }
      }
      .search {
        .notifications {
          .nDropDown {
            left: 0;
            min-width: 300px;
            width: 335px;
            max-width: 90%;
            margin-left: 0;
            .nArrow {
              margin-right: 229px;
            }
          }
        }
      }
    }
  }
}
// @media screen and (max-width: 320px) {
//   #header {
//     padding: 5px 0;
//     height: 70px;
//     .logo {
//       width: 120px;
//       padding-right: 5px;
//       margin: 0 auto;
//       img {
//         width: 105px;
//         padding: 7px 0;
//       }
//     }
//     .nav {
//       .search {
//         padding-left: 5px;
//         .search-bar {
//             margin: 16.5px 0;
//             height: 30px;
//             input {
//                 padding: 0;
//             }
//         }
//         .notifications {
//           .nDropDown {
//             left: 0;
//             min-width: 290px;
//             max-width: 100%;
//             margin-top: -5px;
//             .nArrow {
//               margin-right: 123px;
//             }
//           }
//         }
//       }
//     }
//   }
// }
</style>
<style scoped>
.dropbtn {
  background-color: rgba(173, 174, 174, 0);
  color: #89898a;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  /* line-height: 70px; */
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 2px 4px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 768px) {
  .countries-list svg {
    margin-top: 18px;
  }
}
</style>
