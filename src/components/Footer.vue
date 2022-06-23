<template>
    <div id="footer">
        <div class="footer-cards">
            <div class="card-container">
                <img src="../assets/imgs/footer/mada.png">
            </div>
            <div class="card-container">
                <img src="../assets/imgs/footer/mastercard.png">
            </div>
            <div class="card-container">
                <img src="../assets/imgs/footer/visa.svg">
            </div>
            <div class="card-container">
                <img src="../assets/imgs/footer/american-express.svg">
            </div>
        </div>
        <div class="copyright">
            {{ lang == 'ar' ? 'جميع الحقوق محفوظة للرعاية الصحية' : 'Copyrights Reserved Alreaaiaa' }} &copy; 2018
        
            <a v-if="!isVisitor" href="https://alreaaiaa.com/polices">{{ lang == 'ar' ?" سياسة الخصوصية" : " privacy and policy"}}</a>
            <!-- <a href="https://alreaaiaa.com/polices">{{ lang == 'ar' ?" سياسة الخصوصية" : " privacy and policy"}}</a> -->
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'Footer',
    metaInfo: {
        title:localStorage.getItem('lang')=='en'?'Health Care':'الرعاية الصحية',
      },
    data() {
        return {
        lang: "ar"
        };
    },
    created: function() {
        let app = this;
        app.lang = localStorage.getItem('lang');
    },
    computed: {
        isVisitor() {
        const visitorLinks = [
            "MedicalNetVisitor",
            "CompanyVisitor",
        ];
        return visitorLinks.includes(this.$route.name);
        },
    }
}
</script>
<style lang="scss">
    * {
        box-sizing: border-box;
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
    $primary-color: #18b4bb;
    #footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: $primary-color;
        color: #fff;
        font-size: 110%;
        width: 100%;
        display: flex;
        @media only screen and (max-width: 780px) {
            flex-wrap: wrap;
            height: 110px;
        }
        
        
        .footer-cards {
            // width: 20%;
            margin-inline-start: 40px;
            height: 50px;
            position: absolute;
            display: flex;
            @media only screen and (max-width: 823px) {
                margin-inline-start: 30px;
            }
            @media only screen and (max-width: 823px) {
                margin-inline-start: 20px;
            }
            @media only screen and (max-width: 780px) {
                position: static;
                width: 100%;
                margin-inline-start: 0px;
                justify-content: center;
            }
            
            
            
            .card-container {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-inline-end: 10px;
                img {
                    height: 50%;
                    @media only screen and (max-width: 967px) {
                        height: 40%;
                    }
                    @media only screen and (max-width: 897px) {
                        height: 30%;
                    }
                    @media only screen and (max-width: 780px) {
                        height: 50%;
                    }
                }
            }
        }
        .copyright {
            margin: auto;
            @media only screen and (max-width: 780px) {
                width: 100%;
            }
            
        }
    }
</style>
