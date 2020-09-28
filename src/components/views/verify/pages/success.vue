<template>
    <div class="body">
        <el-steps :active="step" align-center>
            <el-step title="身份验证" icon="el-icon-lock"></el-step>
            <el-step title="修改信息" icon="el-icon-edit"></el-step>
            <el-step title="修改完成" icon="el-icon-finished" v-if="type==='success'"></el-step>
            <el-step title="修改失败" icon="el-icon-warning" v-if="type==='warning'"></el-step>
        </el-steps>
        <div class="success-main">
            <div :class="type">
                <div class="message">{{message}}</div>
                <el-button @click="back" :type="type" size="mini">返回个人信息界面</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 2,
            message: '修改成功',
            type: 'success',
        }
    },
    computed: {
        emailToken() {return this.$route.query.token},
    },
    methods: {
        saveEmail() {
            this.axios.simplePost("student/saveEmail", {emailToken:this.emailToken}, {
                _200:res=>{
                    this.message = res.message
                    this.type = 'success'
                },
                _500:res=>{
                    this.message = res.message
                    this.type = 'warning'
                }
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
    height: calc(100% - 55px);
    min-width: 715px;
    margin: 15px 5% 40px 5%;
}
.success-main{
    height: 100%;
    display: flex;
    flex-direction: column;
}
.success-main>div{
    margin: auto;
    margin-top: 2em;
    width: 80%;
    border-radius: 10px;
    padding: 5px;
}
.success-main>.success{
    background-color: rgb(143, 255, 149);
    border: 2px solid rgb(14, 117, 20) 
}
.success-main>.warning{
    background-color: rgb(255, 216, 143);
    border: 2px solid rgb(184, 129, 27); 
}
.success-main .message{
    margin-bottom: 10px;
    width: 100%;
}
.success-main .el-button{
    float: right;
}
</style>