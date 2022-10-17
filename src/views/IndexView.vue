<template>
    <div>
        <el-container>
            <el-header class='el-header'>
                <el-row :gutter="20">
                    <el-col :span="4"><img src="../assets/logo.png" class="logo"></el-col>
                    <el-col :span="16"><h2>掌控一切有限公司后台管理系统</h2></el-col>
                    <el-col :span="4"><span class="quit-login">
                        <el-button @click="delToken">
                            退出登录
                        </el-button>
                    </span></el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="350px">
                    <el-col :span="12">
                        <el-menu
                                active-text-color="#ffd04b"
                                background-color="#545c64"
                                class="el-menu-vertical-demo"
                                :default-active="active"
                                text-color="#fff"
                                router
                        >
                            <!--                        router开启路由模式，可以通过标签里面的el-menu-item index来进行跳转-->
                            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
                                <span>{{item.meta.title}}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {useRouter,useRoute} from 'vue-router'

    export default {
        name: "HomeView",
        setup() {
            const route = useRoute()
            const router = useRouter()
            // console.log(router.getRoutes())
            const list = router.getRoutes().filter(v => v.meta.isShow)
            const delToken = ()=>{
              localStorage.removeItem('token')
                router.push('/login')
            };

            // console.log(list)
            return {
                list,
                active:route.path,
                delToken
            }
        },
        components: {}

    }
</script>

<style scoped lang='scss'>
    .el-header {
        height: 80px;
        background-color: gray;

        .logo {
            height: 80px;
        }

        h2, .quit-login {
            text-align: center;
            height: 80px;
            line-height: 80px;
            color: white;
        }
    }

    .el-aside {
        .el-menu {
            height: calc(100vh - 80px);
        }
    }
</style>
