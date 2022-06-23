<template>
    <div id="Login">
        <div class="page">
            <div class="logo" v-bind="{ 'class' : showLogo == true ? 'show' : '' }">
              <router-link to="/">
                <img src="../assets/imgs/header/logo.png" alt="الرعاية الصحية">
              </router-link>
            </div>
            <div class="loginForm" v-bind="{ 'class' : formExit == true ? 'exit' : '' }">
                <h3>{{ lang == 'ar' ? 'دخول المديرين' : 'Admin Login' }}</h3>
                <div class="formCtrl">
                    <div class="iIcon"><font-awesome-icon icon="user" /></div>
                    <input type="email" name="email" v-model="user.email">
                </div>
                <div class="formCtrl">
                    <div class="iIcon"><font-awesome-icon icon="key" /></div>
                    <input type="password" name="password" v-model="user.password">
                </div>

                <div class="formAction">
                    <button @click="goLogin" class="sBtn" v-if="!loading"><font-awesome-icon icon="lock" /> {{ lang == 'ar' ? 'دخول' : 'Login' }}</button>
                    <div class="form-loading" v-if="loading">
                        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
                <div v-bind="{'class': error != '' ? 'show' : ''}" class="formError">
                  <span>{{ error }}</span>
                </div>
            </div>
            <div class="lWelcome" v-bind="{ 'class' : showWelcome == true ? 'show' : '' }">
                <h1><font-awesome-icon icon="unlock-alt" /><br>{{ lang == 'ar' ? ' مرحباً بك' : 'Welcome ' }}</h1>
            </div>
            <ul class="bg-bubbles">
                <li><font-awesome-icon icon="user" /></li>
                <li><font-awesome-icon icon="plug" /></li>
                <li><font-awesome-icon icon="chart-bar" /></li>
                <li><font-awesome-icon icon="lock-open" /></li>
                <li><font-awesome-icon icon="key" /></li>
                <li><font-awesome-icon icon="sign-in-alt" /></li>
                <li><font-awesome-icon icon="lock" /></li>
                <li><font-awesome-icon icon="project-diagram" /></li>
                <li><font-awesome-icon icon="signal" /></li>
                <li><font-awesome-icon icon="cogs" /></li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
const axios = require('axios');
// const API_URL = "https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/"
// require '../plugins/vuetify'
//const API_URL = "http://alreaaiaa.net/api/public/api/"
 const API_URL = "https://api.alreaaiaa.com/api/";
