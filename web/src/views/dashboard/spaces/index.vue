<template> 
    <section id="space">
        <el-row class="space_body">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="space_area">
                <div class="top">
                    <div class="top_text">
                        <h2>Spaces</h2>
                        <p>A layer-3 cross-chain solution that helps Web3</p>
                    </div>
                    <div class="top_button">
                        <router-link to="" class="button">Create new Space</router-link>
                        or
                        <router-link to="">learn more about Space</router-link>
                    </div>
                </div>
                <div class="top">
                    <div class="top_input">
                        <el-input v-model="searchValue" class="w-50 m-2" placeholder="search Space" />
                    </div>
                    <div class="title">
                        Spaces of the week
                        <i class="icon icon_week"></i>
                    </div>
                </div>
                <el-row :gutter="32" class="list_body">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="list in 9" :key="list">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span>27</span>
                                </div>
                                <h1>Runway Inpainting</h1>
                            </template>
                            <div class="text">
                                <div class="text_left">
                                    <i class="icon icon_time"></i> <span class="small">Spaces of the week</span>
                                </div>
                                <span>Spaces of the week</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-pagination :current-page="currentPage1"
                    :page-size="100"
                    :small="small"
                    :background="background"
                    layout="prev, pager, next"
                    :total="1000"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </el-col>
        </el-row>
    </section>
</template>
<script>
let that
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Spaces',
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
        };
    },
    components: { },
    methods: {
        handleSizeChange(val) {},
        handleCurrentChange(val) {},
    },
    mounted() {
        that = this
    },
})
</script>

<style lang="scss" scoped>
#space{
    color: #333;
    font-size: 18px;
    @media screen and (max-width: 1200px){
        font-size: 16px;
    }
    :deep(.space_body) {
        display: flex;
        align-items: stretch;
        padding: 0 0.16rem;
        margin: auto;
        font-size: 14px;
        overflow: hidden;
        @media screen and (min-width: 1280px){
            max-width: 1280px;
        }
        @media screen and (min-width: 1536px){
            max-width: 1536px;
        }
        .space_area{
            position: relative;
            padding: 0.74rem 0 0.45rem;
            .top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                color: #9ca3b1;
                font-size: 0.19rem;
                .top_text{
                    h2{
                        display: block;
                        padding: 0 0 0 0.8rem;
                        background: url(../../../assets/images/icons/icon_15.png) no-repeat left center;
                        background-size: auto 100%;
                        font-family: 'OpenSauceOne-Bold';
                        font-size: 0.44rem;
                        color: #000;
                        text-align: left;
                    }
                    p{
                        margin: 0.15rem 0;
                        font-size: 0.16rem;
                        color: #9ca3b1;
                        line-height: 1;
                    }
                }
                .top_button{
                    font-size: 14px;
                    line-height: 1;
                    color: #9ca3b1;
                    @media screen and (min-width: 1800px){
                        font-size: 15px;
                    }
                    a{
                        margin: 0 0.07rem;
                        text-decoration: underline;
                        color: inherit;
                        &:hover{
                            opacity: .7;
                        }
                    }
                    .button{
                        padding: 0.1rem 0.3rem;
                        margin: 0 0.1rem 0 0;
                        background-color: #f5f6f8;
                        color: #000;
                        border: 1px solid #e5e5e6;
                        border-radius: 0.09rem;
                        text-decoration: none;
                    }
                }
                .top_input{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    .el-input{
                        max-width: 3.4rem;
                        margin: 0.65rem 0 0.32rem;
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
                    }
                }
                .title{
                    float: left;
                    display: flex;
                    align-items: center;
                    padding: 0.05rem 0 0.05rem 0.35rem;
                    background-color: #d2e3ff;
                    font-size: 0.16rem;
                    color: #6e8096;
                    border-radius: 0.1rem;
                    line-height: 1.4;
                    .icon_week{
                        width: 0.25rem;
                        height: 0.25rem;
                        margin: 0 0.14rem;
                        background: url(../../../assets/images/icons/icon_14.png) no-repeat center;
                        background-size: 100%;
                    }
                }
            }
            .list_body{
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
                            font-size: 0.305rem;
                            color: #fff;
                            cursor: pointer;
                            .card-header{
                                position: absolute;
                                right: 0.13rem;
                                top: 0.25rem;
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
                                        font-size: 14px;
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
                                background: #93b9f9 url(../../../assets/images/dashboard/spaces/space_b_01.png) no-repeat center;
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
                                background: #76a0ff url(../../../assets/images/dashboard/spaces/space_b_02.png) no-repeat center;
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
