<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b" style="height: 60px">
        <el-menu-item>我的收藏</el-menu-item>
        <el-dropdown style="float: right">
          <el-avatar :src="this.$store.state.user.photo" v-show="this.$store.state.user.photo"
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
      <el-tabs :value="activeName" @tab-click="tabClick">
        <el-tab-pane label="全部图书" name="全部图书">
          <BookCard :items="model"></BookCard>
        </el-tab-pane>
        <el-tab-pane v-for="(category,index) in categories" :key="index" :label="category.name" :name="category.name">
          <BookCard :items="categoryModel"></BookCard>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  import BookCard from '../components/BookCard.vue'
  export default {
    props: {
      id: {}
    },
    components: {
      BookCard
    },
    data() {
      return {
        model: [],
        activeName: '全部图书',
        categories: [],
      }
    },
    methods: {
      //store
      async fetch() {
        const res = await this.$http.get(`getPersonalInformation/${this.id}`)
        this.model = res.data.collect
      },
      exit() {
        localStorage.clear()
        this.$store.commit('exit')
        this.$router.push('/')
      },
      async getAllCategory() {
        const res = await this.$http.get('getAllCategory')
        this.categories = res.data
      },
      tabClick(tab) {
        this.activeName = tab.name
      }
    },
    created() {
      this.fetch()
      this.getAllCategory()
    },
    computed: {
      categoryModel() {
        return this.model.filter((item) => {
          return item.category == this.activeName
        })
      }
    }
  }
</script>
<style>
  .el-header {
    padding: 0;
  }
</style>