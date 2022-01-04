<template>
  <div>
    <el-table :data="books">
      <!-- <el-table-column prop="_id" label="ID" width="230"></el-table-column> -->
      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.cover" :alt="scope.row.name" style="height: 200px">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="书名"></el-table-column>
      <el-table-column prop="category" label="分类"></el-table-column>
      <el-table-column prop="owner.username" label="上传者"></el-table-column>
      <el-table-column prop="cover" label="cover"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="collect(scope.row)" v-show="user._id" >收藏</el-button>
          <el-button type="text" size="small" @click="collect(scope.row)" v-show="user._id" >收藏</el-button>
          <el-button type="text" size="small" @click="$router.push(`/books/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        books: []
      }
    },
    methods: {
      async fetch() {
        const res = await this.$http.get('books')
        this.books = res.data
      },
      async remove(row) {
        this.$confirm(`是否删除"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`books/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
      },
      //收藏按钮
      async collect(row) {
        console.log(row)
        const id = row._id
        // 没有收藏该图书
        if (this.user.collect.indexOf(id) < 0) {
          this.$store.commit('collect',id)
          //调用修改用户信息api
          await this.$http.put(`users/${this.user._id}`, this.user)
        } else {
          const index = this.user.collect.indexOf(id)
          this.$store.commit('defCollect',index)
          //调用修改用户信息api
          await this.$http.put(`users/${this.user._id}`, this.user)
        }
      },
    },
    created() {
      this.fetch()
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>