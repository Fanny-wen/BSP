<template>
    <div class="BookEdit">
        <h1>{{id?'编辑':'新建'}}图书</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="model.category" placeholder="请选择所属分类">
                    <el-option v-for="(category,index) in categories" :key="index" :label="category.name"
                        :value="category.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="model.body"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+`/upload`" :show-file-list="false"
                    :on-success="afterUpload" >
                    <img v-if="model.cover" :src="model.cover" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传文件">
                <el-upload class="upload-demo" :action="$http.defaults.baseURL+`/uploads`"
                    :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" 
                    :file-list="fileList" :on-success="afterUploadFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                categories: [],
                fileList: []
            }
        },
        methods: {
            async save() {
                if (this.id) {
                    //修改
                    await this.$http.put(`books/${this.id}`, this.model)
                } else {
                    //新增
                    this.model.owner = this.$store.state.user
                    const res = await this.$http.post('books', this.model)
                    console.log(res)
                }

                this.$router.push('/books/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                //BookList=>编辑
                const res = await this.$http.get(`books/${this.id}`)
                this.model = res.data
            },
            async getAllCategory() {
                const res = await this.$http.get('categories')
                this.categories = res.data
                console.log(this.categories)
            },
            afterUpload(res) {
                this.$set(this.model, 'cover', res.url)
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove(){
                this.fileList = []
            },
            afterUploadFile(res){
                this.fileList.push(res.url)
                this.$set(this.model, 'downloadUrl', res.url)
            }
        },
        created() {
            this.id && this.fetch()
            this.getAllCategory()
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