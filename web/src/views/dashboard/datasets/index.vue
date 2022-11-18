<template> 
    <section id="dataset">
        <el-row class="dataset_body">
            <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5" class="left">
                <div class="list">
                    <div class="title">
                        <i class="icon icon_sizes"></i>
                        Sizes
                    </div>
                    <div class="cont">
                        <el-row :gutter="12">
                            <el-col :xs="6" :sm="6" :md="6" :lg="12" :xl="12" v-for="(l, index) in dataList.sizes" :key="index">
                                <router-link to="">
                                    {{l}}
                                </router-link>
                            </el-col>
                            <el-col :span="24">
                                <div class="more">+ 56</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        <i class="icon icon_licenses"></i>
                        Licenses
                    </div>
                    <div class="cont">
                        <el-row :gutter="12">
                            <el-col :xs="6" :sm="6" :md="6" :lg="12" :xl="12" v-for="(l, index) in dataList.Licenses" :key="index">
                                <router-link to="">
                                    {{l}}
                                </router-link>
                            </el-col>
                            <el-col :span="24">
                                <div class="more">+ 49</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" class="right">
                <div class="top">
                    <div class="top_text">
                        <b>Datasets</b> 12,291
                        <el-input v-model="searchValue" class="w-50 m-2" placeholder="" />
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
                <el-row :gutter="32" class="list_body" v-loading="listLoad">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="(list, l) in listdata" :key="l">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <img src="@/assets/images/dashboard/people_01.png" alt="">
                                    <span>27</span>
                                </div>
                            </template>
                            <div class="text">
                                <i class="icon icon_text"></i> {{list.name}}
                            </div>
                            <div class="text">
                                <el-row :gutter="6">
                                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                                        <router-link to="">
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
                    <p v-if="total<1" class="list_nodata">No Data</p>
                </el-row>
                <el-pagination :current-page="currentPage1" v-if="false"
                    :page-size="20"
                    :small="small"
                    :background="background"
                    layout="prev, pager, next"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-col>
        </el-row>
    </section>
</template>
<script>
let that
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
    name: 'Datasets',
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
            system: getCurrentInstance().appContext.config.globalProperties,
            listLoad: true,
            listdata: [],
            total: 0
        };
    },
    components: { },
    methods: {
        handleSizeChange(val) {},
        handleCurrentChange(val) {},
        async init () {
            that.listLoad = true
            const listRes = await that.system.$commonFun.sendRequest(`${process.env.VUE_APP_BASEAPI}dataset`, 'get')
            if (listRes) {
                that.listdata = listRes.datasets || []
                that.total = listRes.datasets.length
            }
            await that.system.$commonFun.timeout(500)
            that.listLoad = false
        }
    },
    mounted() {},
    activated() {
        that = this
        that.init()
    }
})
</script>

<style lang="scss" scoped>
#dataset{
    color: #333;
    font-size: 18px;
    @media screen and (max-width: 1200px){
        font-size: 16px;
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
        .left{
            position: relative;
            padding: 1rem 3% 0.5rem 0;
            .list{
                margin: 0.2rem 0 0;
                .title{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    padding: 0.11rem;
                    font-size: 0.19rem;
                    color: #000;
                    border-radius: 0.08rem;
                    .icon{
                        width: 0.22rem;
                        height: 0.22rem;
                        margin: 0 0.13rem 0 0;
                    }
                    .icon_sizes{
                        background: url(../../../assets/images/icons/icon_7.png) no-repeat left center;
                        background-size: 17px;
                    }
                    .icon_licenses{
                        background: url(../../../assets/images/icons/icon_8.png) no-repeat left center;
                        background-size: 17px;
                    }
                    &:hover{
                        background-color: #f1f7ff;
                    }
                }
                .cont{
                    padding: 0.12rem 0.06rem 0.12rem 0.46rem;
                    .el-row {
                        .el-col{
                            a{
                                display: block;
                                padding-top: 0.03rem;
                                padding-bottom: 0.03rem;
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
                            .more{
                                float: left;
                                padding: 5px 8px;
                                margin: 3px 0 0 0;
                                font-size: 13px;
                                color: #9ca3b1;
                                display: inline-block;
                                border-radius: 0.08rem;
                                cursor: pointer;
                                @media screen and (min-width: 1800px){
                                    font-size: 15px;
                                }
                                &:hover{
                                    background-color: #f5f6f8;
                                }
                            }
                        }
                    }
                }
                &:nth-child(2){
                    .cont{
                        .el-row{
                            .el-col{
                                a{
                                    background-color: #d2e3ff;
                                }
                            }
                        }
                    }
                }
            }
        }
        .right{
            position: relative;
            padding: 0.4rem 3%;
            .top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #9ca3b1;
                font-size: 0.19rem;
                .top_text{
                    display: flex;
                    align-items: center;
                    b{
                        padding: 0.08rem 0.25rem;
                        margin: 0 0.17rem 0 0;
                        background-color: #307aff;
                        font-size: 0.215rem;
                        font-weight: normal;
                        line-height: 1;
                        color: #fff;
                        border-radius: 0.09rem;
                    }
                    .el-input{
                        max-width: 3.4rem;
                        margin: 0 0 0 0.17rem;
                        .el-input__inner{
                            background-color: #f5f6f8;
                            border-color: #e1e1e1;
                            font-size: 0.19rem;
                            line-height: 1;
                            border-radius: 0.09rem;
                        }
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
            .list_body{
                padding: 0.2rem 0;
                min-height: 200px;
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
                                justify-content: space-between;
                                img{
                                    width: 0.4rem;
                                    margin: 0.05rem 0 0;
                                    border-radius: 100%;
                                    border: 2px solid #fff;
                                }
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
                            padding: 0.15rem 0 0.05rem;
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
                .list_nodata{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 200px;
                    font-size: 18px;
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
            &::before{
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                background-color: #c6c6c6;
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
