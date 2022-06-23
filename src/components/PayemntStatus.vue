<template>
<div id="Subscribe">
    <div class="page">
        <div class="sSubscribe" :dir="lang == `en` ? `ltr` : `rtl`">
            <!-- HEADER -->
            <div class="sHeader" data-aos="fade-down" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-anchor-placement="top-center" data-aos-offset="-150">
                <h2 v-if="!done">{{ lang == "ar" ? " اطلب البطاقة" : "Order card" }}</h2>
                <p v-if="!done" style="display: flex; justify-content: center">
                    {{
              lang == "ar"
                ? "وﺗﻤﺘﻊ ﺑﺨﺪﻣﺎﺗﻨﺎ اﻟﻔﺮﻳﺪة ﻣﻦ ﺧﻼل وﺛﻴﻘﺘﻚ"
                : "Get benefits of our unique service using our health card"
            }}
                </p>
                <h2 v-if="done && !finishlaststate">
                    {{
              lang == "ar"
                ? "تم  الدفع بنجاح وتم تأكيد الطلب "
                : "paymant done successfully ,The request has been confirmed"
            }}

                </h2>
                <h2 v-if="done && curentinvoice !=null && curentmemberCardID !=null && !finishlaststate">
                    {{
              lang == "ar"
                ? "رقم البطاقة "
                : "card Number " 
            }}
                    {{curentmemberCardID}}
                </h2>
                <h2 v-if="done && curentinvoice !=null && !finishlaststate">
                    {{
              lang == "ar"
                ? "واجمالي قيمة الطلب "
                : "The total Cost "
            }}
                    {{curentinvoice.total_price}}
                    {{ lang == "ar" ? currencies[1] : currencies[0] }}
                </h2>


   <h2 v-if="done&& finishlaststate">
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
               
                <h2 v-if="done && !finishlaststate">
                    سوف يتم ارسال البطاقه الالكترونيه والفاتورة علي الايميل
                </h2>


             

              
                 <div class="form-loading" v-if="done&&!sendCardes&&!sendCardesfail && !finishlaststate" style="text-align: center; margin-top: 5px">
                       <h4>جاري الإرسال</h4>
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                  </div>
                  <div class="sHeadererror" v-if="done&&sendCardesfail && !finishlaststate">
                      <h4> تعذر إرسال  الايميل الرجاء مراجعه الادارة</h4>
                    
                  </div>
                   <div class="sHeader">
                        <h2 v-if="done&&sendCardes && !finishlaststate">
        تم الإرسال بنجاح
                           </h2>
                   </div>
                 <br>
                 <br>
            </div>

            <!-- <div class="v-card__text pa-0 ma-0" id="facture"  v-if="done">
                        <div id="printedArea" class="printArea">
                            <img src="./../assets/print_card.15aa707b.jpeg" alt="" class="background">
                            <div class="data">
                                <div class="top-attr">{{identity_number}}</div>
                                <div>
                                    <span>{{fullname}}<span style="color: transparent">
                                        -

                                        </span>عادل<span style="color: transparent">

                                            -</span>مبرمج</span>

                                            </div>
                                <div>{{nationality}}</div>
                                <div>من {{start_date}} الى {{end_date}}</div>
                            </div>
                            <div class="printed-image">
                                <img id="f501ba2a-b878-4e68-9877-75c0e9944a2f" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAACLlJREFUeF7tXFeIFT0UPmvvbQWxYG9YwV5BxbJreXF9sIAFEUFQEHxxfVGsoKioiILYQEHQBwXRXUXsCvaKvaGIYkPsbX++659DJs4kk83svZact9xkksx3kzOnfEkWERVRGiQvL4927tyZyEiFhYU0ZMgQ7is/P58WLlzI5VGjRtGuXbsSGcvUSZYH0ASRvt4D6IYfBQCsUKECtWjRwrHLn49/+fKFbt68yX3ZbuHr16/T9+/fQ+dy6tQpmjp1auwt3KpVKypXrlwi73X79m369OkT9xUAsH379nT58uVEBnrw4AE1adKk2ADWrl2bXr58GWsuJh14//59aty4cay+TI06dOhAV65c8QCagIqq9wAWF7n/n7MC8M6dO3T8+PHYQ44fP55KlSqVam/awufPn9eqixMnTtC3b99Cx37y5AkdOHAgtg6Ut/CPHz9o69atsd+pT58+1Lx5c25vBeDmzZtp0qRJsQf7/PkzK2sTgHPmzKFFixZF9v3ixQvKzs4Orbe1A2UA8XErX7587HfatGkTTZw40QMoPiIeQCLyK5CI1C08bdo0at26NW+Vu3fvEvQVpFKlSrRkyRKue/ToEe3evZvLXbp0oZ49e3JZdeX+iS1cUFBAgwcPZhBkOxC6EDoxrngAicgDaPBE1C3sVyARuZgxOgDLlClD3bp1i9zBsD9l39hvYWULm3SfjS/815oxuhXoASQiNZxlowP/WABhh0X5o2EvJcfcbF056DnhR6Pvhw8fUq1atUKxO3jwIA0bNqxYvjAewjaOK+q8rHzhuIOEtbMFUO2jpHxhl3fCsx5ARwS1ACL0vX//fschfj7++PFj6tu3L/dl0oF16tShihUrcnu4atWqVUuVsbUbNmzIdba+8LFjx6hBgwaJvFdOTk4gVZGxpJLNR0R15WwBTAS5iE48gI7oegBdAczLy0sLM6FHjx40a9Ysnq5pCyMK/O7du1R7mEfQoUIuXbpE8+fPjzRjli1bRqdPn3aEJt7jWUVFRWkBUJ2OCUC5PdKbiM5EierKxXv1ZFp5AB1x9AC6Apifn89bGLbYjBkzuEukHpNiObVt25bGjh3LfR8+fJhOnjzJZdAloqgcaFS5cmVui3QrsmVC1C28fft2unbtmiM0Px+H7u3UqVNkX1pqh21aUzdjEzcGdDXYd2GSSTtQTWuq8/MAGtapB9BxIxsBLCgoYB2ICMiWLVt4SOgt+H5RMnPmTAINLUygT2UKBWhhe/bsiewLYfhGjRqF1pctW5b69+/PdSZXDnbis2fPuD1C/qKM8NTevXsj5wEffO3atVzfrl07qlevXrQOlO1A0LYQbRACY1ZW1movvXv3DnwI5HowAZCPFYKPEUCKEjUirVs4JgDVZ0GzQ3gNAqMcuZsoWb16deBDalrAATPGA0jkAQxZMiW6ArOzs1kHwg578+ZNsbfw06dPCfoKAgragAEDuC+wDvDvCgGrfsWKFVxG7E88ix9v3brFIf1Xr15Ry5YtuS1Ux8aNG7m8fv16Wr58OZehdkaMGMHl169fM03k69evBL0mpGvXrrRv3z4uqytwzZo1NHr06GgdqGPp2+pAl7ywOkM5pK/6wvgzoDOFgCYH31oIjlPIwQe5bzWt2atXLwIXUYgKoPEr7AF0BFC3hceMGRPYduoqyc3NpTNnzvDPui08fPhwgmcjZMGCBbRy5Uouv337lrC9hMgrUN3C/fr1CxzagSqQD9qYtnDdunV5HNMKVLdwjRo1qHTp0vy89iscufFjVKhmjOkR1ZXTZeVMfan18kdErTMBqLbHKQacZhDiATToQA8gUeq8ijCkM7oCwSCV04u6rQSzZMqUKdwErl3Hjh25jJDUvXv3uIyQ1Llz5wJf0qpVq4YOgehM586duQ4eD1xFIRgH4wmRXTmwLcBsENKmTZuAOXXhwgU6dOhQ5KutW7cucIDIaguvWrWKpk+fHksFuTITdIMkacao4+D98J5xxQOoIOUBJEqZOHEN6URXIEI+uuULW05mw+uWOdwnpBeFqCF9NSsHd6lp06ahXX78+DGgp3BySD4AdOTIkUA0G6kDjBcl79+/j6yDO2lzsvOvSCrF1VdoV6LhLJuJuLZNMi9sMxcPoA1aIW0TBzBT1A6kHW/cuMGviFORsu1mQ+0YOXJkIGWqo3aYAMQJqYsXL8b+mzJGLjLNUHfQxhTS193aYQLQNC+13gNoi5jS3gOYJIDppPguXbo0kD5EClSmBMtbWKX4wi6U05bVq1enmjVrMhTPnz+nDx8+cFmm+OLUwaBBg7gOtA2ZvoK07ty5c7ke85SziVqKbzpv7TCZMTa3dpgWke64qyke6HRi3TQxXb1tMMHlpJJpnhkDMJ0HbcAWGDhwIGMBlgJC+WGizgshdjnMrj6DDJ9gPSCpJIfJunfvHghvIcMnM2kRvho3bhx3CaatzPxKlFxUUlk5FRCTGWNakXI9KHZIkwpRozHwueVczi8hfTkrp+pAW3qbB1C5+skDSKmozx+xAhFaR8pQyLx581KXTUAQYgKDQIjLFganHpeXCbl69eovh7XBOhOyY8cOOnv2LJdhbjVr1ozLv40OtDny7wKg64FrVb96AA1fHCtqRyY/In4FOl46oV68M3v2bBKhdzD0Fy9ezGsFbhrYX0JwMFu+Z2vo0KEBPQX3DNQRIXIK1GTywAaErRglv80WNr2IXG+b1rThB9rMA209gLaIKe09gCUJYCYvYIRLJU5rVqlSJUCzq1+/fiAkBfcKp6qEgNEvM/5ttjBoH9u2beO+Jk+eTEg3FEsHuvw5pmiMqW+Xu7PUvm0AdGKopjMe6AE0IPBPrsB0XsQNCsmGDRv4b0AcTqaNyBdxQxfKl4uhHdoLQT8yJQWMfTm2KG/hrKysAEtfXQcwkSZMmBCY19GjR7mM8L98WXnGkkqmkL78Yq4sfR3BUgXQKR5o0ksu9aZ7Y3RHvTyAxbh87E9Zgf8Bi6e6tht7xDgAAAAASUVORK5CYII="></div>
                        </div>
                        <div id="customPrintedArea"></div>
                    </div> -->

            <div class="form-loading" v-if="newLoading" style="text-align: center; margin-top: calc(50vh - 8em)">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>
            </div>

            <div class="form-loading" v-if="mobileView && mobileLoading" style="text-align: center; margin-top: calc(50vh - 8em)">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>
            </div>
            <div v-else class="sContent" data-aos="fade-up" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos-anchor-placement="top-center" data-aos-offset="-150">

                <!-- ORDER ERRORS -->
                <div v-if="errorinprocess == true" :dir="lang == `en` ? `ltr` : `rtl`" class="formErrorr personal-info-main">
                    <br>
                    <span>{{ errorProcessMsg }}</span>
                    <br>
                </div>

                <!-- PAYMENT MAIN BLOCK -->
                <div class="payment-main-block" v-show="!loading && !done && paystep == 2">
                    <div class="pay-block">
                        <div class="title-box">
                            <div class="icon-title-box">
                                <i class="bx bx-money-withdraw"></i>
                            </div>
                            <div class="title-box-title">
                                <span>{{ lang == "ar" ? "خيارات الدفع" : "Payment Method" }}</span>
                            </div>
                        </div>
                        <div class="personal-form-group">
                            <div class="personal-form-signle cursor-pointer" v-bind:class="paymenttype == 1 ? 'form-active' : ''" @click="paymenttype = 1 ;deliverytype = 3 ;operation = 'again'">
                                <div class="personal-form-icon">
                                    <i class="bx bx-credit-card"></i>
                                </div>
                                <div class="personal-form-text">
                                    <span>
                                        {{ lang == "ar" ? "البطاقة الائتمانية" : "Credit Card" }}
                                    </span>
                                    <div v-bind:class="
                        paymenttype == 1 ? 'check-payment-active' : 'check-payment'
                      ">
                                        <i class="bx bx-check"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="personal-form-signle cursor-pointer" v-bind:class="paymenttype == 2 ? 'form-active' : ''" @click="paymenttype = 2;deliverytype = 1 ;operation = 'update' ">
                                <div class="personal-form-icon">
                                    <i class="bx bx-money"></i>
                                </div>
                                <div class="personal-form-text">
                                    <span>
                                        {{ lang == "ar" ? "الدفع عند الاستلام" : "Cash On Delivery" }}
                                    </span>
                                    <div v-bind:class="
                        paymenttype == 2 ? 'check-payment-active' : 'check-payment'
                      ">
                                        <i class="bx bx-check"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pay-block" v-if="paymenttype == 2">
                        <div class="title-box">
                            <div class="icon-title-box">
                                <i class="bx bxs-truck"></i>
                            </div>
                            <div class="title-box-title">
                                <span>{{ lang == "ar" ? "خيارات الشحن" : "Shipping Method" }}</span>
                            </div>
                        </div>
                        <div class="personal-form-group">
                            <div v-if="paymenttype == 2" class="personal-form-signle cursor-pointer" v-bind:class="deliverytype == 1 ? 'form-active' : ''" @click="deliverytype = 1;">
                                <div class="personal-form-icon">
                                    <i class="bx bxs-map"></i>
                                </div>
                                <div class="personal-form-text">
                                    <span>
                                        {{ lang == "ar" ? "الاستلام من الفرع" : "Drop at Branch" }}
                                    </span>
                                    <div v-bind:class="
                        deliverytype == 1 ? 'check-payment-active' : 'check-payment'
                      ">
                                        <i class="bx bx-check"></i>
                                    </div>
                                </div>
                            </div>
                            <div v-if="paymenttype == 1" class="personal-form-signle cursor-pointer" v-bind:class="deliverytype == 3 ? 'form-active' : ''" @click="deliverytype = 3;">
                                <div class="personal-form-icon">
                                    <i class="bx bxs-message"></i>
                                </div>
                                <div class="personal-form-text">
                                    <span>
                                        {{ lang == "ar" ? "الاستلام ب البريد الالكتروني" : "Drop at Branch" }}
                                    </span>
                                    <div v-bind:class="
                        deliverytype == 3 ? 'check-payment-active' : 'check-payment'
                      ">
                                        <i class="bx bx-check"></i>
                                    </div>
                                </div>
                            </div>

                            <!-- <div class="personal-form-signle cursor-pointer" v-bind:class="deliverytype == 2 ? 'form-active' : ''" @click="deliverytype = 2;addDeliveryPrice()">
                                <div class="personal-form-icon">
                                    <i class="bx bx-home-alt"></i>
                                </div>
                                <div class="personal-form-text">
                                    <span>
                                        {{ lang == "ar" ? "الاستلام في البيت" : "Drop at Home" }}
                                    </span>
                                    <div style="display: flex; align-items: center">
                                        <div class="cod-price" style="direction: ltr">
                                            <span>{{delivery_price}} S.R</span>
                                        </div>
                                        <div v-bind:class="
                          deliverytype == 2 ? 'check-payment-active' : 'check-payment'
                        ">
                                            <i class="bx bx-check"></i>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                        <div v-bind:class="lang == 'ar' ? 'branch-select' : 'branch-select-en'" v-show="!loading && !done && paymenttype == 2 && deliverytype == 1&& country == 8">
                            <select name="bCity" id="bCity" v-model="order.recivingbranch_id">
                                <option value="" disabled selected>
                                    {{ lang == "ar" ? "اختر الفرع" : "Select Branch" }}
                                </option>
                                <option v-for="c in branch" :value="c.id" :key="c.id">
                                    {{ c.title }}
                                </option>
                            </select>
                        </div>
                        <div class="branch-select" v-show="!loading && !done && deliverytype == 2">

                            <input type="text" name="benefiterName" v-model="order.customer_detail_address" v-bind="{
                    placeholder: lang == 'ar' ? 'ادخل العنوان' : 'Enter Full Address',
                  }" id="benefiterName" />
                        </div>
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

                            <div class="price-item" v-if="order.beforeOffer == order.pricing">
                                <div class="price-item-text">
                                    <!-- <span>{{ lang == "ar" ? "سعر البطاقة" : "Card Price" }}</span> -->
                                    <label>{{ lang == 'ar' ? 'السعر  ' : 'Cost ' }}</label>
                                </div>
                                <div class="price-item-price">
                                    <span>
                                        <b>{{ order.pricing ? order.pricing.toFixed(2) : order.pricing }}</b>
                                        {{lang == 'ar' ? country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="price-item" v-if="order.beforeOffer != order.pricing">
                                <div class="price-item-text">
                                    <!-- <span>{{ lang == "ar" ? "سعر البطاقة" : "Card Price" }}</span> -->
                                    <label>{{ lang == 'ar' ? 'السعر قبل الخصم' : 'Cost Before The Offer' }}</label>
                                </div>
                                <div class="price-item-price">
                                    <!-- <span>{{card_price}} S.R</span> -->
                                    <span v-if="order.beforeOffer">
                                        <b>{{ order.beforeOffer ? order.beforeOffer.toFixed(2) : order.pricing }}</b>
                                        {{lang == 'ar' ? country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                    <span v-if="!order.beforeOffer">
                                        <b>{{ order.pricing ? order.pricing.toFixed(2) : order.pricing }}</b>
                                        {{lang == 'ar' ? country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="price-item" v-if="order.beforeOffer != order.pricing">
                                <div class="price-item-text">
                                    <label>{{ lang == 'ar' ? 'السعر بعد الخصم' : 'After The Offer' }}</label>

                                </div>
                                <div class="price-item-price">
                                    <!-- <span>{{delivery_price}} S.R</span> -->
                                    <span>
                                        <b>{{ order.pricing ? order.pricing.toFixed(2) : order.pricing }}</b>
                                        {{lang == 'ar' ? country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                </div>
                            </div>

                            <div class="price-item" v-if="deliverytype == 2">
                                <div class="price-item-text">
                                    <span>{{ lang == "ar" ? "سعر التوصيل" : "Delivery Price" }}</span>
                                </div>
                                <div class="price-item-price">
                                    <span>{{delivery_price}} S.R</span>
                                </div>
                            </div>
                            <div class="price-item">
                                <div class="price-item-text">
                                  <label>{{ lang == 'ar' ? "ض.ق.م" : "V.A.T" }} </label>
                                   
                                </div>
                                <div class="price-item-price">
                                    <span>
                                        <b>{{ order.tax ? order.tax.toFixed(2) : order.tax }}</b>
                                        {{lang == 'ar' ?country.currency : country.currency_en}} 
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
                                        {{lang == 'ar' ?country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                    <span v-show="type == 2">
                                        <b>{{ totalFamilyPrice }}</b>
                                        {{lang == 'ar' ?country.currency : country.currency_en}} 
                                        {{ lang == "ar" ? currencies[1] : currencies[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- SUBMIT BUTTON -->
                <div class="submit-block" style="justify-content: end" v-show="!loading && !done && paystep == 1">
                    <div class="submit-button" @click="ordersErrorsStepOne(); ">
                        <span>{{ lang == "ar" ? "المتابعة" : "Proceed" }}</span>
                    </div>
                </div>

                <div class="submit-block two-buttons-submit" v-show="!loading && !done && paystep == 2 && operation == 'update'">

                    <div class="submit-button" @click="updateSubscribe();">
                        <span>{{ lang == "ar" ? "اتمام العملية" : "Complete Process" }}</span>
                    </div>
                </div>
                <div class="submit-block two-buttons-submit" v-show="!loading && !done && paystep == 2 && operation == 'again'">

                    <div class="submit-button" @click="tryAgain();">
                        <span>{{ lang == "ar" ? "حاول مرة اخري" : "Try again" }}</span>
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

if (document.querySelector(".btnSuccess") != null) {
    document.querySelector(".btnSuccess").addEventListener("click", function () {
        gtag("event", "conversion", {
            send_to: "AW-745144959/SFH4CImd6a4BEP-EqOMC",
        });
    });
}
</script><script>
import swal from "sweetalert";
import router from '../router'

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
    name: "PaymentStatus",

    metaInfo: {
        title: localStorage.getItem("lang") == "en" ? "Health Care" : "الرعاية الصحية",
    },

    data() {
        return {

            fullname: '',
            nationality: '',
            identity_number: '',
            start_date: '',
            end_date: '',
            lang: "ar",
            type: 1,
      currenciesSR: ["SR", "ر.س"],
      currenciesBH: ["BHD", "د.ب"],
      currencies: [],

            type1: true,
            type2: false,
            isActive: false,
            curentOrder: null,
            curentinvoice: null,
            curentmemberCardID: null,
            handica: false,
            operation: "again",
            company: false,
            error_country_check: false,

            paystep: 2,
            paymenttype: 2,
            deliverytype: 1,

            loading: false,
            mobileView: false,
            errorinprocess: false,
            errorProcessMsg: "",
            general_o_type: 'add',
            mobileLoading: true,
            newLoading: false,
            finishlaststate:false,
            done: false,
            sendCardes: false,
            sendCardesfail: false,
            hasMembership: 0,
            error: "",
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

            // family price data
            taxValue: 0,
            calculateTotalPrice: 0,
            totalFamilyPrice: 0,
            totalBeforeOffer: 0,
            totalTaxes: 0,
            codeValidationMessage: [],
            codeValidationDone: false,
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
                subscription_id: 14,
                fullname: "",
                gender: "",
                identity_number: "",
                membership_id: "",
                phone: "",
                email: "",
                country: "",
                country_id: "",
                city_id: "",
                zone_id: "",
                notes: "",
                customer_district: "",
                offer_id: "",
                recivingbranch_id: "",
                customer_detail_address: "",
                discount_code: "",
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
            country: '',
        };
    },

    watch: {
        country(val) {

            if (this.country == 11) this.taxValue = 0; // No Taxes In Bahreen
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
        calculateTotalPrice(total) {
            console.log("order calculateTotalPrice", this.order);
            this.totalBeforeOffer = 0;
            this.order.subOrders.forEach((order) => {
                if (order.beforeOffer) this.totalBeforeOffer += order.beforeOffer;
            });
            this.totalTaxes = total * this.taxValue;
            this.totalFamilyPrice = (total * (1 + this.taxValue)).toFixed(2);

        },

    },
    methods: {
        selectStatus() {
            let app = this
            app.errorinprocess = false;
            app.newLoading = true;
            console.log("ResponseCode", this.$route.query.ResponseCode);
            console.log("order_id", this.$route.params.order_id);
           
            console.log("general_o_type", this.$route.params.general_o_type);

        if(this.$route.params.general_o_type == 'add'){
                if (this.$route.query.ResponseCode == '000') {
                this.Success = true;
                this.storeMany(this.$route.params.order_id);
                app.newLoading = false;
                app.loading = false;
                app.done = true;

// CODE PIXEL TAG
                fbq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});
                snaptr('track', 'PURCHASE', {'client_email': app.order.email, 'currency': app.country == 8 ? "SAR" : "BHD", 'price' : Number(app.order.totalPrice), 'item_ids' : this.$route.params.order_id});
                twq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});
                ttq.track( 'CompletePayment', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), content_id : this.$route.params.order_id});
                gtag('event',  'purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});

            } else {
                let errorMsg = "An error occurred during the payment process";
                if (this.lang == "ar") {
                    errorMsg = " حذث خطا فى عملية الدفع حاول مرة اخري";
                }
                app.errorinprocess = true;
                app.newLoading = false;
                app.errorProcessMsg = errorMsg;
                if (this.$route.params.order_id > 0) {
                    app.getOneOrder(this.$route.params.order_id);
                }
            }
        }else{
                   if (this.$route.query.ResponseCode == '000') {
                this.Success = true;
                this.acceptRenewOrder_v2(this.$route.params.order_id);
                app.newLoading = false;
                app.loading = false;
                app.done = true;

// CODE PIXEL TAG
                fbq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});
                snaptr('track', 'PURCHASE', {'client_email': app.order.email, 'currency': app.country == 8 ? "SAR" : "BHD", 'price' : Number(app.order.totalPrice), 'item_ids' : this.$route.params.order_id});
                twq('track', 'Purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});
                ttq.track( 'CompletePayment', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), content_id : this.$route.params.order_id});
                gtag('event',  'purchase', {'client_email': app.order.email, currency: app.country == 8 ? "SAR" : "BHD", value : Number(app.order.totalPrice), order_id : this.$route.params.order_id});

            } else {
                let errorMsg = "An error occurred during the payment process";
                if (this.lang == "ar") {
                    errorMsg = " حذث خطا فى عملية الدفع حاول مرة اخري";
                }
                app.errorinprocess = true;
                app.newLoading = false;
                app.errorProcessMsg = errorMsg;
                if (this.$route.params.order_id > 0) {
                    app.getOneRenewOrder(this.$route.params.order_id);
                }
            }
        }

        },
        async addDeliveryPrice() {
            let app = this;
            app.order.totalPrice = ((Number(app.order.totalPrice) - Number(app.order.tax)) + Number(app.delivery_price));
            app.order.tax = (Number(app.order.totalPrice) * .15);
            app.order.totalPrice = (app.order.totalPrice * (1.15)).toFixed(2);

        },
        async tryAgain() {
            let app = this;
            app.loading = true;
            app.newLoading = true;
            app.done = false;
            app.errorinprocess = false;
            app.errorProcessMsg = "";
            if(this.$route.params.general_o_type == 'add'){
               app.paymentOnline(app.curentOrder.id);
            }else if(this.$route.params.general_o_type == 'renew'){
                 app.paymentOnline(app.curentOrder.id,'renew');
            }
               
        },

        async storeMany(orderID) {
            let app = this;

            let oobj = {
                "orders": [orderID],
                "print_state": 0
            }

            await axios
                .post(API_URL + `/api/v2/memberCard/storeMany`, oobj)
                .then(
                    function (response) {
                        console.log("store Many order", response);
                        if (response.data.membercards) {
                            app.curentmemberCardID = response.data.membercards[0].id ;
                            // this.identity_number = response.data.membercards[0].identity_number;
                            // this.nationality = response.data.membercards[0].nationality;
                            // this.start_date = response.data.membercards[0].start_date;
                            // this.end_date = response.data.membercards[0].end_date;

                        }
                        if (response.data.invoice) {
                            app.curentinvoice = response.data.invoice;
                           
                           if(response.data.membercards[0].country_id > 0){
                               if (response.data.membercards[0].country_id == 8) {
                                        app.currencies = app.currenciesSR;
                                    } else {
                                        app.currencies = app.currenciesBH;
                                    }
                           }
                        }
                        
                        if (typeof response.data.membercards !== 'undefined' && typeof response.data.invoice !== 'undefined') {
                           
                            let membercards=[];
                            for (let i = 0; i < response.data.membercards.length; i++) {
                                membercards.push(response.data.membercards[i].id);
                            }

                             app.sendCardesToEmail(membercards,response.data.invoice.id,response.data.Subscription,response.data.Branch);
                        }
                    
                    },
                    function (error) {
                        app.error = [];
                        if (error.response) {
                            if (error.response.data) {
                                if (error.response.data.error) {
                                    for (const err in error.response.data.error) {
                                        app.error.push(error.response.data.error[err]);
                                    }
                                }
                            }
                        }
                        app.loading = false;
                    }
                );

            //        .then(function ()
            //      {
            //     let currentObj = this;
            //     var pdf = new jsPDF();
            //     var element = document.getElementById('facture');
            //     var width = element.style.width * 2;
            //     var height = element.style.height * 2;
            //     // pdf.addImage({ imageData: canvas.toDataURL('image/jpeg', 0.6),format: 'JPEG', x: 2, y: 100, width: newImageWidth, height: newImageHeight});

            //     html2canvas(element).then(canvas => {
            //         var image = canvas.toDataURL('image/png', 0.3);
            //         pdf.addImage(image, 'PNG', 2, 2, width, height, undefined, 'FAST');

            //         var blob = pdf.output('blob');

            //         const config = {
            //             headers: {
            //                 'content-type': 'multipart/form-data',
            //                 'X-CSRF-TOKEN': 'pugwJXGhQC7xK83qbwLhWPgplWBjIDhWvbIREzFG'

            //             }
            //         }

            //         let formData = new FormData();
            //         formData.append('file', blob);

            //         axios.post('http://127.0.0.1:8000/api/uploading-file-api', formData, config)
            //             .then(function (response) {
            //                 currentObj.success = response.data.success;
            //             })
            //             .catch(function (error) {
            //                 currentObj.output = error;
            //             });

            //     });

            // }                

            // );

        },
        async acceptRenewOrder_v2(orderID) {
            let app = this;

            let oobj = {
                "order_id": orderID,
            }

            await axios
                .post(API_URL + `/api/v2/memberCard/acceptRenewOrder_v2`, oobj)
                .then(
                    function (response) {
                        console.log("accept Renew Order_v2", response);
                        if (response.data.membercards) {
                            app.curentmemberCardID = response.data.membercards[0].id ;
                            // this.identity_number = response.data.membercards[0].identity_number;
                            // this.nationality = response.data.membercards[0].nationality;
                            // this.start_date = response.data.membercards[0].start_date;
                            // this.end_date = response.data.membercards[0].end_date;

                        }
                        if (response.data.invoice) {
                            app.curentinvoice = response.data.invoice;
                           
                           if(response.data.membercards[0].country_id > 0){
                               if (response.data.membercards[0].country_id == 8) {
                                        app.currencies = app.currenciesSR;
                                    } else {
                                        app.currencies = app.currenciesBH;
                                    }
                           }
                        }
                        
                        if (typeof response.data.membercards !== 'undefined' && typeof response.data.invoice !== 'undefined') {
                           
                            let membercards=[];
                            for (let i = 0; i < response.data.membercards.length; i++) {
                                membercards.push(response.data.membercards[i].id);
                            }

                             app.sendCardesToEmail(membercards,response.data.invoice.id,response.data.Subscription,response.data.Branch);
                        }
                    
                    },
                    function (error) {
                        app.error = [];
                        if (error.response) {
                            if (error.response.data) {
                                if (error.response.data.error) {
                                    for (const err in error.response.data.error) {
                                        app.error.push(error.response.data.error[err]);
                                    }
                                }
                            }
                        }
                        app.loading = false;
                    }
                );

            //        .then(function ()
            //      {
            //     let currentObj = this;
            //     var pdf = new jsPDF();
            //     var element = document.getElementById('facture');
            //     var width = element.style.width * 2;
            //     var height = element.style.height * 2;
            //     // pdf.addImage({ imageData: canvas.toDataURL('image/jpeg', 0.6),format: 'JPEG', x: 2, y: 100, width: newImageWidth, height: newImageHeight});

            //     html2canvas(element).then(canvas => {
            //         var image = canvas.toDataURL('image/png', 0.3);
            //         pdf.addImage(image, 'PNG', 2, 2, width, height, undefined, 'FAST');

            //         var blob = pdf.output('blob');

            //         const config = {
            //             headers: {
            //                 'content-type': 'multipart/form-data',
            //                 'X-CSRF-TOKEN': 'pugwJXGhQC7xK83qbwLhWPgplWBjIDhWvbIREzFG'

            //             }
            //         }

            //         let formData = new FormData();
            //         formData.append('file', blob);

            //         axios.post('http://127.0.0.1:8000/api/uploading-file-api', formData, config)
            //             .then(function (response) {
            //                 currentObj.success = response.data.success;
            //             })
            //             .catch(function (error) {
            //                 currentObj.output = error;
            //             });

            //     });

            // }                

            // );

        },
        async updateSubscribe() {
            let app = this;
            app.errorinprocess = false;
            app.errorProcessMsg = "";
            app.loading = true;
            app.done = false;
            app.error = [];

            if (await this.ordersErrorsStepTow()) {
                let formdata = new FormData();

                formdata.append("order_id", app.curentOrder.id);
                formdata.append("payment_type", app.paymenttype);
                formdata.append("price", app.order.pricing);
                formdata.append("delivery_type", app.deliverytype);

                if (app.deliverytype == 1) {
                    formdata.append("recivingbranch_id", app.order.recivingbranch_id);
                } else if (app.deliverytype == 2) {
                    formdata.append("recivingbranch_id", app.order.recivingbranch_id);
                    formdata.append("customer_detail_address", app.order.customer_detail_address);
                    formdata.append("delivery_price", app.delivery_price);
                }
 formdata.append("total_price", app.order.totalPrice);

              
                console.log("add Subscribe to server", formdata);


              if(this.$route.params.general_o_type == 'add'){
                await axios
                    .post(API_URL + `/api/v2/update_order?lang=${this.lang}`, formdata)
                    .then(
                        function (response) {
                            console.log("update_order order", response);
                            // assign the first order id to be set as the parent id for the
                            // next orders.
                            // if (i == 0) app.order.id = response.data.data.id;
                            if (response.data) {
                                if (response.data.data) {
                                    let oid = response.data.data.id;
                                    app.addOrderInvoice(oid)
                                    app.loading = false;
                                    app.done = true;
                                    app.finishlaststate = true;
                                }
                            }

                        },
                        function (error) {
                            let errorMsg = "Please insert all your information";
                            if (app.lang == "ar") {
                                errorMsg = "من فضلك قم بإدخال كافة البيانات";
                            }
                            app.error = [];
                            if (error.response) {
                                if (error.response.data) {
                                    if (error.response.data.error) {
                                        for (const err in error.response.data.error) {
                                            app.error.push(error.response.data.error[err]);
                                        }
                                    }
                                }
                            }
                            app.error.push([errorMsg]);
                            app.loading = false;
                        }
                    );
               }else{
                  await axios
                    .post(API_URL + `/api/v2/update_renew_order?lang=${this.lang}`, formdata)
                    .then(
                        function (response) {
                            console.log("update_ renew _order order", response);
                         
                            if (response.data) {
                                if (response.data.data) {
                                    let oid = response.data.data.id;
                                    app.addOrderInvoice(oid,"renew")
                                    app.loading = false;
                                    app.done = true;
                                    app.finishlaststate = true;
                                }
                            }

                        },
                        function (error) {
                            let errorMsg = "Please insert all your information";
                            if (app.lang == "ar") {
                                errorMsg = "من فضلك قم بإدخال كافة البيانات";
                            }
                            app.error = [];
                            if (error.response) {
                                if (error.response.data) {
                                    if (error.response.data.error) {
                                        for (const err in error.response.data.error) {
                                            app.error.push(error.response.data.error[err]);
                                        }
                                    }
                                }
                            }
                            app.error.push([errorMsg]);
                            app.loading = false;
                        }
                    );
               }
            }
        },

        async addOrderInvoice(order_id,general_o_type='add') {
            let app = this;
            let dp = '';

            if (app.deliverytype == 2) {
                dp = app.delivery_price;
            }
            let oobj = {
                "order_id": order_id,
                "price_before": app.order.beforeOffer > 0 ? Number(app.order.beforeOffer) : 0,
                "after_price": app.order.pricing,
                "tax_price": app.order.tax,
                "delivery_price": dp,
                "total_price": app.order.totalPrice,
                  "email": app.order.email,
              "general_o_type": general_o_type
            }



            await axios
                .post(API_URL + `/api/v2/addOrderInvoice`, oobj)
                .then(response => {
                    console.log("success add OrderInvoice", response.data)
                })
                .catch(error => {
                    console.log("error add OrderInvoice", error)
                });

        },

        async getBranches() {
            let app = this;
            this.country = 8;
            if (this.country == null) return;
            axios
                .get(
                    `${API_URL}/api/allBranchesInCountry/${this.country}/branches`
                )
                .then((res) => {
                    app.branch = res.data;
                });
        },

        async getOneOrder(order_id) {
            let app = this;
            axios
                .post(API_URL + `/api/v2/getOneOrder`, {
                    "order_id": order_id
                })
                .then(response => {
                    console.log("success get OneOrder", response.data)
                    if (response.data && response.data != null) {
                        if (response.data.data) {
                            app.curentOrder = response.data.data;
                            this.changeValues(app.curentOrder);
                            app.newLoading = false;
                        }

                    }
                })
                .catch(error => {
                    console.log("error OneOrder", error)
                });

        },
        async getOneRenewOrder(order_id) {
            let app = this;
            axios
                .post(API_URL + `/api/v2/getOneRenewOrder`, {
                    "order_id": order_id
                })
                .then(response => {
                    console.log("success get One re new Order", response.data)
                    if (response.data && response.data != null) {
                        if (response.data.data) {
                            app.curentOrder = response.data.data;
                            this.changeValues(app.curentOrder);
                            app.newLoading = false;
                        }

                    }
                })
                .catch(error => {
                    console.log("error One re new Order", error)
                });

        },

          async sendCardesToEmail(m_ids,invoice_id,Subscription,Branch) {
            let app = this;

            app.sendCardes=false;
            app.sendCardesfail=false;
            let ojbj = {
                            "membercards_ids": m_ids,
                            "invoice_id": invoice_id,
                            "Subscription":Subscription,
                            "Branch":Branch
                        }

            axios
                .post(API_URL + `/api/v2/memberCard/sendCardesToEmail`,ojbj)
                .then(response => {
                    console.log("success send Cardes ToEmail", response.data)
                    if (response.data && response.data != null) {
                        if (response.data.success == true) {
                           app.sendCardes=true;
                           app.sendCardesfail=false;
                        }else{
                           app.sendCardes=false;
                           app.sendCardesfail=true;
                        }
                    }
                    else{
                        app.sendCardes=false;
                        app.sendCardesfail=true;
                    }
                })
                .catch(error => {
                    app.sendCardes=false;
                    app.sendCardesfail=true;
                    console.log("error in send Cardes ToEmail", error)
                });

        },
         async paymentOnline(order_id,general_o_type='add') {
            let app = this;
            await axios
                .post(API_URL + `/api/v2/getPaymentTransActionURL`, {
                    "amount":Number(app.order.totalPrice) ,
                    "country": app.country == 8 ? "SA" : "BH",
                    "currency": app.country == 8 ? "SAR" : "BHD",
                    "order_id":order_id,
                     "general_o_type": general_o_type,
                     
                })
                .then(response => {
                     if (response.data.data.targetUrl && response.data.data.payid) {
                        app.savePaymentOnlineID(order_id, response.data.data.payid, response.data.hash,general_o_type);
                        app.newLoading = false;
                        let link = response.data.data.targetUrl + "?paymentid=" + response.data.data.payid;
                        window.open(link, "_self");
                    }
                })
                .catch(error => {
                    console.log("error get Payment Trans Action URL", error)
                });

        },
        async savePaymentOnlineID(order_id, payid, hash,general_o_type='add') {
            let app = this;
            await axios
                .post(API_URL + `/api/v2/savePaymentOnlineID`, {
                    "order_id": order_id,
                    "payid": payid,
                    "payHash": hash,
                     "general_o_type": general_o_type
                })
                .then(response => {
  console.log("success save Payment Online ID", response.data);
                })
                .catch(error => {
                    console.log("error save Payment OnlineID", error)
                });
            console.log("paymenttype 1111", app.paymenttype);
        },
      
        async ordersErrorsStepOne() {
            let app = this;
            this.error = [];

            if (app.type == 2) {
                if (app.order.subOrders.length < 1) {
                    swal({
                        text: this.lang == "ar" ?
                            "الحد الأدنى للبطاقات العائلية 2" : "the minimum cards you can order is 2",
                        icon: "warning",
                        buttons: false,
                        dangerMode: true,
                    });
                    this.loading = false;
                    return;
                }
            }

            if (app.handica == true && app.order.uploaded != true) {
                swal({
                    text: this.lang == "ar" ?
                        "برجاء إرفاق صور التقارير الطبية" : "please insert the medical reports photos",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return true;
            }

            app.error = [];

            if (this.order.phone.length != 9) {
                swal({
                    text: this.lang == "ar" ?
                        "رقم الهاتف يجب ان يكون 9 ارقام" : "please insert phone 9 digit",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return true;
            }

            if (!(this.order.city_id > 0) || !(this.country > 0) || !this.order.fullname || this.order.fullname == "" || !this.order.email || this.order.email == "" || !this.order.phone || this.order.phone == "" || !this.order.identity_number || this.order.identity_number == "" || !this.order.nationality || this.order.nationality == "" || !this.order.gender || this.order.gender == "") {

                let errorMsg = "Please insert all your information";
                if (this.lang == "ar") {
                    errorMsg = "من فضلك قم بإدخال كافة البيانات";
                }
                this.error.push(errorMsg);
            }

            if (Array.isArray(this.error) && this.error.length > 0) {
                console.log("false")
                return
            } else {
                app.paystep = 2;
                console.log("true")
                return
            }
        },
        async ordersErrorsStepTow() {
            let app = this;
            this.error = [];
            if (app.paymenttype == 2 && (!app.order.recivingbranch_id || app.order.recivingbranch_id == "" || app.order.recivingbranch_id == null)) {
                swal({
                    text: this.lang == "ar" ?
                        "يرجي اختيار الفرع" : "Please select a branch",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return false;
            }

            if (app.deliverytype == 1 && (app.paymenttype == 1) && (!app.order.recivingbranch_id || app.order.recivingbranch_id == "" || app.order.recivingbranch_id == null)) {
                swal({
                    text: this.lang == "ar" ?
                        "يرجي اختيار الفرع" : "Please select a branch",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return false;

            } else if (app.deliverytype == 2 && (app.paymenttype == 1) && ((!app.order.customer_detail_address || app.order.customer_detail_address == "" || app.order.customer_detail_address == null) || (!app.order.recivingbranch_id || app.order.recivingbranch_id == "" || app.order.recivingbranch_id == null))) {
                swal({
                    text: this.lang == "ar" ?
                        "يرجي ادخال العنوان" : "Please  Enter Full Address",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return false;
            } else if (app.deliverytype == 2 && (app.paymenttype == 2) && (!app.order.customer_detail_address || app.order.customer_detail_address == "" || app.order.customer_detail_address == null)) {
                swal({
                    text: this.lang == "ar" ?
                        "يرجي ادخال العنوان" : "Please  Enter Full Address",
                    icon: "warning",
                    buttons: false,
                    dangerMode: true,
                });
                this.loading = false;
                return false;
            }
            return true;
        },
        commingFromMobileApp() {
            this.type = 2;
            this.mobileView = true;
            document.getElementById("footer").style.display = "none";
        },
        changeValues(curentOrder) {
            let app = this;
            console.log("curentOrder", curentOrder)
            app.paymenttype = curentOrder.payment_type;
             app.order.order_type=this.$route.params.general_o_type
            app.deliverytype = curentOrder.delivery_type;
            app.country = curentOrder.country_id;
if (this.country == 8) {
        app.currencies = app.currenciesSR;
      } else {
        app.currencies = app.currenciesBH;
      }
            app.order.recivingbranch_id = curentOrder.recivingbranch_id != null ? curentOrder.recivingbranch_id : "";
            if (curentOrder.invoice) {
                app.order.totalPrice = curentOrder.invoice.total_price;
                app.order.tax = curentOrder.invoice.tax_price;
                app.order.pricing = curentOrder.invoice.after_price;
                app.order.beforeOffer = curentOrder.invoice.price_before;
            }
            app.delivery_price = curentOrder.subscriptionPeice.delivery_price;
        },
    },

    mounted: function () {
        this.lang = localStorage.getItem("lang");
        const countryId = this.$route.query.country_id;
        if (countryId) this.commingFromMobileApp();
        this.selectStatus();
        this.getBranches();

    },
};
</script>

<style lang="scss">
@import "boxicons/css/boxicons.min.css";

.v-card__text {
    padding: 16px !important;
    width: 100% !important
}

.v-dialog--scrollable>.v-card>.v-card__text,
.v-dialog--scrollable>form>.v-card>.v-card__text {
    overflow-y: auto;
    -webkit-backface-visibility: hidden !important;
    backface-visibility: hidden !important
}

.printArea {
    position: relative !important;
    text-align: center !important;
    width: 5.2042in !important;
    height: 2.99in !important
}

.printArea .printed-image {
    position: absolute !important;
    bottom: 5px !important;
    right: 30px !important
}

.printArea div.data {
    width: 100% !important;
    text-align: center !important;
    padding: 10px 0 0 0 !important;
    position: absolute !important;
    z-index: 999 !important;
    top: 60px !important
}

.printArea .data div {
    font-family: sans-serif !important;
    font-weight: 700 !important;
    padding: .5px 0 !important;
    font-size: 17px !important
}

.printArea .top-attr {
    padding-bottom: 10px !important;
    padding-top: 5px !important
}

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

input:checked+.slider {
    background-color: rgb(29, 172, 100);
}

input:focus+.slider {
    box-shadow: 0 0 1px rgb(29, 172, 100);
}

input:checked+.slider:before {
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

.formErrorr {
    display: block;

    width: 100%;
    transition: 0.5s;

    // height: 0px;
    // overflow: hidden;
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
            .sHeadererror {
                text-align: center;

                h4 {
                    color: #ff3300;
                    margin-bottom: 0;
                }

            }

            .formType {
                padding: 0px 40px;
                // height: 183px;
                // line-height: 63px;
                // vertical-align: middle;
                margin-top: 30px;

                >label {
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
                            ~label {
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

                    >label {
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

.error {
    color: red;
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

            .personal-form-signle {
                width: 30%;
                height: 50px;
                border-radius: 5px;
                background-color: rgb(245, 245, 245);
                display: flex;

                @media only screen and (max-width: $small-size) {
                    width: 100%;
                    margin: 0 0 20px 0;
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
        height: 50px;
        border-radius: 5px;
        border: 2px solid rgba($primary-color, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        color: $primary-color;
        margin: 0 0 20px 0;

        .price-add-card {
            font-weight: 600;
            font-size: 16px;
            color: rgb(59, 59, 59);
        }

        i {
            font-size: 32px;
        }

        span {
            font-weight: 600;
            font-size: 20px;
        }
    }
}

.two-buttons-submit {
    justify-content: space-between;
    width: 80%;
    margin: auto;
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
            width: 100%;
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
            width: 50%;
        }

        span {
            color: $primary-color;
            font-weight: 800px;
        }
    }
}

.payment-main-block {
    width: 80%;
    margin: auto;

    @media only screen and (max-width: $small-size) {
        width: 100%;
    }

    .pay-block {
        margin: 0 0 10px 0;
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
                background-size: 20px 50px;
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
                background-size: 20px 50px;
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
            width: 100%;
            height: 50px;
            border: 1px solid rgb(235, 235, 235);
            border-radius: 5px;
            background-color: rgb(245, 245, 245);
            margin: 10px 0 10px 0;
            display: flex;
            align-items: center;

            // padding: 0 20px;
            input {
                width: 85%;
                background-color: rgb(245, 245, 245);
                border-radius: 10px;
                border: 0;
                color: black;
                font-size: 16px;
                padding-inline-start: 20px;

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
</style>
