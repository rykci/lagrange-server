<template>
    <div class="wrapper" id="wrapper" ref="area">
        <el-container>
            <el-header><v-head></v-head></el-header>
            <el-main>
                <div class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="move" mode="out-in">
                            <keep-alive>
                                <component :is="Component"/>
                            </keep-alive>
                        </transition>
                    </router-view>
                </div>
            </el-main>
            <el-footer :class="{'footer_position': positionStyle}">
                <v-foot :positionStyle="positionStyle"></v-foot>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vFoot from './Footer.vue';
import elementResizeDetectorMaker from "element-resize-detector"
export default {
    data() {
        return {
            bodyWidth: document.body.clientWidth<=1024?true:false,
            positionStyle: false
        };
    },
    components: {
        vHead,
        vFoot
    },
    computed: {},
    mounted() {
        this.footer_style()
    },
    methods: {
        footer_style() {
            let _this = this
            _this.positionStyle = false

            let erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.area, (element) => { 
                let width = element.offsetWidth;
                let height = element.offsetHeight;
                let clientHeight = document.documentElement.clientHeight;
                _this.$nextTick(() => {
                    if(height < clientHeight){
                        _this.positionStyle = true
                    }else{
                        _this.positionStyle = false
                    }
                })
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.wrapper{
    .content{
        .el-backtop{
            background-color: #45a2ff;
        }
        .el-backtop, .el-calendar-table td.is-today{
            color: #fff;
        }
    }
    .el-header{
        height: auto;
        padding: 0;
        border-bottom: 1px solid #c6c6c6;
    }
    .el-main{
        padding: 0;
    }
    .el-footer{
        height: auto;
        padding: 0;
        border-top: 1px solid #c6c6c6;
    }
    .footer_position{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
    &::-webkit-scrollbar-track {
        background: #f7f7f7;
    }
    &::-webkit-scrollbar {
        width: 6px;
        background: #ccc;
    }
    &::-webkit-scrollbar-thumb {
        background: #ccc;
    }
}
</style>