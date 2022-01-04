<template>
  <div>
    <el-table :data="users">
      <!-- <el-table-column prop="_id" label="ID" width="230"></el-table-column> -->
      <el-table-column prop="photo" label="头像" >
        <template slot-scope="scope">
          <img :src="scope.row.photo" :alt="scope.row.username" style="height: 200px">
        </template>  
      </el-table-column>
      <el-table-column prop="username" label="名称" ></el-table-column>
      <el-table-column prop="_id" label="_id" ></el-table-column>
      <el-table-column prop="photo" label="_id" ></el-table-column>
      <el-table-column prop="password" label="名称" ></el-table-column>
      <el-table-column fixed="right" label="操作"  width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/users/edit/${scope.row._id}`)">编辑</el-button>
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
        users:[]
      }
    },
    methods:{
     async fetch(){
       const res = await this.$http.get('users')
       this.users = res.data
       console.log(res.data)
     },
     async remove(row){
        this.$confirm(`是否删除"${row.username}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`users/${row._id}`)
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