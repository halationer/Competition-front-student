<template>
<div>
    <el-row>
        <el-col :span="8" >
           <el-button round @click="back"><i class="el-icon-arrow-left el-icon--left"></i>返回</el-button>
        </el-col>
        <el-col :span="6" :offset="1">
           <div class="title">中国计算机设计大赛</div>
        </el-col>
        <el-col :span="1" :offset="6">
           <el-button type="primary" round @click="submmit">立即参赛</el-button>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="5" :offset="1">
            <img src="@/assets/example.png" style="width: 300px; height: 300px" class="image">
        </el-col>
        <el-col :span="16" :offset="2"> 
            <div class="texts">
            <div>竞赛类型：一类竞赛</div>
            <el-divider></el-divider>
            <div>竞赛级别：国家级</div>
            <el-divider></el-divider>
            <div>举办单位：教育部计算机委员会</div>
            <el-divider></el-divider>
            <div>开始时间：2020年9月1日</div>
            <el-divider></el-divider>
            <div>结束时间：2020年10月1日</div>
            <el-divider></el-divider>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="16" :offset="1"> 
        详细介绍：
       
        </el-col>
    </el-row>

</div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    back() {
       //this.$router.replace('/competitions')
    }, 
    submmit() {
       // this.$router.replace('/form')
    }
  }
}
</script>
<style >
 .title {
     font-family: "微软雅黑";
     font-size: 30px;
   
 }
 .texts {
     font-family: "微软雅黑";
     font-size: 20px;
     
 }
</style>