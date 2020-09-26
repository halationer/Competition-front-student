<template>
    <el-button @click="sendMessage">{{mobile}}</el-button>
</template>

<script>
export default {
    data() {
        return {
            mobile: 13315670746
        }
    },
    methods: {
        sendMessage() {
            this.axios.post("https://api.netease.im/sms/sendcode.action",{mobile:this.mobile},res=>{
                console.log(res)
            })
        }
    }
}
</script>