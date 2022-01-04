<template>
    <div>
        <div class="login-container">
            <el-card header="用户登录" class="login-card">
                <el-form @submit.native.prevent="login">
                    <el-form-item required label="用户名">
                        <el-input v-model="model.username"></el-input>
                    </el-form-item>
                    <el-form-item required label="密码">
                        <el-input type="password" v-model="model.password"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" native-type="submit">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div>
            <el-card class="login-card">
                没有账号？<el-button type="text" @click="$router.push(`/register`)">点击创建</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {}
            }
        },
        methods: {
            async login() {
                const res = await this.$http.post('login', this.model)
                this.$store.commit('login', res.data)
                console.log(res);
                this.$router.push(`/${res.data._id}`)
                this.$message({
                    type: 'success',
                    message: '登录成功!'
                })
            }
        }
    }
</script>
<style>
    .login-card {
        width: 25rem;
        margin: 5rem auto;
    }
</style>