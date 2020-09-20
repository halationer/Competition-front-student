<template>
<div class="body">
    <el-steps :active="step" align-center>
        <el-step title="身份验证" icon="el-icon-lock" v-if="method!=='password'"></el-step>
        <el-step title="修改信息" icon="el-icon-edit"></el-step>
        <el-step title="修改完成" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-form :model="request" label-width="80px">
        <div  v-if="method==='password'">
            <el-form-item label="旧密码">
                <el-input v-model="request.oldPassword" placeholder="请输入当前密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" v-if="type==='password'">
                <el-input v-model="request.newPassword" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" v-if="type==='password'">
                <el-input v-model="request.checkPassword" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
        </div>

        <div v-if="method==='email'">
            <el-form-item>
                <h3 class="email-tip">您当前绑定的邮箱是{{request.to}}，点击</h3>
                <el-button @click="sendEmail" class="email" size="mini" type="primary">发送邮件</el-button>
                <h3 class="email-tip">以验证身份信息</h3>
            </el-form-item>
        </div>

        <div v-if="method==='tel'">
            <el-form-item>
                <h3 class="tel-tip">您当前的手机号是：</h3>
                <el-input class="tel" v-model="request.tel" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-input class="vcode" v-model="request.verifyCode" placeholder="请输入短信验证码"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
        </div>
        
        <el-button @click="" class="submit" size="mini" type="primary" v-if="method!=='email'">下一步</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            step: 0,
            check: {
                checkPassword: null,
            },
            request: {
                stuId: 1,
                oldPassword: null,
                to: '1124792103@qq.com',
                tel: 66666666,
                verifyCode: null,
                newPassword: null,
            },
        }
    },
    computed: {
        method() {return this.$route.query.method},
        type() {return this.$route.query.type},
    },
    methods: {
        sendEmail() {
            this.axios.post("stu/email-check",()=>{},this.request)
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
.el-form{
    margin-top: 50px;
    width: 90%;
    position: relative;
}
.submit{
    position: absolute;
    right: 0;
}
.email-tip, .tel-tip{
    display: inline-block;
}
.tel{
    width: calc(100% - 155px);
}
.vcode{
    width: calc(100% - 118px);
}
</style>