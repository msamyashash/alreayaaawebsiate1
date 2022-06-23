<template>
    <div id="ContactUs">
        <div class="page">
            <div class="cContacts">
                <div class="cHeader"
                    data-aos="fade-down"

                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-anchor-placement="top-center">
                    <h2>{{ lang == 'ar' ? 'ﺗﻮاﺻﻞ ﻣﻌﻨﺎ' : 'Contact Us' }}</h2>
                    <p>{{ lang == 'ar' ? 'ﻣﻦ ﺧﻼل اﻗﺮب ﻓﺮع ﻣﻦ ﻓﺮوﻋﻨﺎ اﻟﻴﻚ' : 'From the nearest of our branches' }}</p>
                </div>
                <label class="loading" v-if="status == 'none'">
                  {{ lang == 'ar' ? 'عفواً لا توجد بيانات اتصال في الوقت الحالي' : 'Sorry, no contact details available' }}
                </label>
                <label class="loading" v-if="status == 'search' && status != 'none'">
                    <!-- <font-awesome-icon class="spinner" icon="spinner" />&ensp; -->
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    {{ lang == 'ar' ? 'جاري تحميل بيانات الإتصال..' : 'Loading contact details..' }}
                </label>
                <div class="cContent">
                    <ul
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="ease-in-out"
                    data-aos-anchor-placement="top-center" v-if="status == 'available'">
                        <li v-for="c in contacts">
                            <input type="radio" name="contact" v-bind="{ id: 'contact-'+c.id }">
                            <label v-bind="{ for: 'contact-'+c.id }">
                                <div class="cDetails">
                                    <div class="cText">
                                        <font-awesome-icon icon="map-marker-alt" size="2x" />
                                        <h3>{{ lang == 'ar' ? c.title_ar : c.title_en }}</h3>
                                        <p>{{ lang == 'ar' ? c.address_ar : c.address_en }}</p>
                                    </div>
                                    <div class="cLocation">
                                        <span>
                                            <a target="_blank" :href="'https://www.google.com/maps/@'+c.latitude+','+c.longitude+',15z'">
                                                <font-awesome-icon icon="location-arrow" />
                                            </a>
                                        </span>
                                        <label>{{ lang == 'ar' ? 'الموقع' : 'Directions' }}</label>
                                    </div>
                                </div>
                                <div class="cExtended">
                                    <ul class="ulR">
                                        <li>
                                            <label>{{ lang == 'ar' ? 'الهاتف: ' : 'Phone: ' }}</label>
                                            <a v-if="c.phones.length > 0" :href="'tel:'+c.phones[0].phone">{{ c.phones[0].phone }}</a>
                                        </li>
                                        <li>
                                            <label>{{ lang == 'ar' ? 'ﺧﺪﻣﺔ اﻟﻌﻤﻼء: ' : 'Customer Service: ' }}</label>
                                            <a v-if="c.phones.length > 0" :href="'tel:'+c.phones[0].customer_service">{{ c.phones[0].customer_service }}</a>
                                        </li>
                                        <li>
                                            <label>{{ lang == 'ar' ? 'اﻟﺮﻗﻢ اﻟﻤﻮﺣﺪ: ' : 'Unified No: ' }}</label>
                                            <a v-if="c.phones.length > 0" :href="'tel:'+c.phones[0].Unified_number">{{ c.phones[0].Unified_number }}</a>
                                        </li>
                                        <li>
                                            <label>{{ lang == 'ar' ? ' المبيعات: ' : 'Sales: ' }}</label>
                                            <a v-if="c.phones.length > 0" :href="'tel:'+c.phones[0].sales">{{ c.phones[0].sales }}</a>
                                        </li>
                                    </ul>
                                    <ul class="ulL">
                                        <li>
                                            <label>{{ lang == 'ar' ? 'اﻳﺎم اﻟﻌﻤﻞ: ' : 'Work days: ' }}</label>
                                            <label>{{ lang == 'ar' ? c.Dates_ar : c.Dates_en }}</label>
                                            
                                        </li>
                                    </ul>
                                </div>
                            </label>
                        </li>
                    </ul>
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
// const API_URL = 'https://cors-anywhere.herokuapp.com/http://api.alreaaiaa.com/api/'
 //const API_URL = "http://alreaaiaa.net/api/public/api/"
     const API_URL = "https://api.alreaaiaa.com/api/";
    export default {
  name: "ContactUs",
  metaInfo: {
      title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
    },
  data() {
    return {
      contacts: {},
      cPage: null,
      maxPerPage: 6,
      nTotal: 0,
      status: "search",
      lang: "ar"
    };
  },
  methods: {
    getContactUs() {
      let app = this;
      app.status = "search";
      axios.get(API_URL + "branch").then(function(response) {
        app.contacts = response.data;
        if (app.contacts.length == 0) {
          app.status = "none";
        } else {
          app.status = "available";
        }
      });
    },
    imgUrlAlt(event) {
      event.target.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADICAIAAAAMfxhbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF0WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA4LTEyVDA1OjAzOjQ0KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA4LTEyVDA1OjAzOjQ0KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wOC0xMlQwNTowMzo0NCswMjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZmFlMmU0Ni0xZDAzLWVlNGEtYjFiOC0yNWM5NzBkMDVmNGQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkNjE0YWFlYS00OTU1LTZmNDUtOGIx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";
    }
  },
  created: function() {
    let app = this;
    app.lang = localStorage.getItem('lang');
    app.getContactUs();
  }
};
</script>
<style lang="scss">
$primary-color: #18b4bb;
    #ContactUs {
        .page {
            width: 100%;
            min-height: calc(100vh - 165px);
            overflow: hidden;
            .cContacts {
                width: 600px;
                max-width: 100%;
                margin: 0 auto;
                margin-bottom: 50px;
                .cHeader {
                    text-align: center;
                    h2 {
                        color:$primary-color;
                        margin-bottom: 0;
                    }
                    p {
                        margin: 0;
                        color: #909090;
                    }
                }
            }
            .cContent {
                > ul {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    padding: 25px 0;
                    > li {
                        width: 100%;
                        margin-top: 25px;
                        &:hover {
                            background: #f7f7f7;
                        }
                        input {
                            display: none;
                            margin: 0;
                            padding: 0;
                        }
                        input:checked {
                            ~ label {
                                max-height: 800px;
                                transition: 0.35s max-height ease-in;
                            }
                        }
                        > label {
                            cursor: pointer;
                            display: block;
                            max-height: 110px;
                            transition: 0.15s max-height ease-out;
                            border-radius: 4px;
                            box-shadow: 1px 2px 12px 1px rgba(0,0,0,0.33);
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            overflow: hidden;
                            .cDetails {
                                width: calc(100% - 20px);
                                height: 110px;
                                padding: 10px;
                                overflow: hidden;
                                max-height: 100%;
                                .cText {
                                    max-height: 100%;
                                    overflow: hidden;
                                    width: calc(100% - 70px);
                                    float: right;
                                    svg {
                                        display: inline-block;
                                        color:$primary-color;
                                        width: 40px;
                                    }
                                    h3 {
                                        display: inline-block;
                                        color:$primary-color;
                                        margin: 0;
                                    }
                                    p {
                                        color: #707070;
                                        padding: 0;
                                        padding-right: 40px;
                                        padding-left: 20px;
                                        margin: 0;
                                    }
                                }
                                .cLocation {
                                    overflow: hidden;
                                    width: 70px;
                                    float: right;
                                    text-align: center;
                                    max-height: 100%;
                                    svg {
                                        color:#fff;
                                        background: $primary-color;
                                        padding: 7px 8px 7px 7px;
                                        border-radius: 4px;
                                        font-size: 120%;
                                    }
                                    label {
                                        color:$primary-color;
                                        font-weight: 700;
                                    }
                                }
                            }
                            .cExtended {
                                overflow: hidden;
                                width: 100%;
                                background: $primary-color;
                                padding-bottom: 10px;
                                overflow: hidden;
                                max-height: 100%;
                                ul {
                                    list-style: none;
                                    margin: 0;
                                    padding: 10px;
                                    padding-bottom: 0;
                                    float: right;
                                    display: block;
                                    overflow: hidden;
                                    max-height: 100%;
                                    &.ulR {
                                        width: calc(45% - 20px);
                                    }
                                    &.ulL {
                                       width: calc(55% - 20px);
                                    }
                                    li {
                                        width: 100%;
                                        label {
                                            color: #fff;
                                            font-weight: 700;
                                            display: inline;
                                            padding-left: 5px;
                                        }
                                        span {
                                            color: #fff;
                                        }
                                        a {
                                            color: #fff;
                                            text-decoration: none;
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
    @media screen and (max-width: 768px) {
        #ContactUs {
            .page {
                width: 100%;
                min-height: calc(100vh - 120px);
                height: 100%;
            }
        }
    }
    @media screen and (max-width: 425px) {
        #ContactUs .page .cContent > ul > li > label .cDetails {
            height: auto;
        }
        #ContactUs .page .cContent > ul > li > label .cDetails .cText h3 {
            display: inline;
            font-size: 100%;
        }
        #ContactUs .page .cContent > ul > li > label .cDetails .cText svg {
            display: block;
            float: right;
        }
    }
</style>
