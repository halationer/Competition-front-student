<template>
  <el-container class="wrap">
    <el-header class="header">
      <el-row>
        <el-col :span="8" :offset="8">燕山大学竞赛管理系统</el-col>
        <el-col :span="6" :offset="2">
          <el-dropdown split-button type="primary" @command="handleCommand">
            {{name}}
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Personal">个人设置</el-dropdown-item>
              <el-dropdown-item command="Loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="left">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '@/components/menu'
import { mapMutations,mapGetters} from 'vuex'
export default {
    name: 'Index',
    data() {
        return {
          name: ''
        }
    },
    components: {
        Menu
    },
    computed: {
       ...mapGetters(['getNumId'])

     },
    created() {
        this.axios.simplePost("student/information", {numId: this.getNumId}, {
            _200:res=>{this.name = res.data.name}
        })
    },
    methods: {
      ...mapMutations(['setToken','setNumId']),
      loginout() {
         this.axios.post('/student/logout',response =>{
           this.axios.setToken(null)
           this.setToken(null)
           this.setNumId(null)
           this.$router.push({
             path: '/login'
           })
         })

      },
      handleCommand(command) {
        if(command === 'Loginout'){
          this.loginout()
          this.$message('退出登录成功')
        }
        if(command === 'Personal') {
          this.$router.push({
            path: 'my-info'
          })
        }
      }
    }
}
</script>
<style scoped>
  .wrap {
    height: 100vh;
  }

  .header {
    border-bottom: 1px solid #919191;
    line-height: 60px;
    font-size: 1.5rem;
    font-weight: bold;
    color: azure;
    background-color: skyblue;
    text-align: center;
  }

  .left {
    border-right: 1px solid #919191;
    overflow-x: hidden;
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown+.el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
