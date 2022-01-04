<template>
    <div class="UserEdit">
        <h1>{{id?'编辑':'新增'}}分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        props:{
            id:{}
        },
        data(){
            return{
                model:{}
            }
        },
        methods:{
            async save(){
                let res
                if(this.id){
                    //修改
                    await this.$http.put(`categories/${this.id}`,this.model)
                }else{
                    //新增
                    await this.$http.post('categories',this.model)
                }
                console.log(res)
                this.$router.push('/category/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            //
            async fetch(){
                //BookList=>编辑
                const res = await this.$http.get(`categories/${this.id}`)
                this.model = res.data
                console.log(this.model)
            },
        }, 
        created(){
            this.id && this.fetch()
        }
    }
</script>

<style>
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