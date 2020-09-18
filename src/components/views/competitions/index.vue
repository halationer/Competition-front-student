<template>
<el-row >
  <el-col :span="5" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="@/assets/example.png" class="image">
      <div style="padding: 14px;">
        <span>中国大学生数学建模竞赛</span>
        <div class="bottom clearfix">
          <time class="time">2020.09.01-2020.10.01</time>
          <el-button type="text" class="button" @click="getDetail">查看详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  methods: {
    getDetail() {
      
       this.$router.replace('/detail')
    }
  }
}
</script>
<style scoped>
   .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>