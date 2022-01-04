<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" style="height: 60px">
        <el-menu-item>个人中心</el-menu-item>
        <el-dropdown style="float: right">
          <el-avatar :src="$store.state.user.photo" v-show="$store.state.user.photo"
            style="margin-top: .5rem;margin-right: 3rem"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/personalcenter/${id}`)"> 个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push(`/collection/${id}`)">我的收藏</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push(`/uploadbook/${id}`)">上传图书</el-dropdown-item>
            <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </el-header>
    <el-main>
      <el-button type="text" @click.native="$router.push(`/${id}`)">返回首页</el-button>
      <el-card class="box-card" style="width: 60%;margin: 0 auto">
        <div slot="header" class="clearfix">
          <span>我的信息</span>
          <el-button style="float: right" type="danger" @click.native="remove" size="mini">注销用户</el-button>
        </div>
        <div>
          <el-form ref="model" :model="model" label-width="10rem">

            <el-form-item label="头像：">
              <el-upload class="avatar-uploader" :auto-upload="false" :action="$http.defaults.baseURL+`/upload`"
                :show-file-list="false" :on-success="afterUpload">
                <img v-if="model.photo" :src="model.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="昵称：">
              <el-input v-model="model.nickname" style="width:26%"></el-input>
            </el-form-item>
            <el-form-item label="用户名：">
              <span style="color: #717171"> {{model.username}}</span>
            </el-form-item>
            <el-form-item label="出生日期：">
              <div class="block">
                <el-date-picker v-model="model.createTime" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <div style="text-align: center">
              <el-button type="primary" @click="save">保存</el-button>
            </div>
          </el-form>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {}
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get(`getPersonalInformation/${this.id}`)
        this.model = res.data
      },
      exit() {
        localStorage.clear()
        this.$store.commit('exit')
        this.$router.push('/')
      },
      async save() {
        await this.$http.put(`updatePersonalInformation/${this.id}`, this.model)
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
      },
      async remove() {
        this.$confirm(`是否删除"${this.$store.state.user.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`deletePerson/${this.id}`)
          this.$message({
            type: 'success',
            message: '成功注销!'
          })
          this.exit()
        })
      },
      afterUpload(res) {
        // this.model.photo = res.user
        this.$set(this.model, 'photo', res.url)
      },
    },
    created() {
      this.fetch()
    }
  }
</script>
<style>
  .el-header {
    padding: 0;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>