<template>
    <div class="headerCont">
        <el-row class="headerStyle">
            <el-col :xs="20" :sm="20" :md="20" :lg="8" :xl="8" class="logoImg">
                <img :src="logo" @click="header_logo" alt='' /> 
                <el-input v-model="searchValue" class="w-50 m-2" placeholder="search models,datasets,users..." />
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="16" :xl="16" class="header_right">
                <el-menu
                    :default-active="activeIndex" router
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item index="/dashboard/dataset">
                        <i class="icon icon_datasets"></i>
                        Datasets
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="icon icon_models"></i>
                        Models
                    </el-menu-item>
                    <el-menu-item index="/dashboard/spaces">
                        <i class="icon icon_spaces"></i>
                        Spaces
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="icon icon_docs"></i>
                        Docs
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="icon icon_solutions"></i>
                        Solutions
                    </el-menu-item>
                    <el-menu-item index="6">
                        Pricing
                    </el-menu-item>
                    <el-menu-item index="7">
                        &nbsp;
                        <svg class="mr-1.5 text-gray-500 w-5 group-hover:text-gray-400 dark:text-gray-300 dark:group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" role="img" width="21px" height="21px" viewBox="0 0 32 18" preserveAspectRatio="xMidYMid meet"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4504 3.30221C14.4504 2.836 14.8284 2.45807 15.2946 2.45807H28.4933C28.9595 2.45807 29.3374 2.836 29.3374 3.30221C29.3374 3.76842 28.9595 4.14635 28.4933 4.14635H15.2946C14.8284 4.14635 14.4504 3.76842 14.4504 3.30221Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4504 9.00002C14.4504 8.53382 14.8284 8.15588 15.2946 8.15588H28.4933C28.9595 8.15588 29.3374 8.53382 29.3374 9.00002C29.3374 9.46623 28.9595 9.84417 28.4933 9.84417H15.2946C14.8284 9.84417 14.4504 9.46623 14.4504 9.00002Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.4504 14.6978C14.4504 14.2316 14.8284 13.8537 15.2946 13.8537H28.4933C28.9595 13.8537 29.3374 14.2316 29.3374 14.6978C29.3374 15.164 28.9595 15.542 28.4933 15.542H15.2946C14.8284 15.542 14.4504 15.164 14.4504 14.6978Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M1.94549 6.87377C2.27514 6.54411 2.80962 6.54411 3.13928 6.87377L6.23458 9.96907L9.32988 6.87377C9.65954 6.54411 10.194 6.54411 10.5237 6.87377C10.8533 7.20343 10.8533 7.73791 10.5237 8.06756L6.23458 12.3567L1.94549 8.06756C1.61583 7.73791 1.61583 7.20343 1.94549 6.87377Z" fill="currentColor"></path></svg>
                    </el-menu-item>
                    <el-menu-item index="/dashboard/personal_center">
                        &nbsp;
                        <span v-if="!lagLogin" class="loginBtn">Login</span>
                        <img v-else :src="people_img" class="people" width="30" height="30" alt="">
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>
<script>
let that
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'header_page',
    components: { },
    data() {
        return {
            logo: require("@/assets/images/icons/logo_black.png"),
            people_img: require("@/assets/images/dashboard/people.png"),
            searchValue: '',
            activeIndex: '',
            bodyWidth: document.body.clientWidth>=992?false:true
        };
    },
    watch: {
        $route: function (to, from) {
            this.activeIndex = to.path
            window.scrollTo(0, 0)
        }
    },
    methods: {
        header_logo() {
            that.$router.push({name: 'main'})
        },
        handleSelect(key, keyPath) {
            // console.log(key) //  
            if(key === '/dashboard/personal_center') that.$store.dispatch('setNavLogin', true)
            else that.$store.dispatch('setNavLogin', false)
        }
    },
    mounted() {
        that = this
    },
    computed: {
        metaAddress () {
            return this.$store.state.metaAddress
        },
        lagLogin () {
            return String(this.$store.state.lagLogin)==='true'
        }
    }
})
</script>
<style lang="scss" scoped>
.headerCont{
    min-height: 0.68rem;
    overflow: hidden;
    .headerStyle{
        height: 0.68rem;
        padding: 0 0.16rem;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        font-size: 14px;
        @media screen and (min-width: 1280px){
            max-width: 1280px;
        }
        @media screen and (min-width: 1536px){
            max-width: 1536px;
        }
        .logoImg{
            display: flex;
            align-items: center;
            width: auto;
            height: 0.3rem;
            cursor: pointer;
            img{
                display: block;
                height: 100%;
                width: auto;
                max-width: 100%;
                margin: 0 0.35rem 0 0;
                cursor: pointer;
            }
            :deep(.el-input) {
                .el-input__inner{
                    padding-left: 0.35rem;
                    background: url(../assets/images/icons/icon_13.png) no-repeat 0.1rem center;
                    background-size: 17px;
                    border-radius: 0.1rem;
                    border-color: #cfcfcf;
                    @media screen and (min-width: 1800px){
                        font-size: 15px;
                    }
                }
                .el-input__prefix{
                    padding: 0;
                    .el-icon{
                        svg{
                            width: 0.22rem;
                            height: 0.22rem;
                            color: #9ea5b3;
                        }
                    }
                }
            }
        }
        .header_right{
            display: flex;
            align-items: center;
            :deep(.el-menu) {
                width: 100%;
                border: 0;
                justify-content: flex-end;
                .el-menu-item{
                    padding: 0 0.15rem;
                    background-color: transparent !important;
                    border: 0 !important;
                    @media screen and (min-width: 1800px){
                        font-size: 15px;
                    }
                    .icon{
                        width: 21px;
                        height: 20px;
                        margin: 0 6px 0 0;
                    }
                    svg{
                        width: 21px;
                    }
                    img.people{
                        width: 30px;
                        height: 30px;
                        border-radius: 30px;
                        border: 2px solid #4784ea;
                        cursor: pointer;
                    }
                    .icon_datasets{
                        background: url(../assets/images/icons/icon_1.png) no-repeat left center;
                        background-size: 17px;
                    }
                    .icon_models{
                        background: url(../assets/images/icons/icon_2.png) no-repeat left center;
                        background-size: 17px;
                    }
                    .icon_spaces{
                        background: url(../assets/images/icons/icon_3.png) no-repeat left center;
                        background-size: 21px;
                    }
                    .icon_docs{
                        background: url(../assets/images/icons/icon_4.png) no-repeat left center;
                        background-size: 19px;
                    }
                    .icon_solutions{
                        background: url(../assets/images/icons/icon_5.png) no-repeat left center;
                        background-size: 17px;
                    }
                    .loginBtn{
                        padding: 0.1rem 0.2rem;
                        margin: 0;
                        background-color: #307aff;
                        font-weight: normal;
                        line-height: 1;
                        color: #fff;
                        border-radius: 0.05rem;
                        &:hover{
                            opacity: .9;
                            cursor: pointer;
                        }
                    }
                    &.is-active, &:hover{
                        color: #94c0ff !important;
                        .icon_datasets{
                            background: url(../assets/images/icons/icon_1_1.png) no-repeat left center;
                            background-size: 17px;
                        }
                        .icon_models{
                            background: url(../assets/images/icons/icon_2_1.png) no-repeat left center;
                            background-size: 17px;
                        }
                        .icon_spaces{
                            background: url(../assets/images/icons/icon_3_1.png) no-repeat left center;
                            background-size: 21px;
                        }
                        .icon_docs{
                            background: url(../assets/images/icons/icon_4_1.png) no-repeat left center;
                            background-size: 19px;
                        }
                        .icon_solutions{
                            background: url(../assets/images/icons/icon_5_1.png) no-repeat left center;
                            background-size: 17px;
                        }
                    }
                }
                .el-sub-menu__title{
                    border: 0;
                }
            }
        }
    }
}

@media screen and (max-width:1024px){
    
}
@media screen and (max-width: 441px){
    .headerCont {
        .headerStyle {
            padding: 0 2%;
            .logoImg{
                width: 50%;
                height: auto;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>
