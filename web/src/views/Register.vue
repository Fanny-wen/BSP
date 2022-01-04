<template>
    <div>
        <div class="register-container">
            <el-card header="用户注册" class="register-card">
                <el-form @submit.native.prevent="register">
                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+`/upload`"
                            :show-file-list="false" :on-success="afterUpload">
                            <img v-if="model.photo" :src="model.photo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item required label="用户名">
                        <el-input v-model="model.username"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="model.nickname"></el-input>
                    </el-form-item>
                    <el-form-item required label="密码">
                        <el-input type="password" v-model="model.password"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align: center">
                        <el-button type="primary" native-type="submit">
                            注册
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div>
            <el-card class="login-card">
                已有账号？<el-button type="text" @click="$router.push(`/login`)">点击登录</el-button>
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
            async register() {
                await this.$http.post('register', this.model)
                this.$message({
                    type: 'success',
                    message: '注册成功！'
                })
                this.$router.push('/login')
            },
            afterUpload(res) {
                this.$set(this.model, 'photo', res.url)
            }
        },
    }
</script>

<style>
    .register-card {
        width: 25rem;
        margin: 5rem auto;
    }
</style>