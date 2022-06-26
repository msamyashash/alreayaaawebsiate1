<template>
  <div id="Subscribe">



    <div class="page">
      <div class="sSubscribe" :dir="lang == `en` ? `ltr` : `rtl`">
        <!-- HEADER -->
        <div
          class="sHeader"
          data-aos="fade-down"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-center"
          data-aos-offset="-450"
        >
          <h2 v-if="!done">{{ lang == "ar" ? " اطلب البطاقة" : "Order card" }}</h2>
          <p v-if="!done" style="display: flex; justify-content: center">
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


          <h2 v-if="done ">
                    {{
              lang == "ar"
                ? "للاتصال بخدمة العملاء : "  
                : "To contact customer service:"
            }}
          </h2>
            <h2 v-if="done">
                    920008279  -     0534016244
           </h2>





        </div>

        <div
          class="form-loading"
          v-if="newLoading"
          style="text-align: center; margin-top: 5px"
        >
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div
          class="form-loading"
          v-if="mobileView && mobileLoading"
          style="text-align: center; margin-top: 5px"
        >
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div
          v-else
          class="sContent"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-center"
          data-aos-offset="-450"
        >
          <!-- PROGRESS - STEPS BAR -->
          <div
            class="progress-bar"
            :dir="lang == `en` ? `ltr` : `rtl`"
            v-if="!done && !finished"
          >
            <div class="progress-line-block">
              <div class="progress-line"></div>
            </div>
            <div class="step-block">
              <div class="step-progress active-step">
                <span>1</span>
              </div>
              <span class="step-text active-step-text"
                >{{ lang == "ar" ? "بيانات العميل" : "Customer Info" }}
              </span>
            </div>

            <div class="step-block">
              <div class="step-progress" v-bind:class="{ 'active-step': paystep == 2 }">
                <span>2</span>
              </div>
              <span class="step-text"
                >{{ lang == "ar" ? "طريقة الدفع" : "Payment" }}
              </span>
            </div>
          </div>

          <!-- ORDER ERRORS -->
          <div
            v-if="!mobileView"
            :dir="lang == `en` ? `ltr` : `rtl`"
            v-bind="{ class: error != '' ? 'show' : '' }"
            class="formError personal-info-main"
          >
            <span>
              <ul>
                <li v-for="(e, i) in error" :key="i">{{ e }}</li>
              </ul>
            </span>
          </div>

          <!-- CARD TYPE [SINGLE || FAMILY || COMPANY] -->
          <div
            v-show="!mobileView"
            class="personal-info-main"
            v-if="!loading && !done && paystep == 1"
          >
            <div class="main-box">
              <div class="title-box">
                <div class="icon-title-box">
                  <i class="bx bxs-credit-card"></i>
                </div>
                <div class="title-box-title">
                  <span>{{ lang == "ar" ? "نوع البطاقة" : "Card Type" }}</span>
                </div>
              </div>
              <div class="category-select">
                <label
                  for="type-2"
                  class="category-block margin-category-mobile"
                  :class="type2 ? 'active-border' : 'notactive-border'"
                >
                  <div class="category-block-title">
                    <span>{{ lang == "ar" ? "عائلية" : "Family" }}</span>
                    <div class="check-box" :class="type2 ? 'check-box-selected' : ''">
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                  <div class="category-block-description">
                    <div class="description">
                      <span>{{
                        lang == "ar"
                          ? "الحد الادنى بطاقتين للحصول على الخصم العائلي"
                          : "Minimum Two Cards for The Family Discount"
                      }}</span>
                    </div>
                    <div class="price" v-if="country">
                     
                      <span v-if=" !(generalstaticofferfamily && generalstaticofferfamily >0) "
                        >
                        {{ family_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>
                     

                      <span style="text-decoration: line-through;" v-if="generalstaticofferfamily && generalstaticofferfamily >0"
                        >
                        {{ family_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>

                      <span style="display:block ;color:red;" v-if=" generalstaticofferfamily && generalstaticofferfamily >0" 
                        >
                        {{  parseInt((Number(family_price)-(Number(family_price) * (Number(generalstaticofferfamily)/100)))*(1+taxValue)) }} {{ lang == "ar" ? currencies[1] : currencies[0] }}
                        {{ lang == "ar" ? "ساري لفترة محدودة" : "Valid for a limited time" }}
                        </span>



                    </div>
                  </div>
                </label>

                <label
                  for="type-1"
                  class="category-block"
                  :class="type1 ? 'active-border' : 'notactive-border'"
                >
                  <div class="category-block-title">
                    <span>{{ lang == "ar" ? "فردية" : "Single" }}</span>
                    <div class="check-box" :class="type1 ? 'check-box-selected' : ''">
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                  <div class="category-block-description">
                    <div class="description">
                      <span>{{
                        lang == "ar"
                          ? "بطاقة فردية لشخص واحد"
                          : "Single Card For One Individual"
                      }}</span>
                    </div>
                    <div class="price" v-if="country">
                     
                      <span v-if=" !(generalstaticoffersingle && generalstaticoffersingle >0)"
                        >
                        {{ single_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>

                      <span style="text-decoration: line-through;" v-if="(generalstaticoffersingle && generalstaticoffersingle >0)"
                        >
                        {{ single_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>

                      <span style="display:block;color:red;" v-if="(generalstaticoffersingle && generalstaticoffersingle >0)"
                        >
                        {{ parseInt((Number(single_price)-(Number(single_price) * (Number(generalstaticoffersingle)/100)))*(1+taxValue))}}   {{ lang == "ar" ? currencies[1] : currencies[0] }}
                        {{ lang == "ar" ? "ساري لفترة محدودة" : "Valid for a limited time" }}
                        </span>
                    </div>
                  </div>
                </label>
              </div>

              <div class="input-buttons">
                <input
                  type="radio"
                  name="type"
                  v-bind="{ checked: type == 1 }"
                  v-model="type"
                  value="1"
                  id="type-1"
                  @click="
                    delivery_price = delivery_price_single;
                    order.subscription_id = 13;
                    type1 = true;
                    type2 = false;
                    getStaticOffer();
                  "
                />

                <input
                  type="radio"
                  name="type"
                  v-bind="{ checked: type == 2 }"
                  v-model="type"
                  value="2"
                  id="type-2"
                  @click="
                    delivery_price = delivery_price_family;
                     order.subscription_id = 14;
                    type2 = true;
                    type1 = false;
                    getStaticOffer();
                  "
                />
              </div>
            </div>
          </div>

          <!-- SINGLE CARD -->
          <div
            class="personal-info-main"
            v-show="!loading && !done && type == 1 && paystep == 1"
          >
            <div class="title-box">
              <div class="icon-title-box">
                <i class="bx bxs-id-card"></i>
              </div>
              <div class="title-box-title">
                <span>{{ lang == "ar" ? "العنوان" : "Address" }}</span>
              </div>
            </div>

            <div class="personal-details-block">
              <div class="personal-form-group">
                <div
                  class="personal-form-wide"
                  v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                >
                  <div class="personal-form-icon">
                    <i class="bx bx-world"></i>
                  </div>
                  <select
                    v-if="!mobileView"
                    name="bCountry"
                    id="bCountry"
                    v-model="country"
                    return-object
                    @change="
                      getBranches($event);
                      getGeneralAllStaticOffer();
                      getCities($event);
                      getdeliveryPrice();
                    

                      offers = [];
                    "
                  >
                    <option value="" disabled selected>
                      {{ lang == "ar" ? "الدولة" : "Country" }}
                    </option>
                    <option v-for="c in countries" :value="c.id" :key="c.id">
                      {{ lang == "ar" ? c.title : c.title_en }}
                    </option>
                  </select>
                </div>

                <div
                  class="personal-form-wide"
                  v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                >
                  <div class="personal-form-icon">
                    <i class="bx bxs-city"></i>
                  </div>
                  <select name="bCity" id="bCity" v-model="order.city_id">
                    <option value="" disabled selected>
                      {{ lang == "ar" ? "المدينة" : "City" }}
                    </option>
                    <option v-for="c in zones" :value="c.id" :key="c.id">
                      {{ lang == "ar" ? c.title : c.title_en }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="title-box">
              <div class="icon-title-box">
                <i class="bx bxs-id-card"></i>
              </div>
              <div class="title-box-title">
                <span>{{
                  lang == "ar" ? "البيانات الشخصية " : "Personal Information"
                }}</span>
              </div>
            </div>

            <div class="personal-details-block">
              <div class="personal-form-group">
                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-user"></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="benefiterName"
                      v-model="order.fullname"
                      v-bind="{ placeholder: lang == 'ar' ? 'الاسم كامل' : 'Full Name' }"
                      id="benefiterName"
                    />
                  </div>
                  <span v-if="errors.name" class="errorMessageError">
                    <strong>{{ errorMsgs.name }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-envelope"></i>
                    </div>
                    <input
                      required
                      type="email"
                      @blur="validateEmail"
                      name="benefiterPhone"
                      v-model="order.email"
                      v-bind="{
                        placeholder: lang == 'ar' ? 'البريد الالكتروني' : 'Email Address',
                      }"
                      id="benefiterPhone"
                    />
                  </div>
                  <span v-if="errors.email" class="errorMessageError">
                    <strong>{{ errorMsgs.email }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                    <div
                      v-bind:style="
                        country == 11 || country == 8
                          ? 'display: flex;'
                          : 'display: none;'
                      "
                      v-if="lang == 'en'"
                      class="country-phone-code-block"
                    >
                      <span>
                        {{ country == 11 ? "+973" : "" }}
                        {{ country == 8 ? "+966" : "" }}
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      name="benefiterPhone"
                      v-model="order.phone"
                      :maxlength="order.country_id == 11 ? 9 : 10"
                      onkeyup="this.value=this.value.replace(/[^\d]/,'')"
                      @blur="validatePhone"
                      v-bind="{
                        placeholder: lang == 'ar' ? 'رقم الهاتف' : 'Phone Number',
                      }"
                      id="benefiterPhone"
                    />
                    <div v-if="lang == 'ar'" class="country-phone-code-block">
                      <span>
                        {{ country == 11 ? "+973" : "" }}
                        {{ country == 8 ? "+966" : "" }}
                      </span>
                    </div>
                  </div>
                  <span v-if="errors.phone" class="errorMessageError">
                    <strong>{{ errorMsgs.phone }}</strong>
                  </span>
                </div>
              </div>
              <div class="personal-form-group">
                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-id-card"></i>
                    </div>
                    <input
                      type="number"
                      name="benefiterId"
                      v-model="order.identity_number"
                      v-bind="{ placeholder: lang == 'ar' ? 'رﻗﻢ الاثبات' : 'ID No.' }"
                      id="benefiterId"
                    />
                  </div>
                  <span v-if="errors.identity_number" class="errorMessageError">
                    <strong>{{ errorMsgs.identity_number }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div
                    class="personal-form-signle"
                    v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                  >
                    <div class="personal-form-icon">
                      <i class="bx bx-male-female"></i>
                    </div>
                    <select name="bGender" id="bGender" v-model="order.gender">
                      <option value="" disabled selected>
                        {{ lang == "ar" ? "الجنس" : "Gender" }}
                      </option>
                      <option value="male">{{ lang == "ar" ? "ذكر" : "Male" }}</option>
                      <option value="female">
                        {{ lang == "ar" ? "انثى" : "Female" }}
                      </option>
                    </select>
                  </div>
                  <span v-if="errors.gender" class="errorMessageError">
                    <strong>{{ errorMsgs.gender }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div
                    class="personal-form-signle"
                    v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                  >
                    <div class="personal-form-icon">
                      <i class="bx bx-flag"></i>
                    </div>
                    <select
                      name="bNationality"
                      id="bNationality"
                      v-model="order.nationality"
                    >
                      <option value="" disabled selected>
                        {{ lang == "ar" ? "اﻟﺠﻨﺴﻴﺔ" : "Nationality" }}
                      </option>
                      <option v-for="c in nationalities" :value="c.code" :key="c.code">
                        {{ c.name }}
                      </option>
                    </select>
                  </div>
                  <span v-if="errors.nationality" class="errorMessageError">
                    <strong>{{ errorMsgs.nationality }}</strong>
                  </span>
                </div>
              </div>

              <!-- 
               <div class="check-box-block">
                 <label class="">

                 <input type="checkbox"   id="company-check" 
                   v-model="company"
                >
                <span class="checkmark">
                   {{ lang == 'ar' ? 'اختر هنا إذا كنت تنتمي لإحدى هذة الجهات' : 'Click Here If you belong to one of those Parties.' }}
                  <i class='bx bxs-info-circle'></i>
               </span>
                <span></span>

              </label>
             </div>
  -->

              <div
                class="personal-form-group"
                v-show="!loading && !done && company == true"
              >
                <div class="personal-form-wide">
                  <div class="personal-form-icon">
                    <i class="bx bx-building"></i>
                  </div>
                  <select
                    name="bCity"
                    id="bCity"
                    v-model="order.city_id"
                    @change="getDistrict($event)"
                  >
                    <option value="" disabled selected>
                      {{ lang == "ar" ? "اسم الشركة" : "Company Name" }}
                    </option>
                    <option v-for="c in zones" :value="c.id" :key="c.id">
                      {{ c.title }}
                    </option>
                  </select>
                </div>
                <div
                  class="img-upload-main"
                  v-show="!loading && !done && company == true"
                >
                  <input
                    ref="imageInput"
                    id="imageInput-company"
                    style="display: none"
                    type="file"
                    @change="order.uploaded = true"
                  />
                  <label for="imageInput-company" class="">
                    <div class="img-upload-block">
                      <div class="upload-icon">
                        <i class="bx bx-cloud-upload"></i>
                      </div>
                      <span>
                        {{ lang == "ar" ? "ارفق الصورة" : "Upload Photo" }}
                      </span>
                      <span v-if="order.uploaded == true">
                        {{ lang == "ar" ? "تم" : "Done" }}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="check-box-block margin-up-mobile">
                <label for="handica-check" class="">
                  <input type="checkbox" id="handica-check" v-model="handica" />

                  <span class="checkmark">
                    {{
                      lang == "ar"
                        ? "هل أنت من ذوي الاحتياجات الخاصة؟"
                        : "Are you a Person with Special Needs?"
                    }}
                  </span>
                </label>
                <i class="bx bxs-info-circle" @click="showHandiMessage()"></i>
              </div>

              <div class="personal-form-wide">
                <div
                  class="img-upload-main"
                  v-show="!loading && !done && handica == true"
                >
                  <input
                    ref="handicaImage"
                    id="handicaImage"
                    style="display: none"
                    type="file"
                    @change="
                      handicauploaded = true;
                      order.card_type_id = 15;
                      codeValide = false;
                      order.discount_code = '';
                      paymenttype = 2;
                      deliverytype = 1;
                      codeValidationDone = false;
                    "
                  />
                  <label for="handicaImage">
                    <div class="img-upload-block">
                      <div class="upload-icon">
                        <i class="bx bx-cloud-upload"></i>
                      </div>
                      <span>
                        {{ lang == "ar" ? "ارفق الصورة" : "Upload Photo" }}
                      </span>
                    </div>
                    <span v-if="handicauploaded">
                      {{ lang == "ar" ? "تم تحميل الصورة" : "Upload Photo Done" }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- ORDER NEW CARD [SINGLE || FAMILY] -->
          </div>

          <!-- FAMILY CARD -->
          <div
            class="personal-info-main"
            v-show="!loading && !done && type == 2 && paystep == 1"
          >
            <!-- FAMILY FIRST CARD -->

            <div class="title-box">
              <div class="icon-title-box">
                <i class="bx bxs-id-card"></i>
              </div>
              <div class="title-box-title">
                <span>{{ lang == "ar" ? "العنوان" : "Address" }}</span>
              </div>
            </div>

            <div class="personal-details-block">
              <div class="personal-form-group">
                <div
                  class="personal-form-wide"
                  v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                >
                  <div class="personal-form-icon">
                    <i class="bx bx-world"></i>
                  </div>
                  <select
                    v-if="!mobileView"
                    name="bCountry"
                    id="bCountry"
                    v-model="country"
                    return-object
                    @change="
                      getBranches($event);
                      getGeneralAllStaticOffer();
                      getCities($event);
                      getdeliveryPrice();
                      order.recivingbranch_id = '';

                      offers = [];

                      error_country_check = false;
                    "
                  >
                    <option value="" disabled selected>
                      {{ lang == "ar" ? "الدولة" : "Country" }}
                    </option>
                    <option v-for="c in countries" :value="c.id" :key="c.id">
                      {{ c.title }}
                    </option>
                  </select>

                  <div v-if="error_country_check == true" class="error-country">
                    <span>{{
                      lang == "ar" ? "بالرجاء اختيار الدولة" : "Please Choose Country"
                    }}</span>
                  </div>
                </div>

                <div
                  class="personal-form-wide"
                  v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                >
                  <div class="personal-form-icon">
                    <i class="bx bxs-city"></i>
                  </div>
                  <select
                    name="bCity"
                    id="bCity"
                    v-model="order.city_id"
                    @change="getDistrict($event)"
                  >
                    <option value="" disabled selected>
                      {{ lang == "ar" ? "المدينة" : "City" }}
                    </option>
                    <option v-for="c in zones" :value="c.id" :key="c.id">
                      {{ c.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="title-box">
              <div class="icon-title-box">
                <i class="bx bxs-id-card"></i>
              </div>
              <div class="title-box-title">
                <span>{{
                  lang == "ar" ? "البيانات الشخصية " : "Personal Information"
                }}</span>
              </div>
            </div>

            <div class="personal-details-block">
              <div class="personal-form-group">
                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-user"></i>
                    </div>
                    <input
                      required
                      type="text"
                      name="benefiterName"
                      v-model="order.fullname"
                      v-bind="{ placeholder: lang == 'ar' ? 'الاسم كامل' : 'Full Name' }"
                      id="benefiterName"
                    />
                  </div>
                  <span v-if="errors.name" class="errorMessageError">
                    <strong>{{ errorMsgs.name }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-envelope"></i>
                    </div>
                    <input
                      required
                      type="email"
                      @blur="validateEmail"
                      name="benefiterPhone"
                      v-model="order.email"
                      v-bind="{
                        placeholder: lang == 'ar' ? 'البريد الالكتروني' : 'Email Address',
                      }"
                      id="benefiterPhone"
                    />
                  </div>
                  <span v-if="errors.email" class="errorMessageError">
                    <strong>{{ errorMsgs.email }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-phone"></i>
                    </div>
                    <div
                      v-bind:style="
                        country == 11 || country == 8
                          ? 'display: flex;'
                          : 'display: none;'
                      "
                      v-if="lang == 'en'"
                      class="country-phone-code-block"
                    >
                      <span>
                        {{ country == 11 ? "+973" : "" }}
                        {{ country == 8 ? "+966" : "" }}
                      </span>
                    </div>
                    <input
                      required
                      type="text"
                      name="benefiterPhone"
                      v-model="order.phone"
                      :maxlength="order.country_id == 11 ? 9 : 10"
                      onkeyup="this.value=this.value.replace(/[^\d]/,'')"
                      @blur="validatePhone"
                      v-bind="{
                        placeholder: lang == 'ar' ? 'رقم الهاتف' : 'Phone Number',
                      }"
                      id="benefiterPhone"
                    />
                    <div v-if="lang == 'ar'" class="country-phone-code-block">
                      <span>
                        {{ country == 11 ? "+973" : "" }}
                        {{ country == 8 ? "+966" : "" }}
                      </span>
                    </div>
                  </div>
                  <span v-if="errors.phone" class="errorMessageError">
                    <strong>{{ errorMsgs.phone }}</strong>
                  </span>
                </div>
              </div>
              <div class="personal-form-group">
                <div class="personal-form-single-block">
                  <div class="personal-form-signle">
                    <div class="personal-form-icon">
                      <i class="bx bx-id-card"></i>
                    </div>
                    <input
                      type="number"
                      name="benefiterId"
                      v-model="order.identity_number"
                      v-bind="{ placeholder: lang == 'ar' ? 'رﻗﻢ الاثبات' : 'ID No.' }"
                      id="benefiterId"
                    />
                  </div>
                  <span v-if="errors.identity_number" class="errorMessageError">
                    <strong>{{ errorMsgs.identity_number }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div
                    class="personal-form-signle"
                    v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                  >
                    <div class="personal-form-icon">
                      <i class="bx bx-male-female"></i>
                    </div>
                    <select name="bGender" id="bGender" v-model="order.gender">
                      <option value="" disabled selected>
                        {{ lang == "ar" ? "الجنس" : "Gender" }}
                      </option>
                      <option value="male">{{ lang == "ar" ? "ذكر" : "Male" }}</option>
                      <option value="female">
                        {{ lang == "ar" ? "انثى" : "Female" }}
                      </option>
                    </select>
                  </div>
                  <span v-if="errors.gender" class="errorMessageError">
                    <strong>{{ errorMsgs.gender }}</strong>
                  </span>
                </div>

                <div class="personal-form-single-block">
                  <div
                    class="personal-form-signle"
                    v-bind:class="lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'"
                  >
                    <div class="personal-form-icon">
                      <i class="bx bx-flag"></i>
                    </div>
                    <select
                      name="bNationality"
                      id="bNationality"
                      v-model="order.nationality"
                    >
                      <option value="" disabled selected>
                        {{ lang == "ar" ? "اﻟﺠﻨﺴﻴﺔ" : "Nationality" }}
                      </option>
                      <option v-for="c in nationalities" :value="c.code" :key="c.code">
                        {{ c.name }}
                      </option>
                    </select>
                  </div>
                  <span v-if="errors.nationality" class="errorMessageError">
                    <strong>{{ errorMsgs.nationality }}</strong>
                  </span>
                </div>
              </div>
              <!-- <div class="check-box-block">
                            <label class="">

                                <input type="checkbox" id="company-check" v-model="company">
                                <span class="checkmark">
                                    {{ lang == 'ar' ? 'اختر هنا إذا كنت تنتمي لإحدى هذة الجهات' : 'Click Here If you belong to one of those Parties.' }}
                                    <i class='bx bxs-info-circle'></i>
                                </span>
                                <span></span>

                            </label>
                        </div> -->
              <!-- <div class="personal-form-group" v-show="!loading && !done && company == true">
                            <div class="personal-form-wide">
                                <div class="personal-form-icon">
                                    <i class="bx bx-building"></i>
                                </div>
                                <select name="bCity" id="bCity" v-model="order.city_id" @change="getDistrict($event)">
                                    <option value="" disabled selected>
                                        {{ lang == "ar" ? "اسم الشركة" : "Company Name" }}
                                    </option>
                                    <option v-for="c in zones" :value="c.id" :key="c.id">
                                        {{ c.title }}
                                    </option>
                                </select>
                            </div> 
                             <div class="img-upload-main" v-show="!loading && !done && company == true">
                                <input ref="imageInput" id="imageInput-company" style="display: none" type="file" @change="order.uploaded = true" />
                                <label for="imageInput-company" class="">
                                    <div class="img-upload-block">
                                        <div class="upload-icon">
                                            <i class="bx bx-cloud-upload"></i>
                                        </div>
                                        <span>
                                            {{ lang == "ar" ? "ارفق الصورة" : "Upload Photo" }}
                                        </span>
                                    </div>
                                </label>
                            </div> 
                        </div>
                                -->
              <div class="check-box-block" v-if="false">
                <label for="handica-check" class="">
                  <input type="checkbox" id="handica-check" v-model="handica" />

                  <span class="checkmark">
                    {{
                      lang == "ar"
                        ? "هل أنت من ذوي الاحتياجات الخاصة؟"
                        : "Are you a Person with Special Needs?"
                    }}
                  </span>
                </label>
                <i class="bx bxs-info-circle" @click="showHandiMessage()"></i>
              </div>
              <div class="personal-form-wide" v-if="false">
                <div
                  class="img-upload-main"
                  v-show="!loading && !done && handica == true"
                >
                  <input
                    ref="handicaImagefamily"
                    id="handicaImagefamily"
                    style="display: none"
                    type="file"
                    @change="
                      order.uploaded = true;
                      handicauploaded = true;
                      order.card_type_id = 15;
                    "
                  />
                  <label for="handicaImagefamily" class="">
                    <div class="img-upload-block">
                      <div class="upload-icon">
                        <i class="bx bx-cloud-upload"></i>
                      </div>
                      <span>
                        {{ lang == "ar" ? "! ارفق الصورة" : "Upload Photo" }}
                      </span>
                    </div>
                    <span v-if="handicauploaded">
                      {{ lang == "ar" ? "تم تحميل الصورة" : "Upload Photo Done" }}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <!-- FAMILY SECOND CARD -->
            <div v-for="(sub, index) in order.subOrders" :key="index">
              <div class="title-box flex-title-multiple" style="margin: 20px 0 0 0">
                <div style="display: flex">
                  <div class="icon-title-box">
                    <i class="bx bxs-id-card"></i>
                  </div>
                  <div class="title-box-title">
                    <span>{{
                      lang == "ar"
                        ? "بطاقة رقم " + (index + 1)
                        : "Card No. " + (index + 1)
                    }}</span>
                  </div>
                </div>

                <div class="remove-card" @click="delCard(index)">
                  <i class="bx bx-x"></i>
                </div>
              </div>

              <div class="personal-details-block">
                <div class="personal-form-group">
                  <div class="personal-form-single-block">
                    <div class="personal-form-signle">
                      <div class="personal-form-icon">
                        <i class="bx bx-user"></i>
                      </div>
                      <input
                        required
                        type="text"
                        name="benefiterName"
                        v-model="sub.fullname"
                        v-bind="{
                          placeholder: lang == 'ar' ? 'الاسم كامل' : 'Full Name',
                        }"
                        id="benefiterName"
                      />
                    </div>

                    <span v-if="sub.errors.name" class="errorMessageError">
                      <strong>{{ sub.errorMsgs.name }}</strong>
                    </span>
                  </div>

                  <div class="personal-form-single-block">
                    <div class="personal-form-signle">
                      <div class="personal-form-icon">
                        <i class="bx bx-envelope"></i>
                      </div>
                      <input
                        type="email"
                        name="benefiterPhone"
                        v-model="sub.email"
                        v-bind="{
                          placeholder:
                            lang == 'ar' ? 'البريد الالكتروني' : 'Email Address',
                        }"
                        id="benefiterPhone"
                      />
                    </div>
                  </div>

                  <div class="personal-form-single-block">
                    <div class="personal-form-signle">
                      <div class="personal-form-icon">
                        <i class="bx bx-phone"></i>
                      </div>
                      <div
                        v-bind:style="
                          country == 11 || country == 8
                            ? 'display: flex;'
                            : 'display: none;'
                        "
                        v-if="lang == 'en'"
                        class="country-phone-code-block"
                      >
                        <span>
                          {{ country == 11 ? "+973" : "" }}
                          {{ country == 8 ? "+966" : "" }}
                        </span>
                      </div>
                      <input
                        type="text"
                        name="benefiterPhone"
                        v-model="sub.phone"
                        :maxlength="order.country_id == 11 ? 9 : 10"
                        onkeyup="this.value=this.value.replace(/[^\d]/,'')"
                        v-bind="{
                          placeholder: lang == 'ar' ? 'رقم الهاتف' : 'Phone Number',
                        }"
                        id="benefiterPhone"
                      />
                      <div v-if="lang == 'ar'" class="country-phone-code-block">
                        <span>
                          {{ country == 11 ? "+973" : "" }}
                          {{ country == 8 ? "+966" : "" }}
                        </span>
                      </div>
                    </div>
                    <span v-if="sub.errors.phone" class="errorMessageError">
                      <strong>{{ sub.errorMsgs.phone }}</strong>
                    </span>
                  </div>
                </div>
                <div class="personal-form-group">
                  <div class="personal-form-single-block">
                    <div class="personal-form-signle">
                      <div class="personal-form-icon">
                        <i class="bx bx-id-card"></i>
                      </div>
                      <input
                        type="number"
                        name="benefiterId"
                        v-model="sub.identity_number"
                        v-bind="{ placeholder: lang == 'ar' ? 'رﻗﻢ الاثبات' : 'ID No.' }"
                        id="benefiterId"
                      />
                    </div>
                    <span v-if="sub.errors.identity_number" class="errorMessageError">
                      <strong>{{ sub.errorMsgs.identity_number }}</strong>
                    </span>
                  </div>

                  <div class="personal-form-single-block">
                    <div
                      class="personal-form-signle"
                      v-bind:class="
                        lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'
                      "
                    >
                      <div class="personal-form-icon">
                        <i class="bx bx-male-female"></i>
                      </div>
                      <select name="bGender" id="bGender" v-model="sub.gender">
                        <option value="" disabled selected>
                          {{ lang == "ar" ? "الجنس" : "Gender" }}
                        </option>
                        <option value="male">{{ lang == "ar" ? "ذكر" : "Male" }}</option>
                        <option value="female">
                          {{ lang == "ar" ? "انثى" : "Female" }}
                        </option>
                      </select>
                    </div>
                    <span v-if="sub.errors.gender" class="errorMessageError">
                      <strong>{{ sub.errorMsgs.gender }}</strong>
                    </span>
                  </div>

                  <div class="personal-form-single-block">
                    <div
                      class="personal-form-signle"
                      v-bind:class="
                        lang == 'ar' ? 'select-anchor-ar' : 'select-anchor-en'
                      "
                    >
                      <div class="personal-form-icon">
                        <i class="bx bx-flag"></i>
                      </div>
                      <select
                        name="bNationality"
                        id="bNationality"
                        v-model="sub.nationality"
                      >
                        <option value="" disabled selected>
                          {{ lang == "ar" ? "اﻟﺠﻨﺴﻴﺔ" : "Nationality" }}
                        </option>
                        <option v-for="c in nationalities" :value="c.code" :key="c.code">
                          {{ c.name }}
                        </option>
                      </select>
                    </div>

                    <span v-if="sub.errors.nationality" class="errorMessageError">
                      <strong>{{ sub.errorMsgs.nationality }}</strong>
                    </span>
                  </div>
                </div>

                <div class="check-box-block" v-if="index > 0">
                  <label :for="'section' + index" @click="sub.handica = !sub.handica">
                    <input
                      :id="'section' + index"
                      type="checkbox"
                      v-model="sub.handica"
                    />

                    <span class="checkmark">
                      {{
                        lang == "ar"
                          ? "هل أنت من ذوي الاحتياجات الخاصة؟"
                          : "Are you a Person with Special Needs?"
                      }}
                    </span>
                  </label>
                  <i class="bx bxs-info-circle" @click="showHandiMessage()"></i>
                </div>
                <div class="personal-form-wide">
                  <div class="img-upload-main" v-show="sub.handica == true">
                    <input
                      :ref="`imageInput_${index}`"
                      :id="`imageInput_${index}`"
                      style="display: none"
                      type="file"
                      @change="
                        sub.uploaded = true;
                        sub.card_type_id = 15;
                      "
                    />
                    <label :for="`imageInput_${index}`">
                      <div class="img-upload-block">
                        <div class="upload-icon">
                          <i class="bx bx-cloud-upload"></i>
                        </div>
                        <span>
                          {{ lang == "ar" ? "ارفق الصورة" : "Upload Photo" }}
                        </span>
                      </div>
                      <span v-if="sub.uploaded">
                        {{ lang == "ar" ? "تم تحميل الصورة" : "Upload Photo Done" }}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- ADD ANOTHER CARD -->
            <div class="add-card-block cursor-pointer" @click="addCard">
             

                      <div class="static_offer1">
                        
                        <div >
                          <div >
                            <i class="bx bx-plus"></i>
                          </div>
                          
                          <span >{{ lang == "ar" ? "  إضافة بطاقة " : " Add Card " }} </span>
                      
                          <span v-if="!(generalstaticofferfamily && generalstaticofferfamily >0) " class="price-add-card" >
                            {{ family_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>

                         <span style="text-decoration: line-through; margin-left: 10px;" class="price-add-card" v-if="generalstaticofferfamily && generalstaticofferfamily >0">
                             {{ family_price }} {{ lang == "ar" ? currencies[1] : currencies[0] }}</span>
                        </div>
                      </div>
             
                      
                      <div class="static_offer" v-if=" generalstaticofferfamily && generalstaticofferfamily >0" 
                        >
                       <span>
                          {{ parseInt((Number(family_price)-(Number(family_price) * (Number(generalstaticofferfamily)/100)))*(1+taxValue)) }} {{ lang == "ar" ? currencies[1] : currencies[0] }}
                        {{ lang == "ar" ? "ساري لفترة محدودة" : "Valid for a limited time" }}
                       </span>
                        </div>

            </div>

            <!-- ORDER NEW CARD [SINGLE || FAMILY] -->
          </div>

          <!-- PAYMENT MAIN BLOCK -->
          <div class="payment-main-block" v-show="!loading && !done && paystep == 2">
            <div class="pay-block" v-if="orderhandica == false">
              <div class="title-box">
                <div class="icon-title-box">
                  <i class="bx bx-money-withdraw"></i>
                </div>
                <div class="title-box-title" style="margin: 0 0 10px 0">
                  <span>{{ lang == "ar" ? "خيارات الدفع" : "Payment Method" }}</span>
                </div>
              </div>
              <div class="personal-form-group">
                <div
                  class="personal-form-signle cursor-pointer"
                  v-bind:class="paymenttype == 1 ? 'form-active' : ''"
                  @click="
                    paymenttype = 1;
                    deliverytype = 3;
                    calculateTheTotalPrices();
                  "
                >
                  <div class="personal-form-icon">
                    <i class="bx bx-credit-card"></i>
                  </div>
                  <div class="personal-form-text">
                    <span>
                      {{ lang == "ar" ? "البطاقة الائتمانية" : "Credit Card" }}
                    </span>
                    <div
                      v-bind:class="
                        paymenttype == 1 ? 'check-payment-active' : 'check-payment'
                      "
                    >
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                </div>

                <div
                  class="personal-form-signle cursor-pointer"
                  v-bind:class="paymenttype == 2 ? 'form-active' : ''"
                  @click="
                    paymenttype = 2;
                    deliverytype = 1;
                    order.recivingbranch_id = null;
                    calculateTheTotalPrices();
                  "
                >
                  <div class="personal-form-icon">
                    <i class="bx bx-money"></i>
                  </div>
                  <div class="personal-form-text">
                    <span>
                      {{ lang == "ar" ? "الدفع عند الاستلام" : "Cash On Delivery" }}
                    </span>
                    <div
                      v-bind:class="
                        paymenttype == 2 ? 'check-payment-active' : 'check-payment'
                      "
                    >
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pay-block">
              <div class="title-box">
                <div class="icon-title-box">
                  <i class="bx bxs-truck"></i>
                </div>
                <div class="title-box-title" style="margin: 0 0 10px 0">
                  <span>{{ lang == "ar" ? "خيارات الشحن" : "Shipping Method" }}</span>
                </div>
              </div>
              <div class="personal-form-group">
                <div
                  v-if="paymenttype == 2"
                  class="personal-form-signle cursor-pointer"
                  v-bind:class="deliverytype == 1 ? 'form-active' : ''"
                  @click="
                    deliverytype = 1;
                    order.recivingbranch_id = null;
                    calculateTheTotalPrices();
                  "
                >
                  <div class="personal-form-icon">
                    <i class="bx bxs-map"></i>
                  </div>
                  <div class="personal-form-text">
                    <span>
                      {{ lang == "ar" ? "الاستلام من الفرع" : "Drop at Branch" }}
                    </span>
                    <div
                      v-bind:class="
                        deliverytype == 1 ? 'check-payment-active' : 'check-payment'
                      "
                    >
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                </div>
                <div
                  v-if="paymenttype == 1"
                  class="personal-form-signle cursor-pointer"
                  v-bind:class="deliverytype == 3 ? 'form-active' : ''"
                  @click="
                    deliverytype = 3;
                    calculateTheTotalPrices();
                  "
                >
                  <div class="personal-form-icon">
                    <i class="bx bxs-message"></i>
                  </div>
                  <div class="personal-form-text">
                    <span>
                      {{
                        lang == "ar" ? "الاستلام ب البريد الالكتروني" : "Drop at Email"
                      }}
                    </span>
                    <div
                      v-bind:class="
                        deliverytype == 3 ? 'check-payment-active' : 'check-payment'
                      "
                    >
                      <i class="bx bx-check"></i>
                    </div>
                  </div>
                </div>

                <!-- <div 
                  v-if="orderhandica == false || type == 1"
                  class="personal-form-signle cursor-pointer"
                  v-bind:class="deliverytype == 2 ? 'form-active' : ''"
                  @click="
                    deliverytype = 2;
                    calculateTheTotalPrices();
                  "
                >
                  <div class="personal-form-icon">
                    <i class="bx bx-home-alt"></i>
                  </div>
                  <div class="personal-form-text">
                    <span>
                      {{ lang == "ar" ? "الاستلام في البيت" : "Drop at Home" }}
                    </span>
                    <div style="display: flex; align-items: center">
                      <div class="cod-price" style="direction: ltr">
                        <span
                          >{{ delivery_price }}
                          {{ lang == "ar" ? currencies[1] : currencies[0] }}</span
                        >
                      </div>
                      <div
                        v-bind:class="
                          deliverytype == 2 ? 'check-payment-active' : 'check-payment'
                        "
                      >
                        <i class="bx bx-check"></i>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <div
                v-bind:class="lang == 'ar' ? 'branch-select' : 'branch-select-en'"
                v-show="
                  !loading &&
                  !done &&
                  paymenttype == 2 &&
                  deliverytype == 1 &&
                  country == 8
                "
              >
                <select name="bCity" id="bCity" v-model="order.recivingbranch_id">
                  <option value="" disabled selected>
                    {{ lang == "ar" ? "اختر الفرع" : "Select Branch" }}
                  </option>
                  <option v-for="c in branch" :value="c.id" :key="c.id">
                    {{ lang == "ar" ? c.title : c.title_en }}
                  </option>
                </select>
              </div>
              <div class="branch-select" v-show="!loading && !done && deliverytype == 2">
                <input
                  type="text"
                  name="benefiterName"
                  v-model="order.customer_detail_address"
                  v-bind="{
                    placeholder: lang == 'ar' ? 'ادخل العنوان' : 'Enter Full Address',
                  }"
                  id="benefiterName"
                />
              </div>
            </div>

            <div
              class="pay-block"
              v-if="orderhandica == false"
              style="padding: 0 0 40px 0"
            >
              <div class="title-box">
                <div class="icon-title-box">
                  <i class="bx bxs-coupon"></i>
                </div>
                <div class="title-box-title">
                  <span>{{ lang == "ar" ? "كود الخصم" : "Coupon" }}</span>
                </div>
              </div>

              <div class="coupon-block">
                <div class="coupon-input border-test">
                  <input
                    class="border-test1"
                    autocomplete="off"
                    type="text"
                    name="benefiterName"
                    v-model="order.discount_code"
                    v-bind="{
                      placeholder: lang == 'ar' ? 'ادخل كود الخصم' : 'Enter Coupon Code',
                    }"
                    id="benefiterName"
                  />

                  <div @click="deleteDiscountCode()">
                    <span class="deleteCode"> X </span>
                  </div>
                  <div class="coupon-check-button" @click="checkCodeValidity()">
                    <span>
                      {{ lang == "ar" ? "تحقق" : "Check       " }}
                    </span>
                  </div>
                </div>
                <div v-if="codeValidationDone" class="code-check-block">
                  <i
                    v-if="codeValide == true"
                    style="color: #18b4bb"
                    class="bx bx-check"
                  ></i>
                  <strong v-if="codeValide == true">
                    <span style="color: #18b4bb"
                      >{{ lang == "ar" ? "تم التحقق وتم خصم" : "validate and discount" }}
                      {{ order.discountpersentage }} % {{ offerTitle }}
                    </span>
                  </strong>
                  <i v-if="codeValide == false" class="error"> X </i>
                  <strong v-if="codeValide == false" class="error">
                    <span>{{ lang == "ar" ? "الكود خاطئ" : "wrong code" }} </span>
                  </strong>
                </div>
              </div>
            </div>
            <div class="check-box-block">
              <label class="">
                <input type="checkbox" id="condition-check" v-model="terms_conditions" />
                <span class="checkmark">
                  {{
                    lang == "ar"
                      ? "اوافق على الشروط والاحكام"
                      : "Agree to terms and conditions"
                  }}
                  <i class="bx bxs-info-circle polices" @click="goToPolices()"></i>
                </span>
                <span></span>
              </label>
            </div>
            <!-- TOTAL PRICE -->
            <div class="pay-block">
              <div class="title-box">
                <div class="icon-title-box">
                  <i class="bx bxs-file"></i>
                </div>
                <div class="title-box-title">
                  <span>{{ lang == "ar" ? "تفاصيل الطلب" : "Order Details" }}</span>
                </div>
              </div>

              <div class="order-details-block">
                <div class="price-item" v-if="!codeValide">
                  <div class="price-item-text">
                    <!-- <span>{{ lang == "ar" ? "سعر البطاقة" : "Card Price" }}</span> -->
                    <label>{{ lang == "ar" ? "السعر  " : "Cost  " }}</label>
                  </div>
                  <div class="price-item-price">
                    <!-- <span>{{card_price}} S.R</span> -->
                    <span v-if="order.beforeOffer">
                      <b>{{
                        order.beforeOffer
                          ? parseFloat(order.beforeOffer).toFixed(2)
                          : order.pricing
                      }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                    <span v-if="!order.beforeOffer">
                      <b>{{
                        order.pricing
                          ? parseFloat(order.pricing).toFixed(2)
                          : order.pricing
                      }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                  </div>
                </div>
                <div class="price-item" v-if="codeValide">
                  <div class="price-item-text">
                    <!-- <span>{{ lang == "ar" ? "سعر البطاقة" : "Card Price" }}</span> -->
                    <label>{{
                      lang == "ar" ? "السعر قبل الخصم" : "Cost Before The Offer"
                    }}</label>
                  </div>
                  <div class="price-item-price">
                    <!-- <span>{{card_price}} S.R</span> -->
                    <span v-if="order.beforeOffer">
                      <b>{{
                        order.beforeOffer
                          ? parseFloat(order.beforeOffer).toFixed(2)
                          : order.pricing
                      }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                    <span v-if="!order.beforeOffer">
                      <b>{{
                        order.pricing
                          ? parseFloat(order.pricing).toFixed(2)
                          : order.pricing
                      }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                  </div>
                </div>

                <div class="price-item" v-if="codeValide">
                  <div class="price-item-text">
                    <label>{{
                      lang == "ar" ? "السعر بعد الخصم" : "After The Offer"
                    }}</label>
                  </div>
                  <div class="price-item-price">
                    <!-- <span>{{delivery_price}} S.R</span> -->
                    <span>
                      <b>{{
                        order.pricing
                          ? parseFloat(order.pricing).toFixed(2)
                          : order.pricing
                      }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                  </div>
                </div>

                <div class="price-item" v-if="deliverytype == 2">
                  <div class="price-item-text">
                    <span>{{ lang == "ar" ? "سعر التوصيل" : "Delivery Price" }}</span>
                  </div>
                  <div class="price-item-price">
                    <span
                      >{{ delivery_price }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}</span
                    >
                  </div>
                </div>
                <div class="price-item">
                  <div class="price-item-text">
                    <label>{{ lang == "ar" ? "ض.ق.م" : "V.A.T" }} </label>
                  </div>
                  <div class="price-item-price">
                    <span>
                      <b>{{ order.tax ? order.tax.toFixed(2) : order.tax }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                  </div>
                </div>
                <!-- <div class="price-item">
                  <div class="price-item-text">
                    <span>{{ lang == "ar" ? "قيمة الكوبون" : "Coupoun Discount" }}</span>
                  </div>
                  <div class="price-item-price">
                    <span>190.00 S.R</span>
                  </div>
                </div> -->
                <!-- <div class="price-item">
                  <div class="price-item-text">
                    <span>{{ lang == "ar" ? "ض.ق.م" : "V.A.T" }}</span>
                  </div>
                  <div class="price-item-price">
                    <span>190.00 S.R</span>
                  </div>
                </div> -->
                <div class="price-item">
                  <div class="price-item-text">
                    <span style="font-weight: 700">{{
                      lang == "ar" ? "الإجمالي" : "Total Price"
                    }}</span>
                  </div>
                  <div class="price-item-price">
                    <!-- <span> {{total_price}} S.R</span> -->
                    <span v-show="type == 1">
                      <b>{{ order.totalPrice }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                    <span v-show="type == 2">
                      <b>{{ order.totalPrice }}</b>
                      {{ lang == "ar" ? country.currency : country.currency_en }}
                      {{ lang == "ar" ? currencies[1] : currencies[0] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SUBMIT BUTTON -->
          <div
            class="submit-block"
            style="justify-content: end; margin-top: 20px"
            v-show="!loading && !done && paystep == 1"
          >
            <div
              class="submit-button"
              @click="
              goToNext()
              "
            >
              <span>{{ lang == "ar" ? "المتابعة" : "Proceed" }}</span>
            </div>
          </div>

          <div
            class="submit-block two-buttons-submit"
            v-show="!loading && !done && paystep == 2"
          >
            <div class="back-button" @click="paystep = 1;order.order_type='add';general_o_type='add';order.memebrcard_id='';order.membership_id=null;">
              <span>{{ lang == "ar" ? "الرجوع" : "Back" }}</span>
            </div>
            <div class="submit-button" @click="addSubscribe()">
              <span>{{ lang == "ar" ? "اتمام العملية" : "Complete Process" }}</span>
            </div>
          </div>

          <!--  -->
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
if (document.querySelector(".btnSuccess") != null) {
  document.querySelector(".btnSuccess").addEventListener("click", function () {
    gtag("event", "conversion", {
      send_to: "AW-745144959/SFH4CImd6a4BEP-EqOMC",
    });
  });
}
</script>

<script>
import swal from "sweetalert";

// FACEBOOK PIXEL TAG
fbq("track", "PageView");
snaptr("track", "PAGE_VIEW");
twq("track", "PageView");
ttq.track("ViewContent");

gtag("event", "view_item", {
  'event_label': "Subscribe_Page_View",
  'event_category': "engagement",
});

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
    title: localStorage.getItem("lang") == "en" ? "Health Care" : "الرعاية الصحية",
  },

  data() {
    return {
      lang: "ar",
      type: 1,

      currenciesSR: ["SR", "ر.س"],
      currenciesBH: ["BHD", "د.ب"],
      currencies: [],
      type1: true,
      type2: false,
      isActive: false,

      handica: false,
      orderhandica: false,
      handicauploaded: false,
      terms_conditions: false,
      company: false,
      error_country_check: false,

      paystep: 1,
      paymenttype: 1,
      deliverytype: 3,

      loading: false,
      mobileView: false,
      mobileLoading: true,
      newLoading: false,
      finished: false,
      done: false,
      hasMembership: 0,
      error: "",
      general_o_type: 'add',
      general_o_membership_id: "",
      pricing: null,
      offerPriced: "",
      nationalities: json,
      countries: [],
      tot_prices: [],
      new_prices: [], // new prices
      single_price: "",
      family_price: "",
      delivery_price: "",
      delivery_price_single: "",
      delivery_price_family: "",
  
      total_price: "",
      card_price: "",

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

      errors: {
        name: false,
        phone: false,
        email: false,
        identity_number: false,
        nationality: false,
        birthdate: false,
        card_type: false,
        company_name: false,
        evidences: false,
      },
      errorMsgs: {
        name: false,
        phone: false,
        email: false,
        identity_number: false,
        nationality: false,
        birthdate: false,
        card_type: false,
        company_name: false,
        evidences: false,
      },

      // family price data
      taxValue: 0,
      calculateTotalPrice: 0,
      totalFamilyPrice: 0,
      totalBeforeOffer: 0,
      totalTaxes: 0,
      codeValidationMessage: [],
      codeValidationDone: false,
      generalstaticoffersingle: null,
      generalstaticofferfamily: null,
      offerTitle: "",
      codeValide: false,
      images: [],
      cost: {
        total: 0,
        sub_total: 0,
        tax: 0,
      },
      prices: [],
      order: {
        order_type:'add',
        memebrcard_id:"",
        subscription_id: 13,
        fullname: "",
        gender: "",
        identity_number: "",
        membership_id: null,
        phone: "",
        email: "",
        country: "",
        country_id: "",
        city_id: "",
        zone_id: "",
        notes: "",
        customer_district: "",
        offer_id: "",
        coupon_id: "",
        recivingbranch_id: "",
        customer_detail_address: "",
        discount_code: "",
        discountpersentage: "",
     
        discount_id: "",
        discount_type: "coupon",
        customer_customer_id: "",
        // referal_id:"",
        nationality: "",
        customer_kind: "",
        customer_relation: "",
        bDistrict: "",
        card_type_id: null,
        representer_: "",
        handicaImage: null,
        tax: 0,
        totalPrice: 0,
        subOrders: [],
        handigroup: [],
        media: [],
      },
      country: "",
    };
  },
  watch: {
    country(val) {
      let app = this;
      console.log("country method");

      if (app.country == 8) {
        this.taxValue = 0.15;
      } else {
        this.taxValue = 0;
      }
      this.error = [];
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
      console.log("order . subOrders . length  method");
      // this.calculateTheTotalPrices();
    },

    calculateTotalPrice(total) {
      console.log("order with total", this.order);
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
      let app = this;
      if (app.handica == false) {
        this.order.card_type_id = null;
      }
      
      let params = {
        country_id: this.country,
        card_type_id: this.order.card_type_id,
        subscription_id: this.order.subscription_id,
      };

      if (this.order.offer_id) params.offer_id = this.order.offer_id;
      if (this.order.coupon_id) params.coupon_id = this.order.coupon_id;

      return axios
        .get(`${API_URL}/api/v2/get_price`, {
          params: params,
        })
        .then((res) => {
          console.log("get Price", res);
          return [parseFloat(res.data.data), parseFloat(res.data.beforeOffer)];
        });
    },

    async calculateTheTotalPrices() {
      let app = this;
      console.log("calculate The Total Prices method new");
      if (this.order.subscription_id == 13) {
        await this.getPrice(this.order).then((prices) => {
          this.order.pricing = prices[0];
          this.order.beforeOffer = prices[1];
          if (this.order.pricing > 0) {
            this.order.totalPrice = Number(this.order.pricing);
            if (this.deliverytype == 2) {
              this.order.totalPrice =
                Number(this.order.totalPrice) + Number(this.delivery_price);
            }
            this.order.tax = this.order.totalPrice * this.taxValue;
            this.order.totalPrice = (this.order.totalPrice * (1 + this.taxValue)).toFixed(
              2
            );
          } else {
            this.order.totalPrice = 0;
            this.order.tax = 0;
            if (this.deliverytype == 2) {
              this.order.totalPrice =
                Number(this.order.totalPrice) + Number(this.delivery_price);
              this.order.tax = this.order.totalPrice * this.taxValue;
              this.order.totalPrice =
                Number(this.order.totalPrice) + Number(this.order.tax);
            }
          }
        });
      } else {
        let oneprice = this.family_price;
        this.order.pricing = 0;
        this.order.beforeOffer = 0;
        this.order.totalPrice = 0;

        if (this.handica == false) {
          console.log("first card handica", this.order.handica);
          this.order.card_type_id = null;
          this.order.pricing = oneprice;
          this.order.beforeOffer = oneprice;
          this.order.totalPrice = oneprice;
          console.log("first card price", this.order.pricing);
        } else {
          console.log("first card is handica handica", this.order.handica);
        }

        this.order.subOrders.forEach(async (objiteem) => {
          if (objiteem.handica == false) {
            objiteem.card_type_id = null;
            console.log("old price every card", this.order.pricing);
            this.order.pricing = Number(this.order.pricing) + Number(oneprice);
            this.order.beforeOffer = Number(this.order.beforeOffer) + Number(oneprice);
            this.order.totalPrice = Number(this.order.totalPrice) + Number(oneprice);
          }
        });

        if (app.codeValide && app.order.discountpersentage > 0) {
          this.order.beforeOffer = this.order.pricing;
          this.order.pricing =
            Number(this.order.pricing) -
            Number(this.order.pricing) * (Number(app.order.discountpersentage) / 100);
          this.order.totalPrice = this.order.pricing;
        }

        // this.order.tax = this.order.pricing * this.taxValue;
        // this.order.totalPrice = (this.order.pricing * (1 + this.taxValue)).toFixed(2);
        if (this.deliverytype == 2) {
          this.order.totalPrice =
            Number(this.order.totalPrice) + Number(this.delivery_price);
        }

        this.order.tax = this.order.totalPrice * this.taxValue;
        this.order.totalPrice = (this.order.totalPrice * (1 + this.taxValue)).toFixed(2);
      }
      this.$forceUpdate();
    },
    async orderHandica() {
      let app = this;
      if (app.type == 1) {
        if (app.handica == false) {
          app.orderhandica = false;
        } else {
          app.orderhandica = true;
        }
      } else if (app.type == 2) {
        if (app.handica == false) {
          app.orderhandica = false;
          // زوي همم
        } else {
          app.orderhandica = true;
        }

        if (app.orderhandica == true) {
          if (this.order.subOrders.length > 0) {
            let newvalu = true;
            for (let i = 0; i < this.order.subOrders.length; i++) {
              let ooobbbjj = this.order.subOrders[i];
              console.log(ooobbbjj);
              if (ooobbbjj.card_type_id == null) {
                newvalu = false;
              }
            }
            app.orderhandica = newvalu;
          }
        }
      }
    },

    // getMembership: function() {
    //   let app = this;

    //   axios
    //     .get(API_URL + "memberCard/searchby_membership/" + app.order.membership_id)
    //     .then(function(response) {
    //       app.memberShipData = response.data;
    //     });
    // },

    showHandiMessage() {
      swal({
        text:
          this.lang == "ar"
            ? "تمنح بطاقة الرعاية الصحية هدية مدى الحياة لذوي الإعاقة مثل (الصم والبكم ومتلازمة داون والتوحد والكفيف والتخلف العقلي وتأخر النمو والشلل والبتر) وايضاً للأمراض الخطيرة مثل (غسيل الكلى والكبد الوبائي والجلطات والتصلب اللويحي والصرع والثلاسيميا والأنيميا المنجلية والذئبة الحمراء والفصام والزهايمر والقلب المفتوح والسرطانات بأنواعها) ولمتبرعي الأعضاء والمتبرع لهم وأبناء الشهداء"
            : "The health care card gives a gift for life to people with disabilities such as (deaf and dumb, Down syndrome, autism, the blind, mental retardation, developmental delay, paralysis and amputation), as well as for serious diseases such as (dialysis, hepatitis, stroke, multiple sclerosis, epilepsy, thalassemia, sickle cell anemia, lupus, schizophrenia, Alzheimer's, open heart and all kinds of cancers) and for donors Members, their donors, and the children of martyrs",
        icon: "warning",
        buttons: false,
        dangerMode: true,
      });
    },
    getAllData() {
    
      var val = Math.floor(100000000 + Math.random() * 900000000);
      var val2 = Math.floor(100000000 + Math.random() * 900000000);
      console.log("val phone test", val);
      console.log("val phone test 2", val2);

      let app = this;
      app.newLoading = true;

      axios.get(API_URL + "/api/data").then(function (response) {

        app.countries = response.data.Country;
        app.currencies = app.currenciesSR;
        app.new_prices = response.data.Prices;
        for (let iii = 0; iii < app.new_prices.length; iii++) {
          if (app.new_prices[iii]["subscription"].title_en == "SINGLE") {
            app.single_price = app.new_prices[iii].price;
            app.delivery_price_single = app.new_prices[iii].delivery_price;
          }
          if (app.new_prices[iii]["subscription"].title_en == "FAMILY") {
            app.family_price = app.new_prices[iii].price;
            app.delivery_price_family = app.new_prices[iii].delivery_price;
          }
        }
        app.delivery_price = app.delivery_price_single;
        app.total_price = Number(app.single_price);
        app.card_price = Number(app.single_price);

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
          if (app.country == app.countries[i]["id"]) {
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
            app.pricing = app.Subscription[i].price;
          }
          if (app.type == 2 && app.Subscription[i].title_en == "FAMILY") {
            app.order.subscription_id = app.Subscription[i].id;
            app.pricing = app.Subscription[i].price;
          }
        }

        app.newLoading = false;
        app.mobileLoading = false;

 

      });


       
    },
    deleteDiscountCode() {
      let app = this;

      app.codeValidationDone = false;
      app.offerTitle = "";
      app.codeValide = false;
      app.codeValidationMessage = "";
      app.order.discount_id = "";
      app.order.discountpersentage = 0;
      app.order.discount_type = "";
      app.order.discount_code = "";
      app.order.offer_id = "";
      app.order.coupon_id = "";
      this.calculateTheTotalPrices();
    },
    checkCodeValidity() {
      let app = this;
      app.codeValidationDone = false;
      app.codeValide = false;

      if (app.paymenttype == 1) {
        if (app.deliverytype == 2) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        } else if (app.deliverytype == 3) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      } else if (app.paymenttype == 2) {
        if (app.deliverytype == 2) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      }

      if (
        app.deliverytype == 1 &&
        app.paymenttype == 2 &&
        (!app.order.recivingbranch_id ||
          app.order.recivingbranch_id == "" ||
          app.order.recivingbranch_id == null)
      ) {
        swal({
          text: this.lang == "ar" ? "يرجي اختيار الفرع" : "Please select a branch",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      }

      if (
        !(
          !app.order.discount_code ||
          app.order.discount_code == "" ||
          app.order.discount_code == null
        ) &&
        app.order.subscription_id > 0 &&
        app.order.recivingbranch_id > 0
      ) {
        axios
          .get(
            `${API_URL}/api/newCouponvalidation?name=${app.order.discount_code}&subscription_id=${app.order.subscription_id}&recivingbranch_id=${app.order.recivingbranch_id}`
          )
          .then((res) => {
            if (res.data.success == true) {
              console.log("new Coupon validation", res.data.data);
              app.codeValidationDone = true;
              app.codeValidationMessage = res.data.data.message;
              app.order.discount_id = res.data.data.id;
              app.order.discountpersentage = res.data.data.discount_percentage;
              app.order.discount_type = res.data.data.type;
              app.codeValide = true;
              app.offerTitle = "";
              if (app.order.discount_type == "offer") {
                app.order.offer_id = res.data.data.id;
                app.offerTitle =
                  this.lang == "ar" ? res.data.data.title : res.data.data.title_en;
              }
              if (app.order.discount_type == "coupon") {
                app.order.coupon_id = res.data.data.id;
              }
            } else {
              console.log("checkCode server error", res.data.error);
              app.codeValidationDone = true;
              app.offerTitle = "";
              app.codeValide = false;
              app.codeValidationMessage = res.data.error;
              app.order.discount_id = "";
              app.order.discountpersentage = 0;
              app.order.discount_type = "";
              app.order.offer_id = "";
              app.order.coupon_id = "";
            }

            //   updateDiscount(res.data.data.id);
            this.calculateTheTotalPrices();
          })
          .catch((err) => {
            console.log("error in server");
            app.codeValidationDone = true;
            app.codeValidationMessage = err.response.data.message;
            app.order.offer_id = "";
            app.order.coupon_id = "";
            app.offerTitle = "";
            app.calculateTheTotalPrices();
          });
      } else {
        app.codeValidationDone = true;
        app.codeValide = false;
        app.codeValidationMessage = "enter coupon";
        app.order.discount_id = "";
        app.order.discountpersentage = 0;
        app.order.discount_type = "";
        app.order.offer_id = "";
        app.order.coupon_id = "";
        app.offerTitle = "";
        app.calculateTheTotalPrices();
      }
    },
    getBranches: function (e) {
      let app = this;

      console.log("recivingbranch_id befor", app.order.recivingbranch_id);
      if (this.country == null) return;

      if (this.country == 8) {
        app.currencies = app.currenciesSR;
      } else {
        app.currencies = app.currenciesBH;
        app.order.recivingbranch_id = "17";
        return;
      }
      axios
        .get(`${API_URL}/api/allBranchesInCountry/${this.country}/branches`)
        .then((res) => {
          app.branch = res.data;
        });
    },

    getRegions: function (e) {
      let app = this;
      app.regions = this.country.zones;
      app.zones = this.country;
      for (let i = 0; i < app.countries.length; i++) {
        if (app.countries[i]["id"] == this.country) {
          app.zones = app.countries[i].cities;
        }
      }
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
    getCities: function (e) {
      let app = this;
      // console.log("app get Cities", app);
      for (let i = 0; i < app.countries.length; i++) {
        if (app.countries[i]["id"] == this.country) {
          app.zones = app.countries[i].cities;
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

    // addCardCheck: function(){
    //   let city_id = e.target.selectedOptions[0].value;
    //   console.log(city_id);
    //   // order.city_id
    //   // this.addCard();
    // },

    addHandi: function (index) {
      let app = this;
      // const a = index;

      // jsObj['key' + i] = 'handica' + index;

      app.order.handigroup.push({
        handica_index: "handica" + index,
      });
      console.log(app.order.handigroup);
    },

    nextStep: function () {
      if (this.country) {
        this.paystep = 2;
      } else {
        console.log("WRONG ACCESS");
      }
    },

    addCard: function () {
      if (this.country) {
        let app = this;

        app.order.subOrders.push({
           order_type:'add',
           memebrcard_id:"",
          membership_id: null,
          fullname: "",
          email: "",
          gender: "",
          nationality: "",
          identity_number: "",
          phone: "",
          notes: "",
          card_type_id: null,
          handicaImage: null,
          subscription_id: 14,
          uploaded: false,
          handica: false,
          media: [],
          errors: {
            name: false,
            phone: false,
            identity_number: false,
            nationality: false,
            birthdate: false,
          },
          errorMsgs: {
            name: false,
            phone: false,
            identity_number: false,
            nationality: false,
            birthdate: false,
          },
        });
        this.error_country_check = false;
      } else {
        this.error_country_check = true;
      }

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

    validateEmail() {
      this.errors.email = false;
      this.errorMsgs.email = "";
      console.log("this.email", this.order.email);
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.order.email)) {
      } else {
        this.errors.email = true;
        this.errorMsgs.email = "إدخل بريد الكتروني صحيح";
        this.errorMsgs.email =
          this.lang == "ar" ? "إدخل بريد الكتروني صحيح" : "please enter valide email";
      }
    },

    validatePhone() {
      this.errors.phone = false;
      this.errorMsgs.phone = "";
      if (this.country == 8) {

if(this.order.phone.charAt(0) == "0"){
 this.order.phone=this.order.phone.substring(1);
}

if (this.order.phone.length != 9 ) {
          this.errors.phone = true;
          this.errorMsgs.phone =
            this.lang == "ar"
              ? "رقم الهاتف يجب ان يكون 9 ارقام "
              : "please insert phone 9 digit";
        }
      }
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

    async getdeliveryPrice() {
      console.log("get delivery Price method");
      let app = this;
      if (this.country == null) return;

      axios.get(`${API_URL}/api/getdeliveryPrice/${this.country}/brices`).then((res) => {
        app.new_prices = res.data;

        for (let iii = 0; iii < app.new_prices.length; iii++) {
          if (app.new_prices[iii]["subscription"].title_en == "SINGLE") {
            app.single_price = app.new_prices[iii].price;
            app.delivery_price_single = app.new_prices[iii].delivery_price;
          }
          if (app.new_prices[iii]["subscription"].title_en == "FAMILY") {
            app.family_price = app.new_prices[iii].price;
            app.delivery_price_family = app.new_prices[iii].delivery_price;
          }
        }

        if (app.type == 1) {
          app.delivery_price = app.delivery_price_single;
        } else if (app.type == 2) {
          app.delivery_price = app.delivery_price_family;
        }
      });
    },

    async arrangeChecks() {
        this.customerValidation();
        this.getStaticOffer();
        this.calculateTheTotalPrices();
        this.orderHandica();                      
      },
    async addSubscribe() {
      let app = this;
      app.newLoading = true;
      app.loading = true;
      app.done = false;
      app.finished = true;
      app.error = [];

      if (await this.ordersErrorsStepTow()) {
        // CODE PIXEL TAG
        fbq("track", "InitiateCheckout");
        snaptr("track", "START_CHECKOUT");
        twq("track", "InitiateCheckout");
        ttq.track("InitiateCheckout");
        gtag("event", "begin_checkout");

        let formdata = new FormData();
        formdata.append("country_id", this.country);
        formdata.append("city_id", app.order.city_id);
        formdata.append("fullname", app.order.fullname);
        formdata.append("order_type", app.order.order_type);
        formdata.append("email", app.order.email);
        formdata.append("media", app.order.media);
        if (app.order.discount_type == "offer" && app.order.discount_id != "") {
          formdata.append("offer_id", app.order.discount_id);
        } else if (app.order.discount_type == "coupon" && app.order.discount_id != "") {
          formdata.append("coupon_id", app.order.discount_id);
        }

        if (this.country == 8) {
          formdata.append("phone", "966" + app.order.phone);
        } else {
          formdata.append("phone", "973" + app.order.phone);
        }

        formdata.append("memebrcard_id", app.order.memebrcard_id);
        formdata.append("membership_id", app.order.membership_id);
        formdata.append("subscription_id", app.order.subscription_id);
        formdata.append("nationality", app.order.nationality);
        formdata.append("identity_number", app.order.identity_number);
        formdata.append("gender", app.order.gender);
        formdata.append("price", app.order.totalPrice);
        formdata.append("payment_type", app.paymenttype);
        formdata.append("delivery_type", app.deliverytype);

        if (app.handica == true) {
          formdata.append("card_type_id", 15);

          if (app.type == 1) {
            if (this.$refs.handicaImage) {
              if (typeof this.$refs.handicaImage.files[0] != "undefined") {
                formdata.append("handicaImage", this.$refs.handicaImage.files[0]);
              } else {
                swal({
                  text:
                    this.lang == "ar"
                      ? "برجاء إرفاق صور التقارير الطبية"
                      : "please insert the medical reports photos",
                  icon: "warning",
                  buttons: false,
                  dangerMode: true,
                });
                app.loading = false;
                app.newLoading = false;
                this.loading = false;
                return false;
              }
            } else {
              swal({
                text:
                  this.lang == "ar"
                    ? "برجاء إرفاق صور التقارير الطبية"
                    : "please insert the medical reports photos",
                icon: "warning",
                buttons: false,
                dangerMode: true,
              });
              app.loading = false;
              app.newLoading = false;
              this.loading = false;
              return false;
            }
          }

          if (app.type == 2) {
            if (this.$refs.handicaImagefamily) {
              if (typeof this.$refs.handicaImagefamily.files[0] != "undefined") {
                formdata.append(
                  "handicaImagefamily",
                  this.$refs.handicaImagefamily.files[0]
                );
              }
            }
          }
        } else {
          formdata.append("card_type_id", 13);
        }

        if (app.paymenttype == 1) {
          if (app.deliverytype == 2) {
            if (this.country == 8) {
              app.order.recivingbranch_id = "40";
            } else {
              app.order.recivingbranch_id = "17";
            }
            formdata.append("recivingbranch_id", app.order.recivingbranch_id);
            formdata.append("customer_detail_address", app.order.customer_detail_address);
            formdata.append("delivery_price", app.delivery_price);
          } else if (app.deliverytype == 3) {
            if (this.country == 8) {
              app.order.recivingbranch_id = "40";
            } else {
              app.order.recivingbranch_id = "17";
            }
            formdata.append("recivingbranch_id", app.order.recivingbranch_id);
          }
        } else if (app.paymenttype == 2) {
          if (app.deliverytype == 2) {
            if (this.country == 8) {
              app.order.recivingbranch_id = "40";
            } else {
              app.order.recivingbranch_id = "17";
            }
            formdata.append("recivingbranch_id", app.order.recivingbranch_id);
            formdata.append("customer_detail_address", app.order.customer_detail_address);
            formdata.append("delivery_price", app.delivery_price);
          } else {
            formdata.append("recivingbranch_id", app.order.recivingbranch_id);
          }
        }

        console.log("add Subscribe to server", formdata);
        if (this.order.subOrders.length > 0 && this.type == 2) {
          formdata.append("subOrders", JSON.stringify(this.order.subOrders));
          for (let i = 0; i < this.order.subOrders.length; i++) {
            if (this.$refs[`imageInput_${i}`] && this.$refs[`imageInput_${i}`][0]) {
              formdata.append(
                "imageInput_" + i,
                this.$refs[`imageInput_${i}`][0].files[0]
              );
            }
          }
        }



if(this.general_o_type == 'add'){


        await axios
          .post(API_URL + `/api/v2/create_order?lang=${this.lang}`, formdata)
          .then(
            function (response) {
              app.finished = true;
              console.log("create order", response);
              console.log("create order", response.data.success);

              if(response.data.success){
                let order_id = response.data.data.id;
                console.log("create order order_id", order_id);


                // CODE PIXEL TAG
                fbq("track", "Purchase", {
                  'client_email': app.order.email, 
                  'currency': app.country == 8 ? "SAR" : "BHD", 
                  'value' : Number(app.order.totalPrice), 
                  'order_id' : order_id
                });
                snaptr("track", "Purchase", {
                  'client_email': app.order.email, 
                  'currency': app.country == 8 ? "SAR" : "BHD", 
                  'value' : Number(app.order.totalPrice), 
                  'order_id' : order_id
                });
                twq("track", "Purchase", {
                  'client_email': app.order.email, 
                  'currency': app.country == 8 ? "SAR" : "BHD", 
                  'value' : Number(app.order.totalPrice), 
                  'order_id' : order_id
                });
                ttq.track("Purchase", {
                  'client_email': app.order.email, 
                  'currency': app.country == 8 ? "SAR" : "BHD", 
                  'value' : Number(app.order.totalPrice), 
                  'order_id' : order_id
                });
                gtag("event", "Purchase", {
                  'client_email': app.order.email, 
                  'currency': app.country == 8 ? "SAR" : "BHD", 
                  'value' : Number(app.order.totalPrice), 
                  'order_id' : order_id
                });


              }

              
              


              

              
              
              
              // assign the first order id to be set as the parent id for the
              // next orders.
              // if (i == 0) app.order.id = response.data.data.id;
              let oid = response.data.data.id;
              app.addOrderInvoice(oid);
              if (app.paymenttype == 1) {
                if (response.data.data.id && oid && oid > 0) {
                  app.paymentOnline(oid);
                } else {
                  console.log("error in order id");
                }
              } else {
                app.newLoading = false;
                app.loading = false;
                app.done = true;

                // CODE PIXEL TAG
                // fbq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : oid});
                // snaptr('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : oid});
                // twq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : oid});
                // ttq.track( 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : oid});
                // gtag('event',  'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : oid});
              }
            },
            function (error) {
              app.finished = false;
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
              app.newLoading = false;
            }
          );
      }else{
        formdata.append("general_o_membership_id", app.general_o_membership_id);
        
          await axios
          .post(API_URL + `/api/v2/create_renew_order?lang=${this.lang}`, formdata)
          .then(
            function (response) {
              app.finished = true;
              console.log("nenew create order", response);
        
              let oid = response.data.data.id;
             

              app.addOrderInvoice(oid,"renew");
              if (app.paymenttype == 1) {
                if (response.data.data.id && oid && oid > 0) {
                  app.paymentOnline(oid,"renew");
                } else {
                  console.log("error in order id");
                }
              } else {
                app.newLoading = false;
                app.loading = false;
                app.done = true;
               }
            },
            function (error) {
              app.finished = false;
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
              app.newLoading = false;
            }
          );
      }

      }


    },

    async customerValidation() {
      let app = this;

app.errorMsgs = {
              name: false,
              phone: false,
              email: false,
              identity_number: false,
              nationality: false,
              birthdate: false,
              card_type: false,
              company_name: false,
              evidences: false,
            };
            app.errors = {
              name: false,
              phone: false,
              email: false,
              identity_number: false,
              nationality: false,
              birthdate: false,
              card_type: false,
              company_name: false,
              evidences: false,
            };

      let formdata = new FormData();
      formdata.append("country_id", this.country);

      formdata.append("fullname", app.order.fullname);
      formdata.append("email", app.order.email);
      if (this.country == 8) {
        formdata.append("phone", "966" + app.order.phone);
      } else {
        formdata.append("phone", "973" + app.order.phone);
      }
      formdata.append("nationality", app.order.nationality);
      formdata.append("identity_number", app.order.identity_number);
      formdata.append("gender", app.order.gender);

      await axios
        .post(API_URL + `/api/v2/customerValidation?lang=${this.lang}`, formdata)
        .then(
          function (response) {
            // console.log("customer Validation res", response);
            app.paystep = 2;
            app.errorMsgs = {
              name: false,
              phone: false,
              email: false,
              identity_number: false,
              nationality: false,
              birthdate: false,
              card_type: false,
              company_name: false,
              evidences: false,
            };
            app.errors = {
              name: false,
              phone: false,
              email: false,
              identity_number: false,
              nationality: false,
              birthdate: false,
              card_type: false,
              company_name: false,
              evidences: false,
            };
          },
          function (error) {
            let errr = error.response.data.error;
            if (errr.gender) {
              app.errors.gender = true;
              app.errorMsgs.gender =
                app.lang == "ar" ? errr.gender[0] : "Please Select Your Gender";
            }
            if (errr.nationality) {
              app.errors.nationality = true;
              app.errorMsgs.nationality =
                app.lang == "ar" ? errr.nationality[0] : "Please Select Your Nationality";
            }
            if (errr.phone) {
              app.errors.phone = true;
              app.errorMsgs.phone =
                app.lang == "ar" ? errr.phone[0] : "please insert phone 9 digit";
            }
            if (errr.identity_number) {
              app.errors.identity_number = true;
              app.errorMsgs.identity_number =
                app.lang == "ar"
                  ? errr.identity_number[0]
                  : "Please Enter Your Identity Number";
            }



if((app.errors.gender ==true || app.errors.nationality == true )){
 app.paystep = 1;
  let errorMsg = "Please insert all your information";
            if (app.lang == "ar") {
              errorMsg = "من فضلك قم بإدخال كافة البيانات";
            }
            app.error = [];

            // if (error.response.data.error) {
            //     for (const err in error.response.data.error) {
            //         app.error.push(error.response.data.error[err]);
            //     }
            // }
            app.error.push(errorMsg);
}else{
      if((app.errors.identity_number ==true ) && (app.general_o_type=="renew")){
            app.paystep = 2;
        }else{
            app.paystep = 1;
             let errorMsg = "Please insert all your information";
            if (app.lang == "ar") {
              errorMsg = "من فضلك قم بإدخال كافة البيانات";
            }
            app.error = [];

            // if (error.response.data.error) {
            //     for (const err in error.response.data.error) {
            //         app.error.push(error.response.data.error[err]);
            //     }
            // }
            app.error.push(errorMsg);
        }
}
           
          }
        );
    },
    async getStaticOffer() {
      let app = this;

    
    if (app.paymenttype == 1) {
       if (app.deliverytype == 3) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      } else if (app.paymenttype == 2) {
        if (app.deliverytype == 2) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      }
      console.log("get Static Offer recivingbranch_id",app.order.recivingbranch_id)



      let formdata = new FormData();
      formdata.append("country_id", this.country);
      formdata.append("subscription_id", app.order.subscription_id);
      formdata.append("recivingbranch_id", app.order.recivingbranch_id);
      formdata.append("general_o_type", app.general_o_type);
      
      await axios
        .post(API_URL + `/api/v2/getStaticOffer?lang=${this.lang}`, formdata)
        .then(
          function (response) {
            console.log("get Static Offer ", response);
            app.order.discount_code
   if (response.data.success == true) {
             
              app.codeValidationDone = true;
              app.codeValidationMessage = response.data.data.message;
              app.order.discount_id = response.data.data.id;
              app.order.discount_code= response.data.data.discount_code;
              app.order.discountpersentage = response.data.data.discount_percentage;
              app.order.discount_type = response.data.data.type;
              app.codeValide = true;
              app.offerTitle = "";
              if (app.order.discount_type == "offer") {
                app.order.offer_id = response.data.data.id;
                app.offerTitle =
                  app.lang == "ar" ? response.data.data.title : response.data.data.title_en;
              }
             
                app.calculateTheTotalPrices();
            }else{
                app.codeValidationDone = false;
                      app.offerTitle = "";
                      app.codeValide = false;
                      app.codeValidationMessage = "";
                      app.order.discount_id = "";
                      app.order.discountpersentage = 0;
                      app.order.discount_type = "";
                      app.order.discount_code = "";
                      app.order.offer_id = "";
                      app.order.coupon_id = "";
                      app.calculateTheTotalPrices();
            }
          }
        ).catch((err) => {
            console.log("error in server");
            app.codeValidationDone = true;
            app.codeValidationMessage = err.response.data.message;
            app.order.offer_id = "";
            app.order.coupon_id = "";
            app.offerTitle = "";
            app.calculateTheTotalPrices();
          });
    },

    async getGeneralAllStaticOffer() {
      let app = this;

    
    if (app.paymenttype == 1) {
       if (app.deliverytype == 3) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      } else if (app.paymenttype == 2) {
        if (app.deliverytype == 2) {
          if (this.country == 8) {
            app.order.recivingbranch_id = "40";
          } else {
            app.order.recivingbranch_id = "17";
          }
        }
      }
     

      let formdata = new FormData();
      formdata.append("country_id", this.country);
      formdata.append("subscription_id", app.order.subscription_id);
      formdata.append("recivingbranch_id", app.order.recivingbranch_id);
     
      
      await axios
        .post(API_URL + `/api/v2/getGeneralAllStaticOffer?lang=${this.lang}`, formdata)
        .then(
          function (response) {
            console.log("get Static Offer ", response);
            app.order.discount_code
   if (response.data.success == true) {

 app.generalstaticoffersingle= response.data.data.discount_percentage_single  ;
 app.generalstaticofferfamily= response.data.data.discount_percentage_family  ;
    
              app.codeValidationDone = true;
              app.codeValidationMessage = response.data.data.message;
              app.order.discount_id = response.data.data.id;
              app.order.discount_code= response.data.data.discount_code;
              app.order.discountpersentage = response.data.data.discount_percentage;
              app.order.discount_type = response.data.data.type;
              app.codeValide = true;
              app.offerTitle = "";
              if (app.order.discount_type == "offer") {
                app.order.offer_id = response.data.data.id;
                app.offerTitle =
                  app.lang == "ar" ? response.data.data.title : response.data.data.title_en;
              }
                app.calculateTheTotalPrices();
            }else{
               app.generalstaticoffersingle= 0
 app.generalstaticofferfamily= 0
  
                      app.codeValidationDone = false;
                      app.offerTitle = "";
                      app.codeValide = false;
                      app.codeValidationMessage = "";
                      app.order.discount_id = "";
                      app.order.discountpersentage = 0;
                      app.order.discount_type = "";
                      app.order.discount_code = "";
                      app.order.offer_id = "";
                      app.order.coupon_id = "";
                      app.calculateTheTotalPrices();
            }
          }
        ).catch((err) => {
           app.generalstaticoffersingle= 0
 app.generalstaticofferfamily= 0
  
            console.log("error in server");
            app.codeValidationDone = true;
            app.codeValidationMessage = err.response.data.message;
            app.order.offer_id = "";
            app.order.coupon_id = "";
            app.offerTitle = "";
            app.calculateTheTotalPrices();
          });
    },

    async paymentOnline(order_id,general_o_type='add') {
      let app = this;
      await axios
        .post(API_URL + `/api/v2/getPaymentTransActionURL`, {
          amount: Number(app.order.totalPrice),
          country: app.country == 8 ? "SA" : "BH",
          currency: app.country == 8 ? "SAR" : "BHD",
          order_id: order_id,
          general_o_type: general_o_type,
        
        })
        .then((response) => {
          if (response.data.data.targetUrl && response.data.data.payid) {
            app.savePaymentOnlineID(
              order_id,
              response.data.data.payid,
              response.data.hash,
              general_o_type
            );
            app.newLoading = false;
            let link =
              response.data.data.targetUrl + "?paymentid=" + response.data.data.payid;
            window.open(link, "_self");
          }
        })
        .catch((error) => {
          console.log("error get Payment Trans Action URL", error);
        });
    },
    async addOrderInvoice(order_id,general_o_type='add') {
      let app = this;
      let dp = "";

      if (app.deliverytype == 2) {
        dp = app.delivery_price;
      }
      let oobj = {
        order_id: order_id,
        price_before: app.order.beforeOffer > 0 ? Number(app.order.beforeOffer) : 0,
        after_price: app.order.pricing,
        tax_price: app.order.tax,
        delivery_price: dp,
        total_price: app.order.totalPrice,
        email: app.order.email,
        general_o_type: general_o_type
      };

      await axios
        .post(API_URL + `/api/v2/addOrderInvoice`, oobj)
        .then((response) => {
          console.log("success add Order Invoice", resopnse.data);
        })
        .catch((error) => {
          console.log("error add Order Invoice", error);
        });
    },

    async savePaymentOnlineID(order_id, payid, hash,general_o_type='add') {
      let app = this;
      await axios
        .post(API_URL + `/api/v2/savePaymentOnlineID`, {
          order_id: order_id,
          payid: payid,
          payHash: hash,
          general_o_type: general_o_type
        })
        .then((response) => {
          console.log("success save Payment Online ID", response.data);
        })
        .catch((error) => {
          console.log("error save Payment OnlineID", error);
        });
    },
    async goToPolices() {
      let link = "/polices";
      window.open(link, "_blank");
    },

    async ordersErrorsStepOne() {
      let app = this;
      this.error = [];

      if (app.type == 2) {
        if (app.order.subOrders.length < 1) {
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
          return false;
        } else {
          let familypayedcards = 0;
          if (app.handica == false) {
            familypayedcards = familypayedcards + 1;
          }
          for (let i = 0; i < app.order.subOrders.length; i++) {
            let nobjgg = app.order.subOrders[i];
            if (nobjgg.handica != true) {
              familypayedcards = familypayedcards + 1;
            }
          }
          if (familypayedcards < 2) {
            swal({
              text:
                this.lang == "ar"
                  ? "الحد الأدنى للبطاقات العائلية المدفوعة 2"
                  : "the minimum cards you can order is 2 paid",
              icon: "warning",
              buttons: false,
              dangerMode: true,
            });
            this.loading = false;
            return false;
          }
        }

        for (let i = 0; i < app.order.subOrders.length; i++) {
          let nobj = app.order.subOrders[i];
          app.order.subOrders[i].errors = {
            name: false,
            phone: false,
            identity_number: false,
            nationality: false,
            birthdate: false,
          };
          app.order.subOrders[i].errorMsgs = {
            name: false,
            phone: false,
            identity_number: false,
            nationality: false,
            birthdate: false,
          };
          if(nobj.phone.charAt(0) == "0"){
                 nobj.phone=nobj.phone.substring(1);
            }
          if (
            !nobj.fullname ||
            nobj.fullname == "" ||
            !nobj.phone ||
            nobj.phone == "" ||
            !nobj.identity_number ||
            nobj.identity_number == "" ||
            !nobj.nationality ||
            nobj.nationality == "" ||
            !nobj.gender ||
            nobj.gender == ""
          ) {
            if (!nobj.fullname || nobj.fullname == "") {
              app.order.subOrders[i].errors.name = true;
              app.order.subOrders[i].errorMsgs.name =
                app.lang == "ar" ? "الاسم مطلوب" : "Please Enter Your Name";
            }
            if (!nobj.gender || nobj.gender == "") {
              app.order.subOrders[i].errors.gender = true;
              app.order.subOrders[i].errorMsgs.gender =
                app.lang == "ar" ? "معرفة الجنس مطلوبة" : "Please Select Your Gender";
            }
            if (!nobj.nationality || nobj.nationality == "") {
              app.order.subOrders[i].errors.nationality = true;
              app.order.subOrders[i].errorMsgs.nationality =
                app.lang == "ar"
                  ? "معرفة الجنسية مطلوبة"
                  : "Please Select Your Nationality";
            }
           
            if (!nobj.phone || nobj.phone == "") {
              app.order.subOrders[i].errors.phone = true;
              app.order.subOrders[i].errorMsgs.phone =
                app.lang == "ar" ? "رقم الهاتف مطلوب" : "please insert phone ";
            }

            if (!nobj.identity_number || nobj.identity_number == "") {
              app.order.subOrders[i].errors.identity_number = true;
              app.order.subOrders[i].errorMsgs.identity_number =
                app.lang == "ar"
                  ? "رقم الهوية مطلوب"
                  : "Please Enter Your Identity Number";
            }

            let errorMsg = "Please insert all your information";
            if (this.lang == "ar") {
              errorMsg = "من فضلك قم بإدخال كافة البيانات";
            }
            this.error.push(errorMsg);
            return false;
          }

          if (nobj.handica == true && nobj.uploaded != true) {
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
            return false;
          }
        }
      }

      if (app.handica == true && app.handicauploaded != true) {
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
        return false;
      }

      app.error = [];
 if( this.order.phone.charAt(0) == "0"){
                  this.order.phone= this.order.phone.substring(1);
            }
      if (
        !(this.order.city_id > 0) ||
        !(this.country > 0) ||
        !this.order.fullname ||
        this.order.fullname == "" ||
        !this.order.email ||
        this.order.email == "" ||
        !this.order.phone ||
        this.order.phone == "" ||
        !this.order.identity_number ||
        this.order.identity_number == "" ||
        !this.order.nationality ||
        this.order.nationality == "" ||
        !this.order.gender ||
        this.order.gender == "" 
      ) {
        if (!this.order.email || this.order.email == "") {
          app.errors.email = true;
          app.errorMsgs.email =
            app.lang == "ar"
              ? "البريد الالكتروني مطلوب"
              : "Please Enter Your Email Address";
        }
        if (!this.order.fullname || this.order.fullname == "") {
          app.errors.name = true;
          app.errorMsgs.name =
            app.lang == "ar" ? "الاسم مطلوب" : "Please Enter Your Name";
        }
        if (!this.order.gender || this.order.gender == "") {
          app.errors.gender = true;
          app.errorMsgs.gender =
            app.lang == "ar" ? "معرفة الجنس مطلوبة" : "Please Select Your Gender";
        }
        if (!this.order.nationality || this.order.nationality == "") {
          app.errors.nationality = true;
          app.errorMsgs.nationality =
            app.lang == "ar" ? "معرفة الجنسية مطلوبة" : "Please Select Your Nationality";
        }
        if (!this.order.phone || this.order.phone == "") {
          app.errors.phone = true;
          app.errorMsgs.phone =
            app.lang == "ar" ? "رقم الهاتف مطلوب" : "please insert phone 9 digit";
        }

       
        
        if (!this.order.identity_number || this.order.identity_number == "") {
          app.errors.identity_number = true;
          app.errorMsgs.identity_number =
            app.lang == "ar" ? "رقم الهوية مطلوب" : "Please Enter Your Identity Number";
        }

        let errorMsg = "Please insert all your information";
        if (this.lang == "ar") {
          errorMsg = "من فضلك قم بإدخال كافة البيانات";
        }
        this.error.push(errorMsg);
        return false;
      }

      if (Array.isArray(this.error) && this.error.length > 0) {
        console.log("false");

        return false;
      } else {
        console.log("THIS IS THE EMAIL OBJECT", app.order.email);
        
        // CODE PIXEL TAG
        fbq("track", "AddToCart", {
          card_type: app.type == 1 ? "Single" : "Family",
          Handicap_Check: app.handica == false ? "Not Handicap" : "Handicap",
        });
        snaptr("track", "ADD_CART", {
          card_type: app.type == 1 ? "Single" : "Family",
          Handicap_Check: app.handica == false ? "Not Handicap" : "Handicap",
        });
        twq("track", "AddToCart", {
          card_type: app.type == 1 ? "Single" : "Family",
          Handicap_Check: app.handica == false ? "Not Handicap" : "Handicap",
        });
        ttq.track("AddToCart", {
          card_type: app.type == 1 ? "Single" : "Family",
          Handicap_Check: app.handica == false ? "Not Handicap" : "Handicap",
        });
        gtag("event", "add_to_cart", {
          'card_type': app.type == 1 ? "Single" : "Family",
          'Handicap_Check': app.handica == false ? "Not Handicap" : "Handicap",
        });

        // app.paystep = 2;
        console.log("orders No Errors Step One true");
       
        return true;
      }
    }, 
    
    async goToNext() {
      let app = this;
   if (await this.ordersErrorsStepOne()) {

      window.scrollTo(0,0);
      window.scrollTo(0,0);
      window.scrollTo(0,0);

            app.order.memebrcard_id="";
            app.order.membership_id=null;
            app.order.order_type='add';
            app.general_o_type='add';
        let formdata = new FormData();
            formdata.append("identity_number", app.order.identity_number);

          if(app.type == 1){
           formdata.append("type", "single");
            await axios
                      .post(API_URL + `/api/v2/checkCardAddOrRenew`, formdata)
                      .then(
                        function (response) {
                          if (response.data.success == true) {

                          let oobbjjcard=response.data.data;

                    if (response.data.can_renew == true) {
                          let ttext=app.lang == "ar"?"رقم البطاقة :"+oobbjjcard.id :"Card Number :"+oobbjjcard.id ;
                              ttext+="\n";
                            
                              ttext+=app.lang == "ar"?" سوف يتم تجديد هذه البطاقة ":"to Renew Press Ok"
                                swal({ 
                                      title:app.lang == "ar"? "هذة البطاقة موجودة من قبل ": "this Card Exist",
                                      text:` ` +ttext + ` ` ,
                                      icon: 'warning',
                                      buttons: [app.lang == "ar"?"إلغاء":"Cancel",app.lang == "ar"? " تجديد " :" Renew "],
                                    }).then((result) => {
                                      console.log("result",result)
                                      if (result == true ) {
                                        console.log("result 22222",result);
                                          app.order.memebrcard_id=oobbjjcard.id;
                                          app.order.membership_id=oobbjjcard.membership_id;
                                          app.order.order_type="renew";
                                          app.general_o_type='renew';
                                          app.arrangeChecks();
                                      }
                                    });
                      }else{
                         let ttext=app.lang == "ar"?"رقم البطاقة :"+oobbjjcard.id :"Card Number :"+oobbjjcard.id ;
                              ttext+="\n";
                            
                              
                              ttext+=app.lang == "ar"?" تاريخ التجديد القادم " + oobbjjcard.end_date:"next date to renew Renew" +oobbjjcard.end_date
                                swal({
                                      title:app.lang == "ar"? "هذة البطاقة سارية ولا يمكن تجديدها   ": "this Card Exist",
                                      text:` ` +ttext + ` ` ,
                                      icon: 'warning',
                                      buttons: [app.lang == "ar"?"إلغاء":"Cancel",app.lang == "ar"? "." :"."],
                                    }).then((result) => {
                                      console.log("result",result)
                                      if (result == true ) {
                                      }
                                    });
                      }


                            }else{
                              app.arrangeChecks();
                            }
             
            },
            function (error) {
              console.log("check Card Add Or Renew error", error);
            }
          );
    }else{
      console.log("orders type family");
      formdata.append("type", "family");
      if (this.order.subOrders.length > 0 ) {
          formdata.append("subOrders", JSON.stringify(this.order.subOrders));
        }
                              
            for (let i = 0; i < app.order.subOrders.length; i++) {
                app.order.subOrders[i].memebrcard_id ="";
                app.order.subOrders[i].membership_id = null;
                app.order.subOrders[i].order_type='add';
               
            }


            await axios
                .post(API_URL + `/api/v2/checkCardAddOrRenew`, formdata)
                .then(
                  function (response) {
                    if (response.data.success == true) {

 if (response.data.can_renew == true) {
                              let body=
                              `<table class="table" style="width:100%;direction: ${app.lang == 'ar'?'rtl':'ltr'}">
                                <thead>
                                  <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">${app.lang == "ar"?"رقم البطاقة":"Card Number "}</th>
                                 
                                  </tr>
                                </thead>
                                <tbody>`;
                                
                      let objectCard=response.data.data;
                      let counnter=0;
                        if(response.data.parent_exist == true ){
                                        let objcard=objectCard[0];
                                        if(objectCard[0]){
                                          counnter++;
                                          body+=` <tr>
                                                <th scope="row">${counnter}</th>
                                                <th scope="row">${objcard.id }</th>
                                              </tr>`;
                                        }
                                      }
                                                          
                                    for (let i = 0; i < app.order.subOrders.length; i++) {
                                              objectCard.find((inputobjec) => {
                                                if (inputobjec.identity_number === app.order.subOrders[i].identity_number) {
                                                counnter++;
                                              body+=` <tr>
                                                <th scope="row">${counnter}</th>
                                                <th scope="row">${inputobjec.id }</th>
                                               
                                              </tr>`;
                                                    return true; // stop searching
                                                }
                                            });
                                    }
                                      body+=` </tbody>
                                      </table>
                                      <b>${app.lang == "ar"?" سوف يتم تجديد هذه البطاقة ":"to Renew Press Renew"}</b>
                                      `;

                                var span = document.createElement("span");
                                span.innerHTML =body;
                                  swal({ 
                                      title:app.lang == "ar"? "هذة البطاقات موجودة من قبل ": "this Card Exist",
                                      content: span,
                                      icon: 'warning',
                                      className: 'swal-customClass',
                                      buttons: [app.lang == "ar"?"إلغاء":"Cancel",app.lang == "ar"? " تجديد " :" Renew "],
                                    }).then((result) => {
                                      console.log("result tttttttttttttt",result)
                                      if (result == true ) {

                                            let objectCard=response.data.data;
                                            if(response.data.parent_exist == true ){
                                              let objcard=objectCard[0];
                                              if(objcard){
                                                  app.order.memebrcard_id=objcard.id;
                                                  app.order.membership_id=objcard.membership_id;
                                                  app.order.order_type="renew";
                                                  app.general_o_type="renew";
                                              }
                                            }
                                            if(objectCard[0]){
                                               app.general_o_membership_id=objectCard[0].membership_id;
                                            }
                                                                
                                          for (let i = 0; i < app.order.subOrders.length; i++) {
                                                  objectCard.find((inputobjec) => {
                                                      if (inputobjec.identity_number === app.order.subOrders[i].identity_number) {
                                                          app.order.subOrders[i].memebrcard_id = inputobjec.id;
                                                          app.order.subOrders[i].membership_id = inputobjec.membership_id;
                                                          app.order.subOrders[i].order_type="renew";
                                                          app.general_o_type="renew";

                                                          return true; // stop searching
                                                      }
                                                  });
                                          }
                                        
                                          app.arrangeChecks();
                                      }
                                    })
                    }else{
                            let oobbjjcard=response.data.data;
                            let ttext=app.lang == "ar"?"رقم البطاقة :"+oobbjjcard.id :"Card Number :"+oobbjjcard.id ;
                              ttext+="\n";
                              
                              ttext+=app.lang == "ar"?" تاريخ التجديد القادم " + oobbjjcard.end_date:"next date to renew Renew" +oobbjjcard.end_date
                                swal({
                                      title:app.lang == "ar"? "هذة البطاقة سارية ولا يمكن تجديدها   ": "this Card Exist",
                                      text:` ` +ttext + ` ` ,
                                      icon: 'warning',
                                      buttons: [app.lang == "ar"?"إلغاء":"Cancel",app.lang == "ar"? "." :"."],
                                    }).then((result) => {
                                      console.log("result",result)
                                      if (result == true ) {
                                      }
                                    });


                    }   
                 }else{
                     app.arrangeChecks();
                 }
                    }),
            function (error) {
              console.log("check Card Add Or Renew error", error);
            };
     }
     }
     },
    
    async ordersErrorsStepTow() {
      let app = this;
      this.error = [];

      if (this.country != 8) {
        app.order.recivingbranch_id = "17";
      }

      if (
        app.deliverytype == 1 &&
        app.paymenttype == 2 &&
        (!app.order.recivingbranch_id ||
          app.order.recivingbranch_id == "" ||
          app.order.recivingbranch_id == null)
      ) {
        swal({
          text: this.lang == "ar" ? "يرجي اختيار الفرع" : "Please select a branch",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      }

      if (
        app.deliverytype == 1 &&
        app.paymenttype == 1 &&
        (!app.order.recivingbranch_id ||
          app.order.recivingbranch_id == "" ||
          app.order.recivingbranch_id == null)
      ) {
        swal({
          text: this.lang == "ar" ? "يرجي اختيار الفرع" : "Please select a branch",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      } else if (
        app.deliverytype == 2 &&
        app.paymenttype == 1 &&
        (!app.order.customer_detail_address ||
          app.order.customer_detail_address == "" ||
          app.order.customer_detail_address == null)
      ) {
        swal({
          text: this.lang == "ar" ? "يرجي ادخال العنوان" : "Please  Enter Full Address",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      } else if (
        app.deliverytype == 2 &&
        app.paymenttype == 2 &&
        (!app.order.customer_detail_address ||
          app.order.customer_detail_address == "" ||
          app.order.customer_detail_address == null)
      ) {
        swal({
          text: this.lang == "ar" ? "يرجي ادخال العنوان" : "Please  Enter Full Address",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      }

      if (!app.terms_conditions || app.terms_conditions == false) {
        swal({
          text:
            this.lang == "ar"
              ? "يرجي الموافقة علي الشروط والاحكام"
              : "Please Agree to terms and conditions",
          icon: "warning",
          buttons: false,
          dangerMode: true,
        });
        this.loading = false;
        this.newLoading = false;
        this.finished = false;
        return false;
      }
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

/* The switch - the box around the slider */
.switch {
  padding: 0 4.5em;
  color: #888;
  font-weight: 900;
  position: relative;
  display: inline-block;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  display: block;
}

/* The slider */
.slider {
  position: absolute;
  width: 60px;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: rgb(29, 172, 100);
}

input:focus + .slider {
  box-shadow: 0 0 1px rgb(29, 172, 100);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.swal-button {
  .swal-button--confirm {
    background: #18b4bb;

    &:active {
      background: #235845;
    }
  }
}

.formTotals {
  margin: 20px 0;

  .fTRow {
    color: #707070;
    width: 100%;
    display: block;
    height: 40px;
    line-height: 40px;

    label {
      display: block;
      float: right;
      width: calc(45% - 10px);
      padding-left: 10px;
      text-align: left;
      font-size: 110%;
    }

    span {
      display: block;
      float: right;
      width: 55%;
      font-size: 90%;

      b {
        font-size: 120%;
        font-weight: 700;
        margin-left: 10px;
      }
    }

    &.first {
      background: #f4f4f4 !important;
    }

    &.second {
      background: #eaeaea !important;
    }

    &.third {
      background: #60a58c !important;
      color: #fff;
    }
  }
}

.formError {
  display: block;
  opacity: 0;
  width: 100%;
  transition: 0.5s;

  // height: 0px;
  // overflow: hidden;
  &.show {
    padding-bottom: 10px;
    opacity: 1;
    height: auto;
    transition: 0.2s;
  }

  ul,
  li {
    list-style-type: none;
  }

  span {
    display: block;
    text-align: center;
    width: 100%;
    padding: 5px 0;
    line-height: 30px;
    font-size: 90%;
    // height: 30px;
    color: #501c1c;
    background: rgba(#ffcccc, 0.5);
  }
}

.formCtrl {
  height: 50px;
  display: block;

  .btnSuccess {
    text-decoration: none;
    color: #fff;
    background: #18b4bb;
    border-radius: 6px;
    padding: 3px 10px;
    transition: 0.3s all;
    cursor: pointer;
    border: 1.5px transparent solid;

    &:hover {
      background: #fff;
      color: #18b4bb;
      border: 1.5px #18b4bb solid;
      font-weight: 700;
    }
  }
}

.formCtrls {
  text-align: center;
  display: inline-block;
  width: 100%;
  margin: 10px 0;

  .btnSuccess {
    display: inline-block;
    margin-top: 1em;
    margin-bottom: 2em;
    text-decoration: none;
    color: #fff;
    background: #18b4bb;
    border-radius: 6px;
    padding: 13px 40px;
    transition: 0.3s all;
    cursor: pointer;
    border: 1.5px transparent solid;

    &:hover {
      background: #fff;
      color: #18b4bb;
      border: 1.5px #18b4bb solid;
      font-weight: 700;
    }
  }
}

.btnDanger {
  background: #a73b3b;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: 0.3s all;

  &.BtnIcon {
    padding: 1px 8px;
    float: left;
  }

  &:hover {
    background: #fff;
    color: #a73b3b;
    border: 1px solid #a73b3b;
  }
}

#Subscribe {
  // ::placeholder {
  //   /* Chrome, Firefox, Opera, Safari 10.1+ */
  //   color: transparent;
  //   opacity: 1; /* Firefox */
  // }

  // :-ms-input-placeholder {
  //   /* Internet Explorer 10-11 */
  //   color: transparent;
  // }

  // ::-ms-input-placeholder {
  //   /* Microsoft Edge */
  //   color: transparent;
  // }
  .page {
    width: 100%;
    min-height: calc(100vh - 165px);
    overflow: hidden;

    .sSubscribe {
      // width: 600px;
      max-width: 80%;
      margin: 0 auto;

      .sHeader {
        text-align: center;

        h2 {
          color: #18b4bb;
          margin-bottom: 0;
        }

        p {
          margin: 0;
          color: #909090;
        }
      }

      .formType {
        padding: 0px 40px;
        // height: 183px;
        // line-height: 63px;
        // vertical-align: middle;
        margin-top: 30px;

        > label {
          // border: 1px solid red;
          color: black;
          font-weight: 700;
          font-size: 125%;
          display: flex;
          width: 145px;
          float: right;
        }

        ul {
          width: calc(100% - 145px);
          float: right;
          margin: 0;
          padding: 0;
          list-style: none;
          height: 83px;

          li {
            float: right;
            margin-left: 20px;
            width: 21%;
            max-width: 80px;
            min-width: 80px;
            text-align: center;
            line-height: 20px;

            input {
              opacity: 0;
              position: absolute;
            }

            label {
              border-radius: 5px;
              color: #707070;
              font-weight: 700;
              border: 1.5px #c7c7c7 solid;
              cursor: pointer;
              transition: 0.3s;
              display: block;
              width: 100%;
              float: right;
              padding: 10px 0;

              svg {
                width: 100%;
                font-size: 220%;
              }
            }

            &:hover {
              label {
                border-color: #18b4bb;
                color: #18b4bb;
              }
            }

            input:checked {
              ~ label {
                background: #18b4bb;
                border-color: #18b4bb;
                color: #fff;
              }
            }
          }
        }
      }

      .sForms {
        padding: 0px;

        .cardTitle {
          color: #18b4bb;
          font-weight: 700;
          font-size: 90%;
          padding: 5px;
        }

        .addSubForm {
          width: 100%;
          display: inline-block;

          .addBtn {
            float: left;
            border-radius: 5px;
            color: #18b4bb;
            font-weight: 700;
            border: 1.5px #18b4bb solid;
            cursor: pointer;
            transition: 0.3s;
            padding: 5px 15px;
            text-decoration: none;
            margin-top: 1.5em;

            svg {
              padding-left: 7px;
            }

            &:hover {
              background: #18b4bb;
              color: #fff;
            }
          }
        }

        .sForm {
          margin-top: 10px;
          // height: 420px;

          transition: 0.3s;
          width: calc(100% -70px);
          box-shadow: 1px 2px 7px 1px rgba(0, 0, 0, 0.25);
          padding: 25px 35px;

          .sFormGroup {
            height: 50px;
            line-height: 50px;
            vertical-align: middle;

            label:nth-child(1) {
              width: 120px;
              display: block;
              float: right;
              text-align: left;
              color: #707070;
              font-weight: 700;
              overflow: hidden;
            }

            label {
              overflow: hidden;
              width: auto;
              display: block;
              float: right;
              text-align: left;
              color: #707070;
              font-weight: 700;
              font-size: small;
            }

            input,
            select,
            textarea {
              float: right;
              padding: 0;
              margin: 7px 10px;
              height: 36px;
              border-radius: 4px;
              background: #e7e7e7;
              outline: none;
              border: none;
              text-indent: 10px;
              font-weight: 700;
              color: #666;
              border-bottom: 2px solid transparent;
              transition: 0.3s all;

              &:focus {
                border-bottom: 2px solid #18b4bb;
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
              }
            }

            textarea {
              height: 100px;
            }

            &.groupFull {
              input,
              select,
              textarea {
                width: calc(100% - 140px);
              }
            }

            &.groupMulti {
              input:nth-child(2),
              select:nth-child(2) {
                width: calc(50% - 140px);
              }

              input:nth-child(4),
              select:nth-child(4) {
                width: calc(50% - 100px);
              }

              label:nth-child(3) {
                width: 80px;
                text-align: center;
              }
            }
          }

          .sFormTotal {
            background: #18b4bb;
            position: absolute;
            width: 580px;
            right: 0;

            margin-right: 10px;
            padding: 5px 0;
            text-align: center;
            color: #fff;

            label {
              font-size: 110%;
              margin-left: 60px;
            }

            b {
              font-size: 120%;
            }

            span {
              margin-right: 10px;
              font-size: 90%;
            }
          }
        }

        .formTotals {
          margin: 20px 0;

          .fTRow {
            color: #707070;
            width: 100%;
            display: block;
            height: 40px;
            line-height: 40px;

            label {
              display: block;
              float: right;
              width: calc(45% - 10px);
              padding-left: 10px;
              text-align: left;
              font-size: 110%;
            }

            span {
              display: block;
              float: right;
              width: 55%;
              font-size: 90%;

              b {
                font-size: 120%;
                font-weight: 700;
                margin-left: 10px;
              }
            }

            &.first {
              background: #f4f4f4 !important;
            }

            &.second {
              background: #eaeaea !important;
            }

            &.third {
              background: #18b4bb !important;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #Subscribe {
    .page {
      min-height: calc(100vh - 120px);
    }
  }
}

@media screen and (max-width: 600px) {
  #Subscribe {
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #bbb;
      opacity: 1;
      /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #bbb;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #bbb;
    }

    .page {
      .sSubscribe {
        .formType {
          margin: 0;
          padding: 10px 30px;
          height: auto;
          width: calc(100% - 60px);
          display: inline-block;
          line-height: auto;

          > label {
            width: 100%;
            text-align: center;
          }

          ul {
            width: 270px;
            margin: 0 auto;
            height: 166px;
            float: none;

            li {
              margin-left: 10px;
            }
          }
        }

        .sForms {
          .sForm {
            width: calc(100% -20px);
            padding: 25px 10px;

            .sFormGroup {
              display: inline-block;
              width: 100%;
              height: auto;

              label {
                text-align: right !important;
                line-height: 1.3;
                margin: 0.5em 1.1em 0.2em 0;
              }

              input,
              select {
                width: calc(100% - 20px);
              }

              &.groupFull {
                input,
                select,
                textarea {
                  width: calc(100% - 20px);
                }
              }

              &.groupMulti {
                input:nth-child(2),
                select:nth-child(2) {
                  width: calc(100% - 20px);
                }

                input:nth-child(4),
                select:nth-child(4) {
                  width: calc(100% - 20px);
                }

                label:nth-child(3) {
                  width: calc(100% - 20px);
                }
              }
            }

            .sFormTotal {
              width: calc(100% - 20px);

              label {
                margin-left: 30px;
              }

              span {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}

.swal-modal .swal-text {
  text-align: center;
}

.image-preview-success {
  position: absolute;
  background-color: #eee;
  color: #18b4bb;
  padding: 0.3em 1em;
  line-height: 1.1;
  left: 1em;
  top: auto;
  bottom: 7px;
  border: 1px solid #ccc;
}

@media screen and (max-width: 768px) {
  .image-preview-success {
    top: 2.2em;
    bottom: auto;
  }
}

$primary-color: #18b4bb;
$small-size: 500px;

.cursor-pointer {
  cursor: pointer;
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

.progress-bar {
  margin: 30px auto 0;
  width: 50%;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media only screen and (max-width: $small-size) {
    width: 100%;
  }

  .progress-line-block {
    width: 100%;
    position: absolute;
    top: 15px;

    display: flex;
    justify-content: center;

    .progress-line {
      width: 88%;
      height: 1px;
      background: rgba(#000, 0.4);

      @media only screen and (max-width: 995px) {
        width: 75%;
      }
    }
  }

  .step-block {
    z-index: 1;

    .step-progress {
      margin: auto;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      border: 3px solid #92d8db;
      color: #92d8db;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
    }

    .step-text {
      font-weight: 800;
      color: rgba(#000, 0.5);
      // font-size: 14px;
    }

    .active-step-text {
      color: rgba(#000, 1);
    }

    .active-step {
      background-color: #18b4bb;
      color: white;
    }
  }
}

.main-box {
  width: 100%;

  .input-buttons {
    visibility: hidden;
  }

  .category-select {
    width: 100%;
    margin: 15px 0 0 0;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: $small-size) {
      flex-wrap: wrap;

      .margin-category-mobile {
        margin: 0 0 20px 0;
      }
    }

    .category-block {
      background-color: white;
      padding: 10px;
      width: 47%;
      height: auto;
      border-radius: 10px;

      @media only screen and (max-width: $small-size) {
        width: 100%;
        // height: auto;
      }

      // border: 1px solid #a3a4a6;
      .category-block-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid rgba(#6d6e71, 0.3);

        span {
          font-weight: 600;
        }

        .check-box {
          width: 20px;
          height: 20px;
          border-radius: 10px;
          border: 1px solid gray;
          color: rgba(255, 255, 255, 0);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .check-box-selected {
          color: rgba(255, 255, 255, 1);
          background-color: #18b4bb;
          border: 1px solid #18b4bb;
        }
      }

      .category-block-description {
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: $small-size) {
          font-size: 12px;
        }

        .price {
          font-weight: 600;
          text-align: left;
        }
      }
    }

    .active-border {
      border: 1px solid $primary-color;
      background-color: rgba(199, 199, 199, 0.1);
    }

    .notactive-border {
      border: 1px solid rgb(206, 206, 206);
    }
  }
}

.flex-title-multiple {
  display: flex;
  justify-content: space-between;
}

.errorMessage {
  font-size: 12px;
  color: #118c92;
  position: initial;
  text-align: center;
  left: 0px;
  width: 100px;
}

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
    margin-inline-end: 10px;

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

  .remove-card {
    background-color: rgb(226, 0, 11);
    width: 25px;
    height: 25px;
    color: white;
    border-radius: 5px;
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.border-error {
  border: 1px solid red;
}

.swal-customClass{
   width: 730px!important;
}

.error {
  color: red;
}
.deleteCode {
  color: red;
  font-size: 16px;
  cursor: pointer;
}

.personal-info-main {
  width: 80%;
  margin: auto;
  padding: 0 0px;

  @media only screen and(max-width: $small-size) {
    width: 100%;
  }

  .personal-details-block {
    width: 100%;
    border-bottom: 1px solid rgb(218, 218, 218);
    padding: 0 0 20px 0;

    .personal-form-group {
      margin: 20px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;

      @media only screen and (max-width: $small-size) {
        flex-wrap: wrap;
        margin: 0px 0;
      }

      .personal-form-single-block {
        display: flex;
        flex-direction: column;
        width: 30%;

        @media only screen and (max-width: $small-size) {
          width: 100%;
          margin: 20px 0 0 0;
        }
      }

      .personal-form-signle {
        width: 100%;
        height: 50px;
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        display: flex;

        @media only screen and (max-width: $small-size) {
          width: 100%;
        }

        .country-phone-code-block {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          font-weight: 600;
          direction: ltr;
          cursor: default;
        }

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

      .personal-form-wide {
        width: 48%;
        height: 50px;
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        display: flex;
        position: relative;

        @media only screen and (max-width: $small-size) {
          width: 100%;
          margin: 20px 0 0 0;
        }

        .error-country {
          width: 100%;
          position: absolute;
          bottom: -27px;
          right: 0;
          color: red;
          font-weight: 700;
          z-index: 1;
        }

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

    .margin-up-mobile {
      @media only screen and (max-width: $small-size) {
        margin: 20px 0 0 0;
      }
    }

    .check-box-block {
      i {
        color: rgba(#000, 0.5);
      }
    }

    .img-upload-main {
      width: 48%;
      margin: 0px 0 0 0;

      @media only screen and (max-width: $small-size) {
        margin: 20px 0 0 0;
      }

      .img-upload-block {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        border: 1px solid rgba(#000, 0.4);
        border-style: dashed;
        border-radius: 10px;
        font-weight: 600;

        .upload-icon {
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(128, 128, 128, 0.4);
          border-radius: 5px;
          margin: 0 0 0 10px;

          i {
            font-size: 22px;
          }
        }
      }
    }
  }

  .add-card-block {
    width: 100%;
    height: auto;
    border-radius: 5px;
    border: 2px solid rgba($primary-color, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: $primary-color;
    margin: 0 0 20px 0;
   

    .price-add-card {
      font-weight: 600;
      font-size: 20px;
      color: rgb(59, 59, 59);
      margin: 0 5px;
      margin-right: 10px;
    }
    .static_offer1 {
      display: contents;
      width: 50%;
      div span{
         color: #18b4bb;
         display: inline;
      }
      div{
        display: flex;
        div{
            display: flex;
            align-items: center;
          i{ 
            font-weight: 600;
            font-size: 20px;
           }
        }
      }
     span{
           color: #18b4bb;
     }
    }

     .static_offer {
       display: contents;
      width: 50%;
     color: red;
    }

 
   span i {
      font-size: 32px;
    }

    span {
      font-weight: 600;
      font-size: 20px;
      display: flex;
     align-items: center;
    }
   

   @media only screen and (max-width: $small-size) {
        display: grid;
            .static_offer1 {
              width: 100%;
            }
            .static_offer {
              width: 100%;
            }
    }

  }
}

.two-buttons-submit {
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
  margin: auto;
}

.bxs-info-circle.polices {
  cursor: pointer;
}

.submit-block {
  margin: auto;
  margin-bottom: 20px;
  width: 80%;
  padding: 0 0px;
  display: flex;

  @media only screen and (max-width: $small-size) {
    width: 100%;
  }

  .submit-button {
    // margin: 20px 0 0 0;
    width: 30%;
    height: 50px;
    background-color: $primary-color;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 800px;
    cursor: pointer;

    @media only screen and (max-width: $small-size) {
      width: 45%;
    }

    span {
      color: white;
      font-weight: 800px;
    }
  }

  .back-button {
    width: 30%;
    height: 50px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $primary-color;

    font-weight: 800px;
    cursor: pointer;

    @media only screen and (max-width: $small-size) {
      width: 45%;
    }

    span {
      color: $primary-color;
      font-weight: 800px;
    }
  }
}

.errorMessageError {
  width: 100%;
  font-size: 11px;
  color: red;
  display: block;
}

.errorMessagePhone {
  font-size: 11px;
  color: red;
  position: relative;
  bottom: -46px;
  left: 55%;
}

.payment-main-block {
  width: 80%;
  margin: auto;

  @media only screen and (max-width: $small-size) {
    width: 100%;
  }

  .check-box-block {
    margin: 20px 0 20px 0;
  }

  .pay-block {
    margin: 0 0 20px 0;
    padding: 0 0 20px 0;
    width: 100%;
    border-bottom: 1px solid rgb(218, 218, 218);

    @media only screen and (max-width: $small-size) {
      margin: 20px 0 10px 0;
    }

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

      @media only screen and(max-width: $small-size) {
        flex-wrap: wrap;
      }

      .personal-form-signle {
        width: 48%;
        height: 50px;
        border-radius: 5px;
        border: 1px solid rgb(231, 231, 231);
        background-color: rgb(248, 248, 248);
        display: flex;

        @media only screen and(max-width: $small-size) {
          width: 100%;
          margin: 20px 0 0 0;
        }

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
          // padding: 0 0 0 10px;
          padding-inline-end: 10px;

          .cod-price {
            color: black;
            font-size: 14px;
            font-weight: 800;
            margin-inline-start: 10px;
          }

          .check-payment {
            width: 20px;
            height: 20px;
            border: 1px solid gray;
            border-radius: 25px;
            color: rgb(248, 248, 248);
            margin-inline-start: 10px;
          }

          .check-payment-active {
            width: 20px;
            height: 20px;
            border: 1px solid $primary-color;
            border-radius: 25px;
            background-color: $primary-color;
            color: rgb(248, 248, 248);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-inline-start: 10px;
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
        position: relative;

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
      border: 1px solid rgb(235, 235, 235);
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
        background-size: 15px 50px;
        width: 100%;
        height: 50px;
        padding-inline-start: 20px;
        // padding: 0 20px 0 0;
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

    .branch-select-en {
      width: 100%;
      height: 50px;
      border: 1px solid rgb(235, 235, 235);
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
        background: url(https://www.svgrepo.com/show/7882/down-arrow.svg) 98% 0 no-repeat;
        background-size: 15px 50px;
        width: 100%;
        height: 50px;
        padding-inline-start: 20px;
        // padding: 0 20px 0 0;
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

    .coupon-block {
      display: flex;
      flex-direction: column;

      .code-check-block {
        // width: 22%;
        // display: flex;
        // justify-content: end;
        // align-items: center;
        font-size: 16px;
        width: 100%;
        // padding: 0 10px;
      }

      .coupon-input {
        width: 100%;
        height: 50px;
        border: 0px solid rgb(235, 235, 235);
        border-radius: 5px;
        background-color: rgb(245, 245, 245);
        margin: 10px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        // padding: 0 20px;
        input {
          width: 80%;
          background-color: rgb(245, 245, 245);
          border-radius: 10px;
          border: 0;
          color: black;
          font-size: 16px;
          padding-inline-start: 20px;

          @media screen and (max-width: 768px) {
            width: 50%;
          }

          &:focus {
            outline: none !important;
          }

          &::placeholder {
            color: black;
            font-size: 16px;
          }
        }

        .coupon-check-button {
          // margin: 0 0 0 20px;
          margin-inline-end: 20px;
          cursor: pointer;
          width: 100px;
          height: 40px;
          border-radius: 5px;
          background-image: linear-gradient(to right, $primary-color, #118c92);
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            color: white;
            font-size: 14px;
            // font-weight: 600;
          }

          margin-top: -5px;
        }
      }
    }

    .order-details-block {
      width: 100%;
      margin: 10px 0 0 0;
      // height: 300px;
      border: 1px solid rgb(218, 218, 218);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .price-item {
        padding: 10px 0;
        width: 95%;
        border-bottom: 1px solid rgb(218, 218, 218);
        display: flex;
        justify-content: space-between;

        .price-item-price {
          font-weight: 700;
        }
      }
    }
  }
}

.select-anchor-ar {
  select {
    background: url(https://www.svgrepo.com/show/7882/down-arrow.svg) 20px 0 no-repeat;
    background-size: 15px 50px;
  }
}

.select-anchor-en {
  select {
    background: url(https://www.svgrepo.com/show/7882/down-arrow.svg) 96% 0 no-repeat;
    background-size: 15px 50px;
  }
}
</style>
