<template>
    <div class="login-box">
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="80px"
                class="demo-ruleForm"
        >
            <h2>后台管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"  autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button class = 'loginBtn' type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button class = 'loginBtn' @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang = 'ts'>
    import {defineComponent,reactive,toRefs,ref} from 'vue'
    import {LoginData} from "@/type/login";
    import type { FormInstance } from 'element-plus'
    import {login} from "@/request/api";
    import {useRouter} from "vue-router";

    export default  defineComponent({
        setup(){
            const data = reactive(new LoginData())
            const rules = {
                username:[
                    { required: true, message: '请输入您的用户名！', trigger: 'blur' },
                    { min: 3, max: 10, message: '用户名长度在3-10之间', trigger: 'blur' },
                ],
                    password:[
                    { required: true, message: '请输入您的密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '密码长度在6-16之间', trigger: 'blur' },
                ]
            }
            //登录
            const ruleFormRef = ref<FormInstance>()
            const router = useRouter()
            const submitForm = (formEl: FormInstance | undefined) => {
                if (!formEl) return
                //对表单中的内容进行验证
                //valid为布尔类型，为true时表示验证成功
                formEl.validate((valid) => {
                    if (valid) {
                        // console.log('submit!')
                        login(data.ruleForm).then((res)=>{
                                //成功时回调
                                //        console.log(res)
                                //将token进行保存
                                localStorage.setItem('token',res.data.token)
                                //跳转页面到首页
                                router.push('/index')
                            },(res)=>{
                                // console.log(e)
                                localStorage.setItem('token',res.data.token)
                                //跳转页面到首页
                                router.push('/index')
                            }

                        )

                    } else {
                        console.log('提交错误！')
                        return false
                    }
                })
            }
            //重置.
            const resetForm = ()=>{
              data.ruleForm.username = ""
              data.ruleForm.password = ""
            };

            return {
                ...toRefs(data),
                rules,
                ruleFormRef,
                resetForm,
                submitForm
            }
        }
    })
</script>

<style scoped lang = 'scss'>
    .login-box{
        width: 100%;
        height: 100%;
        background: url("../assets/login.jpg");
        padding: 1px;
        text-align: center;
        .demo-ruleForm{
            width: 500px;
            margin: 200px auto;
            background-color: white;
            padding: 30px;
            border-radius: 40px;
            .loginBtn{
            width: 48%;
        }
            h2{
                padding-bottom: 8px;
            }
        }
    }
</style>

