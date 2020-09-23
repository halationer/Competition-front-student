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
                    <span class="photo-title">照片</span>
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
                        drag
                        :auto-upload="false"
                        action="#"
                        class="avatar-uploader"
                        :on-change="photoChange"
                        :show-file-list="false">
                            <img v-if="student.photo" :src="student.photo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                    <el-button @click="updatePhoto" v-if="upload.file" size="mini" type="primary" plain>上传</el-button>
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
import { mapGetters } from 'vuex'
export default {
    components: {
        Verify: ()=>import('@/components/views/verify'),
    },
    data() {
        return {
            student: {
                numId: null,
                name: null,
                tel: null,
                email: null,
                gender: null,
                birthday: null,
                academy: null,
                major: null,
                grade: null,
                className: null,
                photo: null,
            },
            upload: {
                file: null,
            },
            verify: {
                show: false,
                type: null,
            }
        }
    },
    computed: {
        ...mapGetters(['getNumId']),
    },
    methods: {
        getInfo(){
            this.axios.simplePost("student/information", {numId: this.getNumId},{
                _200:res=>{this.student = res.data}
            })
        },
        change(type) {
            this.verify.type = type
            this.verify.show = true
        },
        changeEmail() { this.change("email") },
        changeTel() { this.change("tel") },
        changePassword() { this.change("password") },
        //图片改变时
        photoChange(file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            const isBMP = file.raw.type === 'image/bmp'
            const isLt10M = file.raw.size / 1024 / 1024 < 10
            if(!isLt10M) {
                this.$message.error("图片不能大于10M")
                return
            }
            if(!isJPG && !isPNG && !isBMP) {
                this.$message.error("图片只能上传jpg/bmp/png格式")
                return
            }
            this.upload.file = file
            this.student.photo = URL.createObjectURL(file.raw)
        },
        updatePhoto() {
            this.axios.post("student/update-photo", res=>{
                this.student = res.data
                this.upload.file = null
            }, {id: this.student.id, file: this.upload.file.raw})
        }
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
        opacity: 0.6;
    }
    .el-button:hover{
        opacity: 1;
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
    .photo-title:after{
        content: '(jpg/png/bmp)';
        color: lightslategrey;
        font-size: 10px;
    }
</style>