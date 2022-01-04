<template>
  <div>
    <el-table :data="categories">
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="_id" label="_id" ></el-table-column>
      <el-table-column fixed="right" label="操作"  width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/category/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  export default{
    data(){
      return{
        categories:[]
      }
    },
    methods:{
     async fetch(){
       const res = await this.$http.get('categories')
       this.categories = res.data
       console.log(res.data)
     },
     async remove(row){
        this.$confirm(`是否删除"${row.name}"分类`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`categories/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        })
      },
    },
    created(){
      this.fetch()
    }
  }
</script>