<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="roleId" label="ID" width="180"/>
                <el-table-column prop="roleName" label="角色名" width="180"/>
                <el-table-column prop="authority" label="操作">
                    <template #default="scope">
                        <el-button
                                link
                                size="small"
                                @click="changeRole(scope.row)"
                        >
                            修改权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>

<script>
    import {onMounted, reactive, toRefs} from 'vue'
    import {getRoleList} from "../request/api";
    import {InitData} from "../type/role";
    import { ElMessage, ElMessageBox } from 'element-plus'
    import {useRouter} from 'vue-router'
    export default {
        name: "RoleView",
        setup() {
            const router = useRouter()
            const data = reactive(new InitData())
            onMounted(() => {
                    getRoleList().then((res) => {
                        data.list = res.data
                        }
                    )
                }
            )
            const addRole = ()=>{
                ElMessageBox.prompt('请输入角色名称', '添加', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
                    .then(({ value }) => { //value为输入框中输入的值
                        if (value) {
                            //判断输入框中是否有值
                            data.list.push({roleId:data.list.length+1,roleName:value,authority:[]})
                        }
                        ElMessage({
                            type: `success`,
                            message: `${value}角色添加成功！`,
                        })
                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '取消操作！',
                        })
                    })
            };
                const changeRole = (row)=>{
                    router.push({
                        name:'authority',
                        params:{
                            id: row.roleId,
                            authority: row.authority
                        }
                    })
                };

            return {
                ...toRefs(data),
                addRole,
                changeRole
            }
        }
    }
</script>

<style scoped>

</style>
