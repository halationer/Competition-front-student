<template>
<div>
    <el-row>
        <el-col :span="7" >
           <el-button round @click="back"><i class="el-icon-arrow-left el-icon--left"></i>返回</el-button>
        </el-col>
        <el-col :span="8" :offset="1">
           <div class="title">{{ item.name }}</div>
        </el-col>
        <el-col :span="1" :offset="4">
           <el-button type="primary" round @click="submmit">立即参赛</el-button>
        </el-col>
    </el-row>
     <el-divider content-position="left">简要介绍</el-divider>
    <el-row>
        <el-col :span="4" :offset="4">
            <img :src="item.image" style="width: 280px; height: 320px" class="image">
        </el-col>
        <el-col :span="10" :offset="2"> 
            <div class="texts">
            <el-divider content-position="left">竞赛类型</el-divider>
            <div>{{item.typeName}}</div>
            <el-divider content-position="left">竞赛级别</el-divider>
            <div>{{item.levelName}}</div>
            <el-divider content-position="left">开始时间</el-divider>
            <div>{{item.startTime}}</div>
            <el-divider content-position="left">结束时间</el-divider>
            <div>{{item.endTime}}</div>
    
            </div>
        </el-col>
    </el-row>
    <el-divider content-position="left">详细介绍</el-divider>
    <el-row>
        <el-col :span="16" :offset="4"> 
            <div class="detail">
        {{item.detail}}
       </div>
        </el-col>
    </el-row>

</div>
</template>

<script>
export default {
  data() {
    return {
      item: {
          name:'',
          startTime:'',
          endTime:'',
      },
      id: this.$route.params.id
    }
  },
  created() {
     this.axios.get('/competition/getById',res=>{
         this.item = res.data[0]
     },
     { id: this.id }
     )
  },
  methods: {
    back() {
       this.$router.push('/competitions')
    }, 
    submmit() {
        this.$router.replace('/form')
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
     text-align: center;
 }
 .detail{
      font-family: "微软雅黑";
     font-size: 20px;
 }
</style>