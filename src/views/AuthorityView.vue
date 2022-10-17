<template>
    <div>
        <el-tree
                ref="treeRef"
                :data="list"
                show-checkbox
                node-key="roleId"
                :default-checked-keys="authority"
                :props="{
                    children: 'roleList',
                    label:'name'
                }"
                :check-strictly='true'
        />
        <el-button @click="changeAuthority">确认修改</el-button>
    </div>
</template>

<script>
    import {reactive, toRefs, onMounted} from 'vue'
    import {useRoute} from 'vue-router'
    import {InitData} from "../type/authority";
    import {getAuthorityList} from "../request/api";

    export default {
        name: "AuthorityView",
        setup() {
            onMounted(() => {
                    getAuthorityList().then((res) => {
                            // console.log(res)
                            data.list = res.data
                        }
                    )
                }
            )
            const route = useRoute()
            const params = route.params //这一步没有收到角色列表中传过来的数据
            // console.log(params)
            const data = reactive(new InitData(params.id, params.authority))
            const changeAuthority = () => {
                console.log(data.treeRef.getCheckedKeys().sort(function (a, b) {
                    return a - b
                }))
                //将数据提交给后台，由后台进行修改
            };

            return {
                ...toRefs(data),
                changeAuthority
            }
        }
    }
</script>

<style scoped>

</style>
