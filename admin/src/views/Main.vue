<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">图书管理</template>
            <el-menu-item index="/books/create">新增图书</el-menu-item>
            <el-menu-item index="/books/list">图书列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">分类管理</template>
            <el-menu-item index="/category/create">新增分类</el-menu-item>
            <el-menu-item index="/category/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>账户管理</template>
          <el-menu-item-group>
            <template slot="title">用户管理</template>
            <el-menu-item index="/users/create">新增用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
            <el-menu-item index="/mycollect">我的收藏</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;position: relative;">
        <img v-show="this.$store.state.user.photo" :src="this.$store.state.user.photo"
          style="height: 3rem;width: 3rem;border-radius: 50%">
        <el-dropdown v-if="this.$store.state.user.photo">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/login`)">去登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      exit() {
        localStorage.clear()
        this.$store.commit('exit')
        this.$router.push('/login')
      }
    },
  };
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>