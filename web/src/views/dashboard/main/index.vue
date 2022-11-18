<template> 
    <section id="step">
        <div class="step_body">
            <img :src="logoUrl" alt="Lagrange Logo" class="logo" />
            <h1>data and computing</h1>
            <p>Decentralized data science without borders</p>
            <div class="button">
                <el-button type="primary" round>GET STARTED</el-button>
                <router-link :to="{name: 'datasets'}">Learn More <img :src="learnUrl" alt=""></router-link>
            </div>
        </div>
    </section>
</template>

<script>
let that
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'home',
    data() {
        return {
            logoUrl: require("@/assets/images/icons/logo.png"),
            learnUrl: require("@/assets/images/icons/icon_6.png")
        };
    },
    components: { },
    methods: {},
    mounted() {
        that = this
    }
})
</script>

<style lang="scss" scoped>
#step{
    min-height: 300px;
    padding: 1rem 0;
    color: #fff;
    background: url(../../../assets/images/dashboard/main/bg_img.png) no-repeat center;
    background-size: cover;
    font-size: 18px;
    @media screen and (max-width: 1200px){
        font-size: 16px;
    }
    .step_body{
        padding: 0.6rem 0.16rem 1.5rem;
        margin: auto;
        background: 
            url(../../../assets/images/dashboard/main/bg_small_1.png),
            url(../../../assets/images/dashboard/main/bg_small_2.png);
        background-repeat: no-repeat, no-repeat;
        background-size: 14%, 10%;
        background-position: bottom left, top right; 
        @media screen and (min-width: 1280px){
            max-width: 1280px;
        }
        @media screen and (min-width: 1536px){
            max-width: 1536px;
        }
        .logo{
            height: 0.75rem;
            margin: auto;
        }
        h1{
            margin: 0.4rem 0 0.2rem;
            font-size: 1.05rem;
            color: #001dc0;
            text-transform: uppercase;
            text-align: center;
            background-image:-webkit-linear-gradient(left,#001dc0,#3079fe); 
            -webkit-background-clip:text; 
            -webkit-text-fill-color:transparent; 
            @media screen and (max-width: 1440px){
                font-size: 0.95rem;
            }
        }
        p{
            font-size: 0.2735rem;
            color: #53637f;
            line-height: 1.2;
            @media screen and (max-width: 1440px){
                font-size: 0.25rem;
            }
        }
        .button{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.55rem 0 0;
            :deep(.el-button) {
                height: auto;
                padding: 0.12rem 0.22rem;
                background-color: #307aff;
                @media screen and (min-width: 1800px){
                    font-size: 16px;
                }
                &:hover{
                    opacity: .9;
                }
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 0 0 0.15rem;
                font-size: 14px;
                font-weight: 600;
                color: #307aff;
                cursor: pointer;
                @media screen and (min-width: 1800px){
                    font-size: 16px;
                }
                img{
                    width: 0.28rem;
                    margin: 0 0 0 0.1rem;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>


<i18n>
{
  "en": {},
  "zh": {}
}
</i18n>
