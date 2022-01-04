<template>
    <el-row>
        <el-col :span="8" v-for="(item, index) in items" :key="index" >
            <el-card shadow="hover" :body-style="{ padding: '.8rem'}" @click.native="$router.push(`/book/${item._id}`)">
                <div style="float: left;width: 7rem;margin-right: .5rem">
                    <img :src="item.cover" class="image">
                </div>
                <div style="float: left;width: 20rem;">
                    <h4>{{item.name}}</h4>
                    <p class="owner">
                        <time class="time" style="margin-right: 1rem">{{item.owner.username}}</time>
                        <time class="time">{{item.createTime}}</time>
                    </p>
                    <p class="intro">
                        <time class="time">{{item.body}}</time>
                    </p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: 'BookCard',
        props: ['items']
    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .image {
        width: 100%;
        height: 8rem
    }

    .intro {
        width: 22rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        /* -o-text-overflow: ellipsis; */
    }

    .el-card:hover {
        cursor: pointer;
    }

    .el-card{
        margin-top: 2rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
    }
</style>