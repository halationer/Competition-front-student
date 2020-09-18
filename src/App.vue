<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.avatar-uploader .el-upload{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
