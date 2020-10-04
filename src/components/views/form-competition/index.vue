<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-button round @click="back">
          <i class="el-icon-arrow-left el-icon--left" @click="back()"></i>返回
        </el-button>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="title">报名信息填写</div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px">
      <el-divider content-position="left">队伍信息</el-divider>
    <el-row>
      <el-col :span="7" >
          <el-form-item label="队伍名称">
            <el-input v-model="form.team"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="手机号码">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-divider content-position="left">成员信息</el-divider>
        <el-row>
      <el-col :span="7" >
          <el-form-item label="指导教师">
            <el-input v-model="form.teacher"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="队长">
            <el-input v-model="form.caption"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="队员1">
            <el-input v-model="form.student1"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
            <el-row>
      <el-col :span="7" >
          <el-form-item label="队员2">
            <el-input v-model="form.student2"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="队员3">
            <el-input v-model="form.student3"></el-input>
          </el-form-item>
      </el-col>
           <el-col :span="7" :offset="1">
          <el-form-item label="队员4">
            <el-input v-model="form.student4"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
     
     <el-row>
           <el-col :span="7" :offset="10">
            <el-button type="primary">提交报名</el-button>
      </el-col>
    </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  created() {
     
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    back() {
        this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {id: this.id}
      })
    }
  },
};
</script>

<style>
</style>