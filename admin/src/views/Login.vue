<template>
  <div class="login-container">
    <el-card header="用户登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名"> 
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"> 
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center"> 
          <el-button type="success" native-type="submit" style="width: 5rem">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>


export default {
  data(){
    return{
      model:{}
    }
  },
  methods:{
    async login(){
      const res = await this.$http.post('login',this.model)
      this.$store.commit('login',res.data.user)
      localStorage.token = res.data.token
      // sessionStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type:'success',
        message:'登录成功'
      })
    }
  }
}
</script>
<style>
  .login-card{
    width:25rem;
    margin:5rem auto;
  }
</style>