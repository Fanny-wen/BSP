<template>
    <el-dropdown style="height: 100vh;width: 100%">
        <el-header>
            <el-menu router class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" style="height: 60px">
                <el-dropdown style="float: right" v-if="user._id">
                    <el-avatar :src="user.photo" v-show="user.photo" style="margin-top: .5rem;margin-right: 3rem">
                    </el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push(`/personalcenter/${user._id}`)"> 个人中心
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push(`/collection/${user._id}`)">我的收藏
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="$router.push(`/uploadbook/${user._id}`)">上传图书
                        </el-dropdown-item>
                        <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu>
        </el-header>
        <el-main>
            <div>
                <el-button v-if="user._id" type="text" @click.native="$router.push(`/${user._id}`)">返回首页</el-button>
                <el-button v-else type="text" @click.native="$router.push(`/`)">返回首页</el-button>
            </div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size: 1.2rem;font-weight:500">{{model.name}}</span>
                    <el-button v-show="this.user._id" style="float: right; padding: 3px 0" type="text"
                        @click.native="collectOrDef">
                        {{isCollect}}
                    </el-button>
                </div>
                <div style="overflow: hidden">
                    <div style="float: left;margin-right: 2rem">
                        <img :src="model.cover" class="image">
                    </div>
                    <div style="padding: 2rem">
                        <div class="text item" v-if="this.model.owner">
                            上传用户：{{ model.owner.username }}
                        </div>
                        <div class="text item">
                            上传时间：{{ model.createTime }}
                        </div>
                        <div class="text item">
                            所属分类：{{ model.category }}
                        </div>
                        <div class="text item">
                            简介：{{ model.body }}
                        </div>
                        <div style="float: right;margin-top:2rem">
                            <el-button type="text" @click.native="openFile">开始阅读</el-button>
                        </div>
                    </div>
                </div>
            </el-card>
        </el-main>
    </el-dropdown>
</template>

<script>
    import { mapState } from 'vuex'
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
                const res = await this.$http.get(`findTheBook/${this.id}`)
                this.model = res.data
                this.model.createTime = this.model.createTime.split('T')[0]
                console.log(this.model)
            },
            //收藏按钮
            async collectOrDef() {
                const id = this.id
                //没有收藏该图书
                if (this.user.collect.indexOf(id) < 0) {
                    this.$store.commit('collect', id)
                    // user.collect.push(id)
                    //调用修改用户信息api
                    await this.$http.put(`updatePersonalInformation/${this.user._id}`, this.user)
                    // this.$router.push(`/collection/${this.user._id}`)
                    this.$message({
                        type: 'success',
                        message: '收藏成功！'
                    })
                } else {
                    const index = this.user.collect.indexOf(id)
                    this.$store.commit('defCollect', index)
                    // user.collect.splice(index, 1)
                    //调用修改用户信息api
                    await this.$http.put(`updatePersonalInformation/${this.user._id}`, this.user)
                    this.$message({
                        type: 'success',
                        message: '取消收藏成功！'
                    })
                }
            },
            async openFile() {
                const url = this.model.content.split('/').pop()
                console.log(url);
                console.log(this.model);
                await this.$http.get(`openFile/${url}`, this.model)
            }
        },
        created() {
            this.fetch()
        },
        computed: {
            ...mapState(['user']),
            // ...mapMutations(['collect', 'defCollect']),
            isCollect() {
                const id = this.id
                if (this.user._id) {
                    if (this.user.collect.indexOf(id) < 0) {
                        return "收藏"
                    } else {
                        return "取消收藏"
                    }
                } else {
                    return ''
                }
            }
        }
    }
</script>

<style scoped>
    .el-header {
        padding: 0;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 2rem;
        margin-left: 5rem
    }

    .image {
        width: 20rem;
        display: block;
        height: 24rem;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .el-card__body {
        overflow: hidden;
    }
</style>