// import BootstrapVue from '../../node_modules/bootstrap-vue'
// import '../../node_modules/bootstrap/dist/css/bootstrap.css'
// import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "Login",
  metaInfo: {
      title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
    },
  data() {
    return {
      lang: "ar",
      showLogo: false,
      formExit: true,
      showWelcome: false,
      loading: false,
      error: '',
      user: {
        email: 'ahmed.ezz33889@gmail.com',
        password: '199424633399'
      }
    };
  },
  methods: {
    goLogin: function() {
      let app = this

      app.loading = true
      app.error = ''
      axios.post(API_URL + 'auth/admin/login', app.user)
      .then(
        function(response){
          if(response.data != undefined) {
            localStorage.setItem('access_token', response.data.access_token)
            app.formExit = true;
            setTimeout(() => {
              app.showWelcome = true;
            }, 200);
          }
        },
        function(error) {
          let errorMsg = 'Wrong credentials'
          if(app.lang == 'ar'){ errorMsg = 'خطأ في بيانات المستخدم' }
          app.error = errorMsg
          app.loading = false
        }
      )

    }
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem("lang");
    setTimeout(() => {
      app.formExit = false
      app.showLogo = true;
    }, 200);
  }
};
</script>
<style lang="scss">
#Login {
  height: auto;
  .page {
    width: 100%;
    min-height: calc(100vh - 50px);
    background: #18b4bb;
    background: -webkit-linear-gradient(top left, #18b4bb 0%, #7bc7ab 100%);
    background: -moz-linear-gradient(top left, #18b4bb 0%, #7bc7ab 100%);
    background: -o-linear-gradient(top left, #18b4bb 0%, #7bc7ab 100%);
    background: linear-gradient(to bottom right, #18b4bb 0%, #7bc7ab 100%);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s all linear;
    .lWelcome {
      opacity: 0;
      transition: 2s opacity, 1s font-size;
      font-size: 100%;
      h1 {
        color: #fff;
        text-align: center;
        line-height: 85px;
        svg {
          transform: rotate3d(0, 1, 0.5, 3.142rad);
          transition: 1s all;
          transition-delay: 0.5s;
          font-size: 450%;
        }
      }

      &.show {
        opacity: 1;
        font-size: 230%;
        h1 {
          svg {
            transform: rotate3d(0, 0, 0, 0);
            font-size: 100%;
          }
        }
      }
    }
    .logo {
      position: absolute;
      z-index: 5;
      top: 50px;
      opacity: 0.0;
      transition: 2s opacity;
      transition-delay: 1s;
      &.show {
        opacity: 1.0;
      }
    }
    .loginForm {
      width: 400px;
      max-width: 95%;
      min-height: 200px;
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 1px 2px 15px 1px rgba(0, 0, 0, 0.15);
      border: 1px solid #fff;
      position: absolute;
      z-index: 2;
      transition: 1.5s margin-top, 0.75s opacity;
      &.exit {
        margin-top: -50%;
        opacity: 0;
        transition: 1s margin-top, 0.5s opacity;
      }
      h3 {
        text-align: center;
        color: #1c504e;
        font-size: 140%;
      }
      .formCtrl {
        display: inline-block;
        width: calc(100% - 40px);
        margin-right: 20px;
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.05);
        margin-bottom: 10px;
        .iIcon {
          background: rgba(#18b4bb, 0.8);
          width: 40px;
          height: 40px;
          text-align: center;
          vertical-align: middle;
          line-height: 40px;
          border: 1px solid #e7e7e7;
          border-right: 0px;
          float: left;
          svg {
            color: #fff;
          }
        }
        input {
          width: calc(100% - 42px);
          float: left;
          margin: 0;
          padding: 0;
          border: 1px solid #e7e7e7;
          height: 40px;
          outline: none;
          background: rgba(255, 255, 255, 0.45);
          border-left: 0px;
          text-align: center;
          transition: 0.6s;
          color: #1c504e;
          font-family: Verdana;
          letter-spacing: 1px;
          &:focus {
            background: transparent;
            box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.1);
          }
        }
      }
      .formAction {
        display: block;
        padding: 20px;
        height: 40px;
        .sBtn {
          display: block;
          float: right;
          text-decoration: none;
          background: #18b4bb;
          color: #fff;
          border: 1px transparent solid;
          padding: 4px 10px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            border-color: #18b4bb;
            background: transparent;
            color: #18b4bb;
          }
        }
        .form-loading {
          display: block;
          // float: left;
        }
      }
      .formError {
        display: block;
        opacity: 0.0;
        width: 100%;
        padding: 0 20px;
        transition: 0.5s;
        height: 0px;
        overflow: hidden;
        &.show {
          padding-bottom: 10px;
          opacity: 1.0;
          height: auto;
          transition: 0.2s;
        }
        span {
          display: block;
          text-align: center;
          width: calc(100% - 40px);
          padding: 5px 0;
          line-height: 24px;
          font-size: 80%;
          height: 24px;
          color:#501c1c;
          background: rgba(#ffcccc, 0.5);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #Login {
    .page {
      min-height: calc(100vh - 50px);
      .logo {
        position: absolute;
        z-index: 5;
        top: 20px;
      }
    }
  }
}

.bg-bubbles {
  position: absolute;
  top: 115;
  left: 0;
  width: 100%;
  min-height: calc(100% - 50px);
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  //   background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  transition-timing-function: linear;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
  font-size: 150%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
  font-size: 250%;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
  font-size: 150%;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  font-size: 230%;
  //   background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
  font-size: 120%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  font-size: 450%;
  //   background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
  font-size: 650%;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  font-size: 110%;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  font-size: 50%;
  //   background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
