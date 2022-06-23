<template>

  <div id="app"  :dir="`rtl`">

    <template v-if="($route.name != 'MedicalNetVisitor') && !commingFromMobileApp">
      <Header></Header>
      <div class="header-fix"></div>
    </template>

    <keep-alive :include="['MedicalNet','Offers','Events']">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return{
      language: 'ar',
      commingFromMobileApp: true
    }
  },
  created: function () {
  	let language = this.language = localStorage.getItem('lang')
  	if(language == null){
  		localStorage.setItem('lang','ar')
    }

    if (!this.getParameterByName('country_id')) {
      this.commingFromMobileApp = false;
    }
  },

  methods: {
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
  }
};
</script>


<style lang="scss">

@import url("https://fonts.googleapis.com/css?family=Cairo");
* {
  font-family: Cairo, "sans-serif";
}




.custom-scrollbar {

  &.green {
    &::-webkit-scrollbar {
      width: 6px;
      background: #eff6f3;
    }
  }

  &.vertical {
    &::-webkit-scrollbar {
      background: transparent;
      height: 6px;
    }
  }

  &::-webkit-scrollbar-track {
      background: transparent;
      margin: 6px;
  }

  &::-webkit-scrollbar-thumb {
      background: #999;
      border-radius: 3px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
        background: #555;
    }
  }
}
.header-fix {
  display: block;
  width: 100%;
  height: 55px;
  padding: 20px 0;
}
.loading {
  margin: 0 auto;
  text-align: center;
  display: block;
  margin-top: 20px;
  color: #707070;
}
.lds-ring {
  display: block;
  margin: 0 auto;
  position: relative;
  width: 44px;
  height: 44px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 31px;
  height: 31px;
  margin: 4px;
  border: 4px solid #ddd;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #18b4bb transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  .headerFix {
    width: 100%;
    height: 55px;
    padding: 20px 0;
    display: inline-block;
  }
}
@media screen and (max-width: 768px) {
  #app {
    .header-fix {
      height: 40px;
      padding: 20px 0;
    }
  }
}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

select {
  -moz-appearance: none !important; 
	-webkit-appearance: none !important; 
	appearance: none !important;
}




  

</style>



