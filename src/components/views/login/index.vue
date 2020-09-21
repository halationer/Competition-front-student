<template>
  <div>
  <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
</div>
  <div class="login-container">
    <el-form ref="form" :model="login" label-width="120px">
      <h3 class="login-title">学生端登录</h3>
      <el-form-item label="学号" prop="numId">
        <el-input v-model="login.numId"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="login.password" type="password" show-password auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-button">
          <el-button type="primary" plain @click="loginform">登录</el-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-link>忘记密码？</el-link>
        </div>
        
      </el-form-item>
       <el-form-item>
          
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        imgSrc: require('@/assets/background.jpg'),
        login: {
          numId: '',
          password: ''
        }
      }
    },
    created() {},
    methods: {
      ...mapMutations(['setToken', 'setNumId']),
      loginform() {
        this.axios.post('/student/token', response => {
          if (response.code == 200) {
            this.axios.setToken(response.data)
            this.setToken(response.data)
            this.setNumId(this.login.numId)
            this.$router.replace({
              path: '/'
            })
          } 
        }, this.login)

      }
    }
  }
</script>
<style scoped>
  .background {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
  }

  .login-container {
    background-color: #ffffff;
    border-radius: 10px;
    margin: 180px auto 150px 60%;
    background-clip: padding-box;
    width: 400px;
    border: 1px solid #A9A9A9;
    padding: 35px 100px 20px 20px;
    box-shadow: 0 0 25px #55ffff;
    z-index: 1;
    position: absolute;
    opacity:0.9;
  }

  .login-title {
    margin: 20px auto 30px 180px;
  }

  .login-button {
    margin: 20px auto 5px 80px;
  }
</style>
