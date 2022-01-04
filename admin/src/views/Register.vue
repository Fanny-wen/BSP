<template>
    <div class="register-container">
        <el-card header="用户注册" class="register-card">
          <el-form @submit.native.prevent="register">
            <el-form-item label="用户名"> 
              <el-input v-model="model.username">
    
              </el-input>
            </el-form-item>
            <el-form-item label="密码"> 
              <el-input type="password" v-model="model.password">
                
              </el-input>
            </el-form-item>
            <el-form-item > 
              <el-button type="primary" native-type="submit">
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
</template>

<script>

</script>

<style>
   .register-contain{
       width:25rem;
       margin:5rem auto;
   }
</style>