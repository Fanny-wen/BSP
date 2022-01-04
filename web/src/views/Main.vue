<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item>图书中心</el-menu-item>
        <el-dropdown style="float: right" v-if="user._id">
          <el-avatar :src="user.photo" v-show="user.photo" style="margin-top: .5rem;margin-right: 3rem"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/personalcenter/${user._id}`)"> 个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push(`/collection/${user._id}`)">我的收藏</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push(`/uploadbook/${user._id}`)">上传图书</el-dropdown-item>
            <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown style="float: right;line-height: 4rem" v-else>
          <i class="el-icon-setting" style="margin-right: 15px;color: #fff;margin-right: 3rem"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push(`/login`)">去登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu>
    </el-header>
    <el-main>
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
  import { mapState } from 'vuex'
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
        categories: []
      }
    },
    methods: {
      //store
      async fetch() {
        const res = await this.$http.get('findAllBooks')
        this.model = res.data
        this.model.map((item) => {
          item.createTime = item.createTime.split('T')[0]
        })
        // console.log(this.model)
      },
      //store
      async getAllCategory() {
        const res = await this.$http.get('getAllCategory')
        this.categories = res.data
      },
      //store
      exit() {
        localStorage.clear()
        this.$store.commit('exit')
        this.$router.push('/')
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
      ...mapState(['user']),
      categoryModel() {
        return this.model.filter((item) => {
          return item.category == this.activeName
        })
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #606266;
  }

  .el-header {
    padding: 0;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>