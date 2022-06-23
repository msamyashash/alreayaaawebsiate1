

<template>
  <div id="Payment">
    <div class="page">
      <div class="contain">
        <!-- HEADER -->
        <div
          class="sHeader"
          data-aos="fade-down"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-center"
        >
          <h2>{{ lang == "ar" ? " اطلب البطاقة" : "Order card" }}</h2>
          <p style="display: flex; justify-content: center">
            {{
              lang == "ar"
                ? "وﺗﻤﺘﻊ ﺑﺨﺪﻣﺎﺗﻨﺎ اﻟﻔﺮﻳﺪة ﻣﻦ ﺧﻼل وﺛﻴﻘﺘﻚ"
                : "Get benefits of our unique service using our health card"
            }}
          </p>
          <h2 v-if="done">
            {{
              lang == "ar"
                ? "تم استلام الطلب وسيتم التواصل معك من قبل خدمة العملاء"
                : "We have recieve your order,Customer service will contact you"
            }}
          </h2>
        </div>

        <!-- PROGRESS - STEPS BAR -->
        <div class="progress-bar" :dir="lang == `en` ? `ltr` : `rtl`">
          <div class="progress-line-block">
            <div class="progress-line"></div>
          </div>
          <div class="step-block">
            <div class="step-progress active-step">
              <span>1</span>
            </div>
            <span class="step-text active-step-text">{{
              lang == "ar" ? "بيانات العميل" : "Customer Info"
            }}</span>
          </div>

          <div class="step-block">
            <div class="step-progress active-step">
              <span>2</span>
            </div>
            <span class="step-text active-step-text">{{
              lang == "ar" ? "طريقة الدفع" : "Payment"
            }}</span>
          </div>
        </div>

        <!-- PAYMENT MAIN BLOCK -->
        <div class="payment-main-block">
            <div class="pay-block">
                <div class="title-box">
                <div class="icon-title-box">
                    <i class="bx bx-money-withdraw"></i>
                </div>
                <div class="title-box-title">
                    <span>{{
                    lang == "ar" ? "خيارات الدفع" : "Payment Method"
                    }}</span>
                </div>
                </div>
                <div class="personal-form-group">

                    <div class="personal-form-signle cursor-pointer" v-bind:class="paymenttype==1? 'form-active' : ''"  @click="paymenttype = 1">
                        <div class="personal-form-icon">
                        <i class='bx bx-credit-card'></i>
                        </div>
                        <div class="personal-form-text">
                            <span>
                                {{ lang == "ar" ? "البطاقة الائتمانية" : "Credit Card" }}
                            </span>
                            <div v-bind:class="paymenttype==1? 'check-payment-active' : 'check-payment'">
                                <i class='bx bx-check'></i>
                            </div>
                        </div>
                    </div>

                    <div class="personal-form-signle cursor-pointer" v-bind:class="paymenttype==2? 'form-active' : ''"  @click="paymenttype = 2">
                        <div class="personal-form-icon">
                        <i class='bx bx-money'></i>
                        </div>
                        <div class="personal-form-text">
                            <span>
                                {{ lang == "ar" ? "الدفع عند الاستلام" : "Cash On Delivery" }}
                            </span>
                            <div v-bind:class="paymenttype==2? 'check-payment-active' : 'check-payment'">
                                <i class='bx bx-check'></i>
                            </div>
                        </div>
                    </div>

              
                </div>
            </div>


            <div class="pay-block">
                <div class="title-box">
                    <div class="icon-title-box">
                        <i class='bx bxs-truck'></i>
                    </div>
                    <div class="title-box-title">
                        <span>{{
                        lang == "ar" ? "خيارات الشحن" : "Shipping Method"
                        }}</span>
                    </div>
                </div>
                <div class="personal-form-group">
                    <div class="personal-form-signle cursor-pointer" v-bind:class="deliverytype==1? 'form-active' : ''"  @click="deliverytype = 1">
                        <div class="personal-form-icon">
                        <i class='bx bxs-map'></i>
                        </div>
                        <div class="personal-form-text">
                            <span>
                                {{ lang == "ar" ? "الاستلام من الفرع" : "Drop at Branch" }}
                            </span>
                            <div v-bind:class="deliverytype==1? 'check-payment-active' : 'check-payment'">
                                <i class='bx bx-check'></i>
                            </div>
                        </div>
                    </div>

                    <div class="personal-form-signle cursor-pointer" v-bind:class="deliverytype==2? 'form-active' : ''"  @click="deliverytype = 2">
                        <div class="personal-form-icon">
                        <i class='bx bx-home-alt'></i>
                        </div>
                        <div class="personal-form-text">
                            <span>
                                {{ lang == "ar" ? "الاستلام في البيت" : "Drop at Home" }}
                            </span>
                            <div v-bind:class="deliverytype==2? 'check-payment-active' : 'check-payment'">
                                <i class='bx bx-check'></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="branch-select" v-show="!loading && !done && deliverytype == 1">
                    <select name="bCity" id="bCity" v-model="order.city_id" @change="getDistrict($event)">
                        <option value="" disabled selected>{{ lang == 'ar' ? 'اختر الفرع' : 'Select Branch' }}</option>
                        <option v-for="c in zones" :value="c.id" :key="c.id">{{ c.title }}</option>
                    </select>
                    
                </div>
                <div class="branch-select" v-show="!loading && !done && deliverytype == 2">
                    <input
                      type="text"
                      name="benefiterName"
                      v-model="order.fullname"
                      v-bind="{ placeholder : lang == 'ar' ? 'ادخل العنوان' : 'Enter Full Address'}"
                      id="benefiterName"
                  >
                    
                </div>
            </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import swal from "sweetalert";

function getParameterByName(name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

if (!getParameterByName("country_id")) {
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/5ba88858c9abba579677d3d7/default";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
}

const axios = require("axios");
import json from "../assets/nationalities/nationalitiesList.json";
const API_URL = "https://erp.alreaaiaa.com";
export default {
  name: "Subscribe",

  metaInfo: {
    title:
      localStorage.getItem("lang") == "en" ? "Health Care" : "الرعاية الصحية",
  },

  data() {
    return {
      lang: "ar",
      type: 1,

      type1: true,
      type2: false,
      isActive: false,

      paymenttype:1,
      deliverytype:1,
      

      loading: false,
      mobileView: false,
      mobileLoading: true,
      done: false,
      hasMembership: 0,
      error: "",
      pricing: null,
      offerPriced: "",
      nationalities: json,
      countries: [],
      tot_prices: [],
      offers: [],
      branch: [],
      user: [],
      regions: [],
      zones: [],
      sub_zones: [],
      districts: [],
      Subscription: [],
      CardType: [],
      memberShipData: [],

      // family price data
      taxValue: 0,
      calculateTotalPrice: 0,
      totalFamilyPrice: 0,
      totalBeforeOffer: 0,
      totalTaxes: 0,

      images: [],
      cost: {
        total: 0,
        sub_total: 0,
        tax: 0,
      },
      prices: [],
      order: {
        subscription_id: "",
        fullname: "",
        gender: "",
        identity_number: "",
        membership_id: "",
        phone: "",
        country: "",
        city_id: "",
        zone_id: "",
        notes: "",
        customer_district: "",
        offer_id: "",
        recivingbranch_id: "",
        customer_detail_address: "",
        customer_customer_id: "",
        // referal_id:"",
        nationality: "",
        customer_kind: "",
        customer_relation: "",
        bDistrict: "",
        card_type_id: "",
        representer_: "",
        tax: 0,
        totalPrice: 0,
        subOrders: [],
      },
      country: null,
    };
  },
  watch: {
    country(val) {
      this.order.country_id = val.id;
      if (this.order.country_id == 11) this.taxValue = 0; // No Taxes In Bahreen
      this.error = [];
      this.calculateTheTotalPrices();
    },
    type(val) {
      for (let i = 0; i < this.Subscription.length; i++) {
        if (this.type == 1 && this.Subscription[i].title_en == "SINGLE") {
          this.order.subscription_id = this.Subscription[i].id;
        }
        if (this.type == 2 && this.Subscription[i].title_en == "FAMILY") {
          this.order.subscription_id = this.Subscription[i].id;
        }
      }

      this.order.subOrders = [];
    },

    "order.subOrders.length"(val) {
      this.calculateTheTotalPrices();
    },

    calculateTotalPrice(total) {
      this.totalBeforeOffer = 0;
      this.order.subOrders.forEach((order) => {
        if (order.beforeOffer) this.totalBeforeOffer += order.beforeOffer;
      });
      this.totalTaxes = total * this.taxValue;
      this.totalFamilyPrice = (total * (1 + this.taxValue)).toFixed(2);
    },
  },
  methods: {
    getPrice(order) {
      let params = {
        country_id: this.order.country_id,
        card_type_id: order.card_type_id,
        subscription_id: this.order.subscription_id,
      };

      if (this.order.offer_id) params.offer_id = this.order.offer_id;

      return axios
        .get(`${API_URL}/api/v2/get_price`, { params: params })
        .then((res) => {
          return [parseFloat(res.data.data), parseFloat(res.data.beforeOffer)];
        });
    },

    async calculateTheTotalPrices() {
      if (
        this.order.country_id &&
        this.order.subscription_id &&
        this.order.card_type_id
      ) {
        await this.getPrice(this.order).then((prices) => {
          this.order.pricing = prices[0];
          this.order.beforeOffer = prices[1];
          if (this.order.pricing) {
            this.order.tax = this.order.pricing * this.taxValue;
            this.order.totalPrice = (
              this.order.pricing *
              (1 + this.taxValue)
            ).toFixed(2);
          }
        });
      }

      this.calculateTotalPrice = 0;
      this.order.subOrders.forEach(async (order) => {
        if (
          this.order.country_id &&
          this.order.subscription_id &&
          order.card_type_id
        ) {
          await this.getPrice(order).then((prices) => {
            order.pricing = prices[0];
            order.beforeOffer = prices[1];
          });
        }
        if (order.pricing) this.calculateTotalPrice += order.pricing;
      });

      this.$forceUpdate();
    },

    // getMembership: function() {
    //   let app = this;

    //   axios
    //     .get(API_URL + "memberCard/searchby_membership/" + app.order.membership_id)
    //     .then(function(response) {
    //       app.memberShipData = response.data;
    //     });
    // },
    getAllData() {
      let app = this;
      axios.get(API_URL + "/api/data").then(function (response) {
        app.countries = response.data.Country;

        const countryId = app.$route.query.country_id;
        if (countryId) {
          app.countries.forEach((c) => {
            if (c.id == countryId) {
              app.country = c;
              app.getRegions();
            }
          });
        }

        for (let i = 0; i < app.countries.length; i++) {
          if (app.order.country_id == app.countries[i]["id"]) {
            app.zones = app.countries[i].zones;
            app.sub_zones = app.countries[i].cities;
          }
        }
        app.branch = response.data.Branch;
        app.user = response.data.User;
        app.Subscription = response.data.Subscription;
        app.CardType = response.data.CardType;
        app.taxValue = response.data.taxValue;

        for (let i = 0; i < app.Subscription.length; i++) {
          app.tot_prices.push(app.Subscription[i].price);

          if (app.type == 1 && app.Subscription[i].title_en == "SINGLE") {
            app.order.subscription_id = app.Subscription[i].id;
            // app.pricing = app.Subscription[i].price;
          }
          if (app.type == 2 && app.Subscription[i].title_en == "FAMILY") {
            app.order.subscription_id = app.Subscription[i].id;

            // app.pricing = app.Subscription[i].price;
          }
        }

        app.mobileLoading = false;
      });
    },
    getRegions: function (e) {
      let app = this;
      app.regions = this.country.zones;
    },
    getZones: function (e) {
      let app = this;
      let region_id = e.target.selectedOptions[0].value;
      if (region_id != 0) {
        for (let i = 0; i < app.regions.length; i++) {
          if (app.order.zone_id == app.regions[i]["id"]) {
            app.zones = app.regions[i].cities;
          }
        }
      }
    },

    fetchOffers() {
      if (this.order.recivingbranch_id == null) return;

      axios
        .get(
          `${API_URL}/api/mobile/branches/${this.order.recivingbranch_id}/offers?subscription_id=${this.order.subscription_id}`
        )
        .then((res) => {
          this.offers = res.data.offers;
        });
    },

    addCard: function () {
      let app = this;

      app.order.subOrders.push({
        fullname: "",
        gender: null,
        nationality: null,
        identity_number: "",
        phone: "",
        notes: "",
        card_type_id: null,
        subscription_id: 14,
        uploaded: false,
        media: [],
      });
      // if (app.hasMembership == 1 && app.type == 2) {
      //   axios
      //     .get(
      //       API_URL +
      //         "/api/memberCard/searchby_membership/" +
      //         app.order.membership_id
      //     )
      //     .then(function(response) {
      //       for (let i = 0; i < app.order.subOrders.length; i++) {
      //         (app.order.subOrders[i].subscription_id = app.order.subscription_id),
      //           (app.order.subOrders[i].recivingbranch_id =
      //             app.order.recivingbranch_id),
      //           // app.order.subOrders[i].card_type_id= response.data.data.card_type_id,
      //           // app.order.subOrders[i].referal_id= response.data.data.referal_id,
      //           (app.order.subOrders[i].offer_id = response.data.data.offer_id),
      //           (app.order.subOrders[i].country_id =
      //             response.data.data.country_id),
      //           (app.order.subOrders[i].city_id = response.data.data.city_id),
      //           (app.order.subOrders[i].zone_id = response.data.data.zone_id);
      //         app.order.subOrders[i].membership_id =
      //           response.data.data.membership_id;
      //       }
      //     });
      // }
    },
    getDistrict: function (e) {
      let app = this;

      let city_id = e.target.selectedOptions[0].value;
      if (city_id != 0) {
        for (let i = 0; i < app.zones.length; i++) {
          if (app.order.city_id == app.zones[i]["id"]) {
            app.districts = app.zones[i].districts;
          }
        }
      }
    },

    delCard: function (id) {
      let app = this;
      app.order.subOrders.splice(id, 1);
    },
    async doSubscribe() {
      let app = this;

      app.loading = true;
      app.error = [];

      //assign order to form data object
      if (app.type == 2) {
        if (app.order.subOrders.length < 2) {
          swal({
            text:
              this.lang == "ar"
                ? "الحد الأدنى للبطاقات العائلية 2"
                : "the minimum cards you can order is 2",
            icon: "warning",
            buttons: false,
            dangerMode: true,
          });
          this.loading = false;
          return;
        }

        if (await this.ordersHaveErrors()) return;

        for (let i = 0; i < app.order.subOrders.length; i++) {
          let formdata = new FormData();

          if (
            this.$refs[`imageInput_${i}`] &&
            this.$refs[`imageInput_${i}`][0]
          ) {
            let images = this.$refs[`imageInput_${i}`][0].files;
            if (typeof images == "undefined") images = [];

            for (let j = 0; j < images.length; j++)
              formdata.append("media[]", images[j]);
          }

          let order = this.order.subOrders[i];
          if (order.phone) order.phone = +order.phone;
          for (let key in order) {
            if (order[key] && key != "media") {
              formdata.append(key, order[key]);
            }
          }

          if (app.order.id && Number.isInteger(app.order.id)) {
            formdata.append("id", app.order.id);
            formdata.append("parent_id", app.order.id);
          }

          formdata.append("country_id", app.order.country_id);
          formdata.append("zone_id", app.order.zone_id);
          formdata.append("city_id", app.order.city_id);
          formdata.append("district_id", app.order.district_id);
          formdata.append("recivingbranch_id", app.order.recivingbranch_id);
          formdata.append("offer_id", app.order.offer_id);

          await axios
            .post(API_URL + `/api/v2/create_order?lang=${this.lang}`, formdata)
            .then(
              function (response) {
                // assign the first order id to be set as the parent id for the
                // next orders.
                if (i == 0) app.order.id = response.data.data.id;
                // app.loading = false;
                // app.done = true;
              },
              function (error) {
                let errorMsg = "Please insert all your information";
                if (app.lang == "ar") {
                  errorMsg = "من فضلك قم بإدخال كافة البيانات";
                }

                app.error = [];

                if (error.response.data.error) {
                  for (const err in error.response.data.error) {
                    app.error.push(error.response.data.error[err]);
                  }
                }

                app.error.push([errorMsg]);
                app.loading = false;
              }
            );
        }
      } else {
        let formdata = new FormData();
        if (this.order.phone) this.order.phone = +this.order.phone;
        let subOrders = this.order;
        for (let key in subOrders) {
          if (subOrders[key]) {
            formdata.append(key, subOrders[key]);
          }
        }

        if (
          this.order.card_type_id == 15 &&
          !(
            this.$refs &&
            this.$refs.imageInput &&
            this.$refs.imageInput.files.length > 0
          )
        ) {
          swal({
            text:
              this.lang == "ar"
                ? "برجاء إرفاق صور التقارير الطبية"
                : "please insert the medical reports photos",
            icon: "warning",
            buttons: false,
            dangerMode: true,
          });
          this.loading = false;
          return;
        }

        if (this.$refs.imageInput) {
          let images = this.$refs.imageInput.files;
          if (typeof images == "undefined") images = [];

          for (let j = 0; j < images.length; j++)
            formdata.append("media[]", images[j]);
        }

        await axios
          .post(API_URL + `/api/v2/create_order?lang=${this.lang}`, formdata)
          .then(
            function (response) {
              let rData = response.data;
              app.loading = false;
              // app.cost.sub_total = rData.total_price
              // app.cost.tax = rData.tax
              // app.cost.total = (Number(rData.total_price) / Number(rData.tax)) + Number(rData.total_price)
              // console.log(app.cost)
              app.order = [];
              app.order.subOrders = [];
              app.done = true;
            },
            function (error) {
              app.error = [];
              let errorMsg = "Please insert all your information";
              if (app.lang == "ar")
                errorMsg = "من فضلك قم بإدخال كافة البيانات";

              if (error.response.data.error) {
                for (const err in error.response.data.error) {
                  app.error.push(error.response.data.error[err]);
                }
              }

              app.error.push([errorMsg]);
              app.loading = false;
            }
          );
      }
      if (app.error.length < 1) {
        app.order = [];
        app.order.subOrders = [];
        app.loading = false;
        app.done = true;
      }
    },

    async ordersHaveErrors() {
      this.error = [];

      for (let i = 0; i < this.order.subOrders.length; i++) {
        let formdata = new FormData();
        let order = this.order.subOrders[i];
        for (let key in order) {
          if (order[key]) {
            formdata.append(key, order[key]);
          }
        }

        if (
          order.card_type_id == 15 &&
          !(
            this.$refs &&
            this.$refs[`imageInput_${i}`] &&
            this.$refs[`imageInput_${i}`][0].files.length > 0
          )
        ) {
          swal({
            text:
              this.lang == "ar"
                ? "برجاء إرفاق صور التقارير الطبية"
                : "please insert the medical reports photos",
            icon: "warning",
            buttons: false,
            dangerMode: true,
          });
          this.loading = false;
          return true;
        }

        if (this.order.id && Number.isInteger(this.order.id)) {
          formdata.append("id", this.order.id);
          formdata.append("parent_id", this.order.id);
        }

        formdata.append("country_id", this.order.country_id);
        formdata.append("zone_id", this.order.zone_id);
        formdata.append("city_id", this.order.city_id);
        formdata.append("district_id", this.order.district_id);
        formdata.append("recivingbranch_id", this.order.recivingbranch_id);
        formdata.append("offer_id", this.order.offer_id);

        await axios.post(`${API_URL}/api/v2/validate_order`, formdata).then(
          (response) => {},
          (error) => {
            let errorMsg = "Please insert all your information";
            if (this.lang == "ar") {
              errorMsg = "من فضلك قم بإدخال كافة البيانات";
            }

            this.error.push(errorMsg);
            if (error.response.data.error) {
              for (const err in error.response.data.error) {
                this.error.push(error.response.data.error[err]);
              }
            }
          }
        );
      }
      this.loading = false;

      if (!(Array.isArray(this.error) && this.error.length > 0)) {
        return false;
      }

      this.error = [...new Set(this.error)];
      swal({
        text: this.error.join("\n"),
        icon: "warning",
        buttons: false,
        dangerMode: true,
      });

      return true;
    },
    commingFromMobileApp() {
      this.type = 2;
      this.mobileView = true;
      document.getElementById("footer").style.display = "none";
    },
  },

  mounted: function () {
    this.lang = localStorage.getItem("lang");

    const countryId = this.$route.query.country_id;
    if (countryId) this.commingFromMobileApp();

    this.getAllData();
  },
};
</script>


<style lang="scss">
@import "boxicons/css/boxicons.min.css";

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

$primary-color: #18b4bb;

.cursor-pointer {
    cursor:pointer;
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


      .payment-main-block {
        width: 80%;
        margin: auto;
        // border: 1px solid red;
        
        .pay-block {
            margin: 0 0 10px 0;
            padding: 0 0 20px 0;
            width: 100%;
            border-bottom: 1px solid gray;
          .title-box {
            display: flex;
            align-items: center;
            // border: 1px solid red;
            font-weight: 700;
            margin: 0;
            padding: 0 0px;
            .icon-title-box {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 10px;
              i {
                font-size: 24px;
                color: rgba(#6d6e71, 1);
              }
            }
            .title-box-title {
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .personal-form-group {
            margin: 0px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;

            
            .personal-form-signle {
              width: 30%;
              height: 50px;
              border-radius: 5px;
              border: 1px solid gray;
              
              background-color: rgb(245, 245, 245);
              display: flex;
              .personal-form-icon {
                height: 100%;
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                  font-size: 24px;
                  color: $primary-color;
                }
              }
              .personal-form-text {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0 0 0 10px;
                  .check-payment {
                      width: 20px;
                      height: 20px;
                      border: 1px solid gray;
                      border-radius: 25px;
                      color: white;
                  }
                  .check-payment-active{
                      width: 20px;
                      height: 20px;
                      border: 1px solid $primary-color;
                      border-radius: 25px;
                      background-color: $primary-color;
                      color: white;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  }
                  span {
                      font-weight: 600;
                  }
              }
              input {
                width: 100%;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;

                &:focus {
                  outline: none !important;
                }
                &::placeholder {
                  color: black;
                  font-size: 16px;
                }
              }
              select {
                width: 100%;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;
                &:focus {
                  outline: none !important;
                }
              }
            }
            .form-active {
                background-color: rgb(255, 255, 255);
                border: 1px solid $primary-color;
            }
            .personal-form-wide {
              width: 48%;
              height: 50px;
              border-radius: 5px;
              background-color: rgb(245, 245, 245);
              display: flex;
              .personal-form-icon {
                height: 100%;
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                  font-size: 24px;
                  color: $primary-color;
                }
              }
              input {
                width: 100%;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;

                &:focus {
                  outline: none !important;
                }
                &::placeholder {
                  color: black;
                  font-size: 16px;
                }
              }
              select {
                width: 100%;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;
                &:focus {
                  outline: none !important;
                }
              }
            }
          }
          .branch-select {
              width: 100%;
              height: 50px;
              border: 1px solid gray;
              border-radius: 5px;
              background-color: rgb(245, 245, 245);
              margin: 20px 0 0 0;

              input {
                width: 90%;
                height: 50px;
                padding: 0 20px 0 0;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;
                &:focus {
                    outline: none !important;
                }
                &::placeholder {
                    color: black;
                    font-size: 16px;
                }
              }
              
              select {
                background: url(https://www.svgrepo.com/show/7882/down-arrow.svg) 20px 0 no-repeat;
                background-size: 20px 50px;
                width: 100%;
                height: 50px;
                padding: 0 20px 0 0;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;
                &:focus {
                  outline: none !important;
                }
              }
          }
        }
      }
</style>