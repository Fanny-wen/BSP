<template>
    <el-container style="height: 100vh">
        <el-header>
            <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" style="height: 60px">
                <el-menu-item>图书上传</el-menu-item>
                <el-dropdown style="float: right">
                    <el-avatar :src="this.$store.state.user.photo" v-show="this.$store.state.user.photo"
                        style="margin-top: .5rem;margin-right: 3rem"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push(`/personalcenter/${id}`)"> 个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push(`/collection/${id}`)">我的收藏</el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push(`/uploadbook/${id}`)">上传图书
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu>
        </el-header>
        <el-main>
            <el-button type="text" @click.native="$router.push(`/${id}`)">返回首页</el-button>
            <el-card class="box-card" style="width: 60%;margin: 0 auto">
                <div slot="header" class="clearfix">
                    <span>上传图书</span>
                </div>
                <div>
                    <el-form ref="model" :model="model" label-width="10rem">
                        <el-form-item label="图书封面：">
                            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+`/upload`"
                                :show-file-list="false" :on-success="afterUpload">
                                <img v-if="model.cover" :src="model.cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="图书名称：">
                            <el-input v-model="model.name" style="width:26%"></el-input>
                        </el-form-item>
                        <el-form-item label="所属分类：">
                            <el-select v-model="model.category" placeholder="请选择所属分类">
                                <el-option v-for="(category,index) in categories" :key="index" :label="category.name"
                                    :value="category.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="简介：">
                            <el-input type="textarea" v-model="model.body"></el-input>
                        </el-form-item>
                        <el-form-item label="附件：">
                            <el-upload class="upload-demo" :action="$http.defaults.baseURL+`/upload`"
                                :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :file-list="fileList"
                                :on-success="afterUploadFile">
                                <el-button size="small" type="primary">选择文件</el-button>
                            </el-upload>
                        </el-form-item>
                        <div style="text-align: center">
                            <el-button type="primary" @click="save">上传</el-button>
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
                model: {},
                categories: [],
                fileList: []
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get('getAllCategory')
                this.categories = res.data
            },
            async save() {
                this.model.owner = this.$store.state.user
                await this.$http.post('uploadBook', this.model)
                this.$router.push(`/${this.id}`)
                this.$message({
                    type: 'success',
                    message: '上传成功！'
                })
            },
            exit() {
                localStorage.clear()
                this.$store.commit('exit')
                this.$router.push('/')
            },
            afterUpload(res) {
                this.$set(this.model, 'cover', res.url)
            },
            afterUploadFile(res) {
                this.fileList.push(res.url)
                this.$set(this.model, 'content', res.url)
            },

            beforeRemove(file) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleRemove() {
                this.fileList = []
            },
        },
        created() {
            this.fetch()
        }
    }
</script>