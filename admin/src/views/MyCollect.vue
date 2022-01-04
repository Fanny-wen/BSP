<template>
    <div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                model: {}
            }
        },
        methods: {
            async fetch() {
                const res = await this.$http.get(`users/${this.user._id}`)
                console.log(res.data)
                console.log(this.user)
            }
        },
        created() {
            this.fetch()
        },
        computed: {
            ...mapState(['user'])
        }
    }
</script>