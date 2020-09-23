<template>
    <div class="body">
        <el-steps :active="step" align-center>
            <el-step title="身份验证" icon="el-icon-lock"></el-step>
            <el-step title="修改信息" icon="el-icon-edit"></el-step>
            <el-step title="修改完成" icon="el-icon-finished"></el-step>
        </el-steps>
        {{message}}
        <el-button @click="back">返回个人信息界面</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 2,
            message: null,
        }
    },
    computed: {
        emailToken() {return this.$route.query.token},
    },
    methods: {
        saveEmail() {
            this.axios.simplePost("student/saveEmail", {emailToken:this.emailToken}, {
                _200:res=>{this.message = res.message},
                _500:res=>{this.message = res.message}
            })
        },
        back() {
            this.$router.push({
                path: 'my-info'
            })
        }
    },
    created() {
        if(this.emailToken != null)
            this.saveEmail()
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