<template>
<div class="body">
    <h1>个人信息</h1>
    <div class="split"></div>
    <div class="wrap">
        <div class="table">
            <el-row>
                <el-col :span="20">
                    <span>基本信息</span>
                    <el-button size="mini" type="primary" plain @click="changePassword">修改密码</el-button>
                </el-col>
                <el-col :span="4">
                    <span>照片</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">姓名</el-col>
                <el-col :span="7">{{student.name}}</el-col>
                <el-col :span="3">性别</el-col>
                <el-col :span="7">{{student.gender?"男":"女"}}</el-col>
                <el-col :span="4" class="img-col">
                    <div class="img">
                        <el-upload
                        :auto-upload="false"
                        action="#"
                        class="avatar-uploader"
                        :show-file-list="false">
                            <img v-if="student.photo" :src="student.photo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <el-button v-if="upload.url" size="mini" type="primary" plain>上传</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学号</el-col>
                <el-col :span="7">{{student.numId}}</el-col>
                <el-col :span="3">出生日期</el-col>
                <el-col :span="7">{{student.birthday}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="3">学院</el-col>
                <el-col :span="7">{{student.academy}}</el-col>
                <el-col :span="3">专业班级</el-col>
                <el-col :span="7">{{student.major+student.grade}}-{{student.className}}班</el-col>
            </el-row>
            <el-row>
                <el-col :span="3">邮箱</el-col>
                <el-col :span="7">
                    <span>{{student.email}}</span>
                    <el-button size="mini" type="primary" plain @click="changeEmail">修改</el-button>
                </el-col>
                <el-col :span="3">手机</el-col>
                <el-col :span="7">
                    <span>{{student.tel}}</span>
                    <el-button size="mini" type="primary" plain @click="changeTel">修改</el-button>
                </el-col>
            </el-row>
        </div>
    </div>

    <el-drawer
    :visible.sync="verify.show"
    :withHeader="false"
    size="203"
    direction="btt">
        <h3 class="verify-tip">选择验证方式</h3>
        <Verify v-if="verify.show" :type="verify.type"></Verify>
    </el-drawer>
</div>
</template>

<script>
export default {
    components: {
        Verify: ()=>import('@/components/views/verify'),
    },
    data() {
        return {
            student: {
                numId: "1111111111111",
                name: "温宇东",
                tel: "13355558888",
                email: "xxxxxxx@xx.xx",
                gender: 1,
                birthday: "yyyy-MM-dd",
                academy: "信息科学与工程学院",
                major: "软件工程",
                grade: 17,
                className: 8,
                photo: "http://39.99.247.252:8080/group1/M00/00/00/J2P3_F9iLiiAVnjFAAYoxAJUXRw347.png",
            },
            upload: {
                url: null,
            },
            verify: {
                show: false,
                type: null,
            }
        }
    },
    computed: {
        id() {return 1},
    },
    methods: {
        getInfo(){
            this.axios.get("stu/info", res=>{
                this.student = res.data
            }, {id: this.id})
        },
        change(type) {
            this.verify.type = type
            this.verify.show = true
        },
        changeEmail() { this.change("email") },
        changeTel() { this.change("tel") },
        changePassword() { this.change("password") },
    },
    created() {
        this.getInfo()
    }
}
</script>

<style scoped>
    .verify-tip{
        margin-left: 10px;
        margin-top: 14px;
        margin-bottom: 5px;
    }
    .body{
        width: 90%;
        min-width: 715px;
        margin: 15px 5% 40px 5%;
    }
    .wrap{
        border: 5px solid #C1D1DB;
        border-radius: 8px;
    }
    .table{
        margin: 3px;
    }
    .img{
        width: 100%;
        height: 400%;
        box-sizing: border-box;
    }
    .el-col{
        height: 45px;
        line-height: 45px;
        padding-left: 1em;
        position: relative;
        z-index: 99;
    }
    .el-col:hover{
        background: #e8eef7;
    }
    .el-col, .img{
        border: 1px solid #C1D1DB;
        background: #f2f6fb;
    }
    .img-col{
        border: none;
        padding: 0;
    }
    .img-col:hover{
        background: #f2f6fb;
    }
    .el-button{
        position: absolute;
        right: 5px;
        top: 9px;
    }
    .split{
        width: 100%;
        height: 1px;
        background: #C1D1DB;
        margin: 10px 0 20px 0;
    }

    .avatar-uploader{
        width: 100%;
        height: 100%;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        max-height: 100%;
        max-width: 100%;
        margin: auto;
    }
</style>