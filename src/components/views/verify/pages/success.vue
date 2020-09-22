<template>
    <div class="body">
        <el-steps :active="step" align-center>
            <el-step title="身份验证" icon="el-icon-lock" v-if="method!=='password'"></el-step>
            <el-step title="修改信息" icon="el-icon-edit"></el-step>
            <el-step title="修改完成" icon="el-icon-finished"></el-step>
        </el-steps>
        <el-button @click="back">返回个人信息界面</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: this.method==='password' ? 1:2,
        }
    },
    computed: {
        method() {return this.$route.query.method},
    },
    methods: {
        back() {
            this.$router.push({
                path: 'my-info'
            })
        }
    }
}
</script>

<style scoped>
.body{
    width: 90%;
    min-width: 715px;
    margin: 15px 5% 40px 5%;
}
</style>