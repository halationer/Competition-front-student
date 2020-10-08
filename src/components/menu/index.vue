
<template>
  
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router>

      <el-menu-item index="/competitions">
        <i class="el-icon-menu"></i>
        <span slot="title">竞赛库</span>
      </el-menu-item>

      <el-menu-item index="/my-comp">
        <i class="el-icon-s-home"></i>
        <span slot="title">我的报名</span>
      </el-menu-item>
      
      <el-menu-item index="/my-info">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>

    </el-menu>
 
</template>

<script>
 export default {
    name: 'Menu',
    data() {
      return {
        menus: []
      }
    },
    methods: {
    }
  }
</script>

<style>

</style>
