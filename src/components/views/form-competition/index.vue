<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-button round @click="back">
          <i class="el-icon-arrow-left el-icon--left"></i>返回
        </el-button>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="title">报名信息填写</div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="队伍名称">
            <el-input v-model="form.group"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>