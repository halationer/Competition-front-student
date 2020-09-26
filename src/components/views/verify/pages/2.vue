<template>
<div class="body">
    <el-steps :active="step" align-center>
        <el-step title="身份验证" icon="el-icon-lock"></el-step>
        <el-step title="修改信息" icon="el-icon-edit"></el-step>
        <el-step title="修改完成" icon="el-icon-finished"></el-step>
    </el-steps>
    <el-form :model="request" label-width="80px" :rules="rules" ref="request">

        <div  v-if="type==='password'">
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="request.newPassword" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="request.checkPassword" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
        </div>

        <div  v-if="type==='email'">
            <el-input class="none-form-item"></el-input>
            <el-form-item label="新邮箱" prop="newEmail">
                <el-input v-model="request.newEmail" placeholder="请输入新邮箱"></el-input>
            </el-form-item>
        </div>

        <div v-if="type==='tel'">
            <el-form-item label="新手机" prop="newTel">
                <el-input v-model="request.newTel" placeholder="请输入新手机"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input class="vcode" v-model="request.verifyCode" placeholder="请输入短信验证码"></el-input>
                <el-button>发送验证码</el-button>
            </el-form-item>
        </div>
        
        <el-button @click="next[type]" class="submit" size="mini" type="primary">提交修改</el-button>
    </el-form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            step: 1,
            request: {
                token: null,
                newPassword: null,
                checkPassword: null,
                newEmail: null,
                newTel: null,
                verifyCode: null,
            },
            next: {
                password: this.changePassword,
                email: this.changeEmail,
                tel: this.changeTel,
            },
            rules: {
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                ],
                checkPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: this.samePassword, trigger: 'blur' },
                ],
                newEmail: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                newTel: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
                    {
                        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: "请输入正确的手机号码",
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    computed: {
        type() {return this.$route.query.type},
        ...mapGetters(['getNumId']),
    },
    methods: {
        sendEmail() {
            this.axios.post("student/checkEmail",()=>{},this.request)
        },
        samePassword(rule, value, callback) {
            if(this.request.newPassword === this.request.checkPassword)
                callback()
            else callback(new Error('请输入与新密码相同的密码'))
        },
        rightPassword(rule, value, callback) {
            this.axios.simplePost("student/checkPassword", this.request, {
                _200:res=>{callback()},
                _500:res=>{callback(new Error(res.message))}
            })
        },
        changePassword() {
            this.$refs['request'].validate((valid) => {
                if(valid) {
                    this.axios.post("student/token-changePassword", res=>{
                        this.$router.push({
                            path: 'change-success',
                        })
                    }, this.request)
                } else return false
            })
        },
        changeEmail() {
            this.$refs['request'].validate((valid) => {
                if(valid) {
                    this.axios.post("student/token-changeEmail", res=>{
                        this.$message.success(res.data + " " + res.message)
                        // this.$router.push({
                        //     path: 'verify-success',
                        // })
                    }, this.request)
                } else return false
            })
        },
        changeTel() {
            this.$refs['request'].validate((valid) => {
                if(valid) {
                    this.axios.post("student/token-changeTel", res=>{
                        this.$router.push({
                            path: 'change-success',
                        })
                    }, this.request)
                } else return false
            })
        },
    },
    created() {
        this.request.token = this.$route.query.token
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
.none-form-item{
    display: none;
}
</style>