<template>
    <div class="verify-body">
        <div v-for="method in methods">
            <div class="divider"></div>
            <div class="method">
                <i :class="method.icon"></i>
                {{method.name}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['type'], //type可以是password\email\tel，表示想要修改哪个字段
    data() {
        return {
            methods: [
                {name:"密码验证", icon:"el-icon-key"},
                {name:"邮箱验证", icon:"el-icon-message"},
                {name:"短信验证", icon:"el-icon-chat-line-round"},
            ]
        }
    },
    methods: {
        verifyPage(method) {
            console.log(method.name)
        }
    }
}
</script>

<style scoped>
    .divider{
        height: 1px;
        background: #b0b0b0;
    }
    .method{
        padding: 10px 0 10px 0;
        text-align: center;
    }
    .method:hover{
        cursor: pointer;
        color: #409EFF;
    }
</style>