<template> 
    <section id="dataset" v-loading="loading" :element-loading-text="loadingText">
        <el-alert type="warning" effect="dark" center show-icon v-if="loadingText">
            <div slot="title">
                To use our site, please switch to
                <span @click="changeNet(31415)">FEVM Wallaby</span>.
            </div>
        </el-alert>
        <el-row class="dataset_body">
            <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5" class="left">
                <img :src="logoUrl" class="logo_sidebar" alt="">
                <el-menu
                    default-active="4"
                    class="el-menu-vertical-demo side"
                    @select="handleSelect"
                    background-color="#307aff"
                    text-color="#fff"
                >
                    <el-menu-item index="1">
                        <i class="icon icon_Dashboard"></i>
                        <span>Dashboard</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="icon icon_Browse"></i>
                        <span>Browse Tasks</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="icon icon_myTask"></i>
                        <span>My Task</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="icon icon_myProfile"></i>
                        <span>My Profile</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="icon icon_Tools"></i>
                        <span>Tools</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="icon icon_Documentation"></i>
                        <span>Documentation</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i class="icon icon_Support"></i>
                        <span>Support</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <i class="icon icon_Settigns"></i>
                        <span>Settigns</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" class="right">
                <div class="top">
                    <div class="top_text">
                        <h3>Hello {{info.address}}, <br />Welcome to FEVM Wallaby! </h3>
                    </div>
                    <div class="top_text">
                        <el-input v-model="searchValue" class="w-50 m-2" placeholder="search ..." />
                        <el-badge is-dot class="item l">
                            <i class="icon icon_cont"></i>
                        </el-badge>
                        <el-badge class="item l">
                            <i class="icon icon_info"></i>
                        </el-badge>
                        <img :src="peopleUrl" class="peopleImg l" alt="">
                    </div>
                </div>
                <div class="top">
                    <div class="list">
                        <div class="title">
                            <i class="icon icon_myProfile"></i>
                            My Profile
                        </div>
                    </div>
                    <el-select v-model="value" class="m-2" placeholder="Sort: most Downloads">
                        <template #prefix>
                            <i class="el-icon-select"></i> 
                        </template>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </div>
                <div class="my_profile">
                    <img :src="peopleUrl" class="peopleImg" alt="">
                    <div class="cont">
                        <h5>{{info.address}} <span>An independent IT nerd</span></h5>
                        <h6>Balance: {{info.balance}} tFil</h6>
                        <ul class="media" v-if="false">
                            <li>
                                <div class="iconBody">
                                    <svg t="1666864386749" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17131" width="128" height="128"><path d="M512 62.584C263.8 62.584 62.584 263.8 62.584 512S263.8 961.416 512 961.416 961.416 760.2 961.416 512 760.2 62.584 512 62.584z m232.022 584.767c0 24.81-20.876 45.112-46.4 45.112H326.377c-25.523 0-46.4-20.301-46.4-45.112l0.213-222.877 226.25 119.983a11.907 11.907 0 0 0 11.12 0l226.462-120.096v222.99z m-231.91-145.259L280.216 376.237c0.225-24.624 20.788-44.7 46.162-44.7h371.246c25.336 0 46.1 20.001 46.4 44.575l-231.91 125.98z" p-id="17132" fill="#ffffff"></path></svg>
                                </div>
                                xiaojie.peng@fogmeta.com
                            </li>
                            <li>
                                <div class="iconBody">
                                    <svg t="1666864721944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20294" width="128" height="128"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m215.3 337.7c0.3 4.7 0.3 9.6 0.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2-50.8-10.3-88.9-55-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1-30.9-20.6-49.5-55.3-49.5-92.4 0-20.7 5.4-39.6 15.1-56 54.7 67.4 136.9 111.4 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z" p-id="20295" fill="#ffffff"></path></svg>
                                </div>
                                xiaojie.peng
                            </li>
                            <li>
                                <div class="iconBody">
                                    <svg t="1666864808061" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21261" width="128" height="128"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="21262" fill="#ffffff"></path></svg>
                                </div>
                                xiaojie.peng
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        <i class="icon icon_spaces"></i>
                        Spaces <span>2</span>
                    </div>
                </div>
                <el-row :gutter="32" class="list_body_spaces">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" v-for="list in 2" :key="list">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>27</span>
                                </div>
                                <h1>Runway Inpainting</h1>
                            </template>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="list">
                    <div class="title">
                        <i class="icon icon_datasets"></i>
                        Datasets <span>{{dataSetIndex}}</span>
                    </div>
                </div>
                <el-row :gutter="32" class="list_body" v-loading="listLoad">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(list, l) in listdata" :key="l">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>27</span>
                                </div>
                            </template>
                            <div class="text">
                                <i class="icon icon_text"></i>
                                <p class="ellipsis">{{list.name}}</p>
                            </div>
                            <div class="text">
                                <el-row :gutter="6">
                                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                                        <router-link to="" class="ellipsis">
                                            {{list.data_schema}}
                                        </router-link>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="text item">
                                <i class="icon icon_time"></i> <span class="small">5 Sept 2022 - 5 Oct 2022</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </section>
</template>
<script>
let that
const ethereum = window.ethereum;
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'Personal Center',
    data() {
        return {
            dataList: {
                sizes: [
                    '100K<n<1M', '100K<n<1M', '1K<n<10K', '1K<n<10K', '100K<n<1M', '100K<n<1M', '1K<n<10K', '1K<n<10K',
                    'unknown', 'unknown', 'n<1K', 'n<1K'
                ],
                Licenses: [
                    'apache-2.0', 'apache-2.0', 'cc-by-4.0', 'cc-by-4.0', 'mit', 'mit', 'other', 'other',
                    'cc-by-sa-4.0', 'cc-by-sa-4.0', 'afl-3.0', 'afl-3.0'
                ]
            },
            searchValue: '',
            value: '',
            options: [
                {
                    value: 'Option1',
                    label: 'Most Downloads',
                },
                {
                    value: 'Option2',
                    label: 'Alphabetical',
                },
                {
                    value: 'Option3',
                    label: 'Recently Updated',
                },
                {
                    value: 'Option4',
                    label: 'Most Likes',
                }
            ],
            currentPage1: 1,
            small: false,
            background: false,
            logoUrl: require("@/assets/images/icons/logo_w.png"),
            peopleUrl: require("@/assets/images/dashboard/people.png"),
            system: getCurrentInstance().appContext.config.globalProperties,
            loading: true,
            loadingText: '',
            prevType: true,
            info: {
                address: '',
                balance: ''
            },
            dataSetIndex: 0,
            listdata: [],
            listLoad: false
        };
    },
    watch: {
        navLogin: () => {
            if(that.navLogin) that.isLogin()
        }
    },
    components: { },
    methods: {
        handleSelect(key, keyPath) {},
        async isLogin(){
            that.loadingText = ''
            that.system.$commonFun.Init(async addr => {
                that.info.address = addr
                that.system.$commonFun.web3Init.eth.getBalance(addr).then((balance) => {
                    // console.log(balance)
                    const myBalance = balance
                    const balanceAll = that.system.$commonFun.web3Init.utils.fromWei(myBalance, 'ether')
                    that.info.balance = Number(balanceAll).toFixed(0)
                })
                // await that.system.$commonFun.timeout(500)
                if (that.lagLogin) that.getdataList()
                else await that.signIn()
            })
        },
        async signIn () {
            const chainId = await ethereum.request({ method: 'eth_chainId' })
            if (parseInt(chainId, 16) === 31415) {
                const lStatus = await that.system.$commonFun.login()
                if(lStatus) that.getdataList()
                return false
            } else that.loadingText = 'Switch to FEVM Wallaby!'
            // that.system.$commonFun.messageTip('error', 'Switch to FEVM Wallaby!')
            that.$store.dispatch('setNavLogin', false)
        },
        async getdataList () {
            that.loading = false
            that.listLoad = true
            const listRes = await that.system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}dataset`, 'get')
            if (listRes) {
                that.listdata = listRes.datasets || []
                that.dataSetIndex = listRes.datasets.length
            }
            await that.system.$commonFun.timeout(500)
            that.listLoad = false
        },
        fn () {
            document.addEventListener('visibilitychange', function () {
                that.prevType = !document.hidden
            })
            ethereum.on('accountsChanged', function (account) {
                // console.log('account header:', account[0], !(account[0]));  //Once the account is switched, it will be executed here
                if (!that.prevType) return false
                that.loading = true
                that.$store.dispatch('setMetaAddress', account[0])
                that.$store.dispatch('setNavLogin', false)
                that.$store.dispatch('setLogin', false)
                that.$store.dispatch('setAccessToken', '')
                window.location.reload()
            })
            // networkChanged
            ethereum.on('chainChanged', function (accounts) {
                if (!that.prevType) return false
                if (parseInt(accounts, 16) === 31415) that.isLogin()
            })
            // 监听metamask网络断开
            ethereum.on('disconnect', (code, reason) => {
                // console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
                that.loading = true
                that.loadingText = 'Switch to FEVM Wallaby!'
                that.system.$commonFun.signOutFun()
                // window.location.reload()
            })
        },
        changeNet (rows) {
            let text = {
                chainId: that.system.$commonFun.web3Init.utils.numberToHex(rows),
                chainName: 'Fevm',
                rpcUrls: [process.env.VUE_APP_FEVMRPC],
                blockExplorerUrls: [process.env.VUE_APP_FEVMRPC]
            }
            ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [text]
            }).then((res) => {
                // that.signIn()
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {},
    activated() {
        that = this
        that.fn()
        if (that.navLogin || !!that.metaAddress) that.isLogin()
    },
    computed: {
        metaAddress () {
            return this.$store.state.metaAddress
        },
        navLogin () {
            return String(this.$store.state.navLogin)==='true'
        },
        lagLogin () {
            return String(this.$store.state.lagLogin)==='true'
        }
    }
})
</script>

<style lang="scss" scoped>
#dataset{
    position: relative;
    color: #333;
    font-size: 18px;
    @media screen and (max-width: 1200px){
        font-size: 16px;
    }
    :deep(.el-alert) {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2001;
        .el-alert__icon{
            @media screen and (min-width: 1600px){
                font-size: 20px;
                width: 20px;
            }
        }
        .el-alert__content{
            display: flex;
            align-items: center;
            .el-alert__description{
                @media screen and (min-width: 1600px){
                    font-size: 14px;
                    line-height: 1.3;
                }
                @media screen and (min-width: 1680px){
                    font-size: 16px;
                    line-height: 1.3;
                }
                @media screen and (min-width: 1800px){
                    font-size: 18px;
                    line-height: 1.3;
                }
                span{
                    text-decoration: underline;
                    cursor: pointer;
                }
                a{
                    text-decoration: underline;
                    color: #fff;
                }
            }
            .el-icon-close{
                @media screen and (min-width: 1600px){
                    font-size: 16px;
                    line-height: 1.3;
                }
                @media screen and (min-width: 1800px){
                    font-size: 18px;
                    line-height: 1.3;
                }
            }
        }
    }
    :deep(.dataset_body) {
        display: flex;
        align-items: stretch;
        padding: 0 0.16rem;
        margin: auto;
        font-size: 14px;
        @media screen and (min-width: 1280px){
            max-width: 1280px;
        }
        @media screen and (min-width: 1536px){
            max-width: 1536px;
        }
        &.opacity{
            opacity: 0;
        }
        .left{
            position: relative;
            padding: 0;
            background-color: #307aff;
            .logo_sidebar{
                display: block;
                width: 60%;
                max-width: 250px;
                margin: 0.55rem auto;
            }
            .side{
                padding: 0.25rem 0;
                border: 0;
                .el-menu-item{
                    display: flex;
                    align-items: center;
                    padding: 0.15rem 20% !important;
                    font-size: 14px;
                    transition: none;
                    @media screen and (min-width: 1800px){
                        font-size: 15px;
                    }
                    @media screen and (max-width: 1400px){
                        padding: 0.15rem 15% !important;
                    }
                    @media screen and (max-width: 1280px){
                        padding: 0.15rem 10% !important;
                    }
                    .icon{
                        width: 0.3rem;
                        height: 20px;
                    }
                    .icon_Dashboard{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_1.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_Browse{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_2.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_myTask{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_3.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_myProfile{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_4.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_Tools{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_5.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_Documentation{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_6.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_Support{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_7.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_Settigns{
                        background: url(../../../assets/images/icons/sidebar/icon_slider_8.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    &.is-active{
                        background-color: #fff;
                        &::after{
                            position: absolute;
                            content: '';
                            right: -1px;
                            top: 100%;
                            width: 0.45rem;
                            height: 0.45rem;
                            background: url(../../../assets/images/icons/sidebar/sidebar_bg_1.png) no-repeat center;
                            background-size: 100%;
                            z-index: 999;
                        }
                        &::before{
                            position: absolute;
                            content: '';
                            right: -1px;
                            bottom: 100%;
                            width: 0.45rem;
                            height: 0.45rem;
                            background: url(../../../assets/images/icons/sidebar/sidebar_bg_2.png) no-repeat center;
                            background-size: 100%;
                            z-index: 999;
                        }
                        .icon_Dashboard{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_1_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_Browse{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_2_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_myTask{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_3_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_myProfile{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_4_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_Tools{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_5_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_Documentation{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_6_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_Support{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_7_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                        .icon_Settigns{
                            background: url(../../../assets/images/icons/sidebar/icon_slider_8_1.png) no-repeat left center;
                            background-size: auto 100%;
                        }
                    }
                }
            }
        }
        .right{
            position: relative;
            padding: 0 4% 0.5rem;
            .top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 0.35rem 0 0.15rem;
                color: #9ca3b1;
                font-size: 0.19rem;
                .top_text{
                    display: flex;
                    align-items: center;
                    h3{
                        color: #307aff;
                        font-family: 'OpenSauceOne-Regular';
                        font-size: 0.22rem;
                        font-weight: 500;
                        line-height: 1.2;
                        text-align: left;
                    }
                    .el-input{
                        max-width: 2rem;
                        margin: 0 0 0 0.17rem;
                        .el-input__inner{
                            padding-left: 0.35rem;
                            background: url(../../../assets/images/icons/icon_13.png) no-repeat 0.1rem center;
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
                        ::-webkit-input-placeholder{
                            color: #9ca3b1;
                        }    /* 使用webkit内核的浏览器 */
                        :-moz-placeholder{
                            color: #9ca3b1;
                        }                  /* Firefox版本4-18 */
                        ::-moz-placeholder{
                            color: #9ca3b1;
                        }                  /* Firefox版本19+ */
                        :-ms-input-placeholder{
                            color: #9ca3b1;
                        } 
                    }
                    .peopleImg{
                        width: 0.55rem;
                        height: 0.55rem;
                        border-radius: 0.65rem;
                        border: 2px solid #4784ea;
                        cursor: pointer;
                    }
                    .icon{
                        display: block;
                        width: 0.25rem;
                        height: 0.25rem;
                    }
                    .icon_cont{
                        background: url(../../../assets/images/icons/icon_17.png) no-repeat left 0px;
                        background-size: auto 100%;
                    }
                    .icon_info{
                        background: url(../../../assets/images/icons/icon_18.png) no-repeat left 0px;
                        background-size: auto 100%;
                    }
                    .l{
                        margin-left: 0.35rem;
                    }
                }
                .el-select{
                    float: right;
                    .el-input{
                        cursor: pointer;
                        .el-input__inner{
                            width: 195px;
                            padding: 0 12px 0 40px !important;
                            background-color: #f5f6f8;
                            border-color: #e1e1e1;
                            font-size: 14px;
                            line-height: 1;
                            border-radius: 0.09rem;
                            @media screen and (min-width: 1800px){
                                font-size: 15px;
                            }
                        }
                        .el-input__prefix{
                            color: #9ca3b1;
                            .el-icon-select{
                                width: 21px;
                                height: 21px;
                                background: url(../../../assets/images/icons/icon_12.png) no-repeat left center;
                                background-size: 100%;
                            }
                        }
                        .el-input__suffix{
                            display: none;
                        }
                        ::-webkit-input-placeholder{
                            color: #9ca3b1;
                        }    /* 使用webkit内核的浏览器 */
                        :-moz-placeholder{
                            color: #9ca3b1;
                        }                  /* Firefox版本4-18 */
                        ::-moz-placeholder{
                            color: #9ca3b1;
                        }                  /* Firefox版本19+ */
                        :-ms-input-placeholder{
                            color: #9ca3b1;
                        } 
                    }
                }
            }
            .my_profile{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0.25rem;
                margin: 0 0 0.25rem;
                background-color: #307aff;
                border-radius: 0.1rem;
                .peopleImg{
                    width: 1.1rem;
                    height: 1.1rem;
                    margin: 0 0.3rem 0 0;
                    border-radius: 1.1rem;
                    border: 0.08rem solid #6cb9ff;
                    cursor: pointer;
                }
                .cont{
                    margin: 0.1rem 0 0;
                    color: #fff;
                    h5{
                        padding: 0.1rem 0;
                        font-family: 'OpenSauceOne-Regular';
                        font-size: 0.2rem;
                        font-weight: normal;
                        line-height: 1;
                        text-align: left;
                        span{
                            position: relative;
                            padding-left: 0.15rem; 
                            margin-left: 0.4rem;
                            font-size: 14px;
                            @media screen and (min-width: 1800px){
                                font-size: 15px;
                            }
                            &::after{
                                position: absolute;
                                content: '';
                                left: 0;
                                top: 50%;
                                width: 5px;
                                height: 5px;
                                margin-top: -2px;
                                background-color: #fff;
                                border-radius: 100%;
                            }
                        }
                    }
                    h6{
                        padding: 0.1rem 0;
                        font-family: 'OpenSauceOne-Regular';
                        font-size: 0.18rem;
                        font-weight: normal;
                        line-height: 1;
                        text-align: left;
                        @media screen and (min-width: 1800px){
                            font-size: 15px;
                        }
                    }
                    .media{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        li{
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            margin: 0.1rem 0.25rem 0.1rem 0;
                            font-size: 14px;
                            @media screen and (min-width: 1800px){
                                font-size: 15px;
                            }
                            .iconBody{
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                width: 25px;
                                height: 25px;
                                margin: 0 0.07rem 0 0;
                                border-radius: 100%;
                                @media screen and (min-width: 1800px){
                                    width: 30px;
                                    height: 30px;
                                }
                                svg{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                        }
                    }
                }
            }
            .list{
                margin: 0.15rem 0 0;
                .title{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 0;
                    font-family: 'OpenSauceOne-Bold';
                    font-size: 0.195rem;
                    color: #000;
                    border-radius: 0.08rem;
                    .icon{
                        width: 0.3rem;
                        height: 0.3rem;
                        margin: 0 0.07rem 0 0;
                    }
                    .icon_myProfile{
                        background: url(../../../assets/images/icons/icon_16.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    .icon_spaces{
                        background: url(../../../assets/images/icons/icon_15.png) no-repeat left center;
                        background-size: 100% auto;
                    }
                    .icon_datasets{
                        background: url(../../../assets/images/icons/icon_19.png) no-repeat left center;
                        background-size: auto 100%;
                    }
                    span{
                        margin-left: 0.13rem;
                        color: #9ca3b1;
                    }
                }
            }
            .list_body{
                padding: 0 0 0.2rem;
                .el-col{
                    margin: 0.16rem 0;
                    .box-card{
                        padding: 0.15rem 0.2rem;
                        background-color: #fff;
                        border-color: #e4e4e4;
                        border-radius: 0.1rem;
                        box-shadow: 5px 7px 9px rgba(0, 0, 0, 0.15);
                        .el-card__header{
                            padding: 0;
                            border: 0;
                            .card-header{
                                display: flex;
                                justify-content: flex-end;
                                span{
                                    height: 0.25rem;
                                    padding-left: 0.3rem;
                                    background: url(../../../assets/images/icons/icon_9.png) no-repeat left 0px;
                                    background-size: 0.2rem;
                                    font-size: 14px;
                                    color: #000;
                                    line-height: 0.25rem;
                                    @media screen and (min-width: 1800px){
                                        font-size: 15px;
                                    }
                                }
                            }
                        }
                        .el-card__body{
                            padding: 0 0 0.05rem;
                            .text{
                                display: flex;
                                justify-content: flex-start;
                                align-items: center;
                                color: #000;
                                line-height: 1;
                                @media screen and (min-width: 1800px){
                                    font-size: 15px;
                                }
                                .icon{
                                    width: 20px;
                                    height: 20px;
                                    margin: 0 6px 0 0;
                                }
                                .icon_text{
                                    background: url(../../../assets/images/icons/icon_10.png) no-repeat left center;
                                    background-size: 100%;
                                }
                                .icon_time{
                                    width: 15px;
                                    background: url(../../../assets/images/icons/icon_11.png) no-repeat left center;
                                    background-size: 100%;
                                }
                                .small{
                                    margin-top: 3px;
                                    color: #9ca3b1;
                                    font-size: 12px;
                                    @media screen and (min-width: 1800px){
                                        font-size: 13px;
                                    }
                                }
                                .el-row {
                                    width: 100%;
                                    margin: 0.1rem 0 0.25rem;
                                    .el-col{
                                        margin: 0.05rem 0;
                                        a{
                                            display: block;
                                            padding-top: 0.05rem;
                                            padding-bottom: 0.05rem;
                                            margin: 0.03rem auto;
                                            background-color: #94c0ff;
                                            border-radius: 0.2rem;
                                            font-size: 13px;
                                            color: #024384;
                                            @media screen and (min-width: 1800px){
                                                font-size: 15px;
                                            }
                                            @media screen and (max-width: 1440px){
                                                font-size: 12px;
                                            }
                                            &:hover{
                                                opacity: .9;
                                            }
                                        }
                                        &:nth-child(2n+2){
                                            a{
                                                background-color: #d2e3ff;
                                            }
                                        }
                                    }
                                }
                                .ellipsis{
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    word-spacing: normal;
                                }
                            }  
                        }
                    }
                    &:hover{
                        .box-card{
                            background-color: #307aff;
                            .el-card__header{
                                .card-header{
                                    span{
                                        background: url(../../../assets/images/icons/icon_9_1.png) no-repeat left 0px;
                                        background-size: 0.2rem;
                                        color: #fff;
                                    }
                                }
                            }
                            .el-card__body{
                                .text{
                                    color: #fff;
                                    .icon_text{
                                        background: url(../../../assets/images/icons/icon_10_1.png) no-repeat left center;
                                        background-size: 100%;
                                    }
                                    .icon_time{
                                        background: url(../../../assets/images/icons/icon_11_1.png) no-repeat left center;
                                        background-size: 100%;
                                    }
                                    .small{
                                        color: #fff;
                                    }
                                    .el-row {
                                        .el-col{
                                            a{
                                                background-color: #fff;
                                            }
                                            &:nth-child(2n+2){
                                                a{
                                                    background-color: #d2e3ff;
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
            .list_body_spaces{
                padding: 0.16rem 0;
                .el-col{
                    margin: 0.16rem 0;
                    .box-card{
                        background-color: #fff;
                        box-shadow: none;
                        border: 0;
                        border-radius: 0;
                        .el-card__header{
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 1.85rem;
                            padding: 0;
                            border: 0;
                            border-radius: 0.1rem;
                            font-size: 0.338rem;
                            color: #fff;
                            cursor: pointer;
                            .card-header{
                                position: absolute;
                                right: 0.33rem;
                                top: 0.1rem;
                                display: flex;
                                align-items: center;
                                span{
                                    height: 0.25rem;
                                    padding-left: 0.3rem;
                                    background: url(../../../assets/images/icons/icon_9_1.png) no-repeat left 0px;
                                    background-size: 0.2rem;
                                    font-size: 14px;
                                    color: #fff;
                                    line-height: 0.25rem;
                                    @media screen and (min-width: 1800px){
                                        font-size: 15px;
                                    }
                                }
                            }
                            h1{
                                text-shadow: 3px 3px rgba(0, 0, 0, 0.2);
                                text-transform: capitalize;
                                cursor: pointer;
                            }
                        }
                        .el-card__body{
                            padding: 0.1rem 0;
                            cursor: pointer;
                            .text{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                color: #000;
                                line-height: 1;
                                cursor: pointer;
                                @media screen and (min-width: 1800px){
                                    font-size: 15px;
                                }
                                .text_left{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                }
                                .icon{
                                    width: 0.25rem;
                                    height: 0.25rem;
                                    margin: 0 0.17rem 0 0;
                                    border-radius: 0.04rem;
                                }
                                span{
                                    color: #9ca3b1;
                                    font-size: 12px;
                                    cursor: pointer;
                                    @media screen and (min-width: 1800px){
                                        font-size: 13px;
                                    }
                                }
                                .small{
                                    color: #000;
                                }
                            }  
                        }
                    }
                    &:hover{
                        .box-card{
                            .el-card__header{
                                opacity: .8;
                            }
                        }
                    }
                    &:nth-child(9n+1){
                        .box-card{
                            .el-card__header{
                                background: #76a0ff url(../../../assets/images/dashboard/spaces/space_b_01.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_01.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+2){
                        .box-card{
                            .el-card__header{
                                background: #024ec6 url(../../../assets/images/dashboard/spaces/space_b_02.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_02.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+3){
                        .box-card{
                            .el-card__header{
                                background: #447dff url(../../../assets/images/dashboard/spaces/space_b_03.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_03.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+4){
                        .box-card{
                            .el-card__header{
                                background: #0050ff url(../../../assets/images/dashboard/spaces/space_b_04.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_04.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+5){
                        .box-card{
                            .el-card__header{
                                background: #0e5ccc url(../../../assets/images/dashboard/spaces/space_b_05.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_05.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+6){
                        .box-card{
                            .el-card__header{
                                background: #024ec6 url(../../../assets/images/dashboard/spaces/space_b_06.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_06.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+7){
                        .box-card{
                            .el-card__header{
                                background: #024ec6 url(../../../assets/images/dashboard/spaces/space_b_07.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_07.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+8){
                        .box-card{
                            .el-card__header{
                                background: #0234a6 url(../../../assets/images/dashboard/spaces/space_b_08.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_08.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                    &:nth-child(9n+9){
                        .box-card{
                            .el-card__header{
                                background: #002b77 url(../../../assets/images/dashboard/spaces/space_b_09.png) no-repeat center;
                                background-size: auto 61%;
                            }
                            .el-card__body{
                                .text{
                                    .icon{
                                        background: url(../../../assets/images/dashboard/spaces/space_w_09.png) no-repeat center;
                                        background-size: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .el-pagination{
                margin: 0.1rem auto;
                display: flex;
                justify-content: center;
                .btn-prev{
                    i{
                        font-size: 14px;
                        @media screen and (min-width: 1800px){
                            font-size: 16px;
                        }
                    }
                }
            }
            &::after{
                position: absolute;
                content: '';
                right: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                background-color: #c6c6c6;
            }
        }
    }
    :deep(.el-loading-mask) {
        background-color: rgba(255,255,255,1);
        .el-loading-spinner{
            top: 30%;
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
