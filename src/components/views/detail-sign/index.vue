<template>
<div>
    <el-row>
        <el-col :span="7" >
           <el-button round @click="back()"><i class="el-icon-arrow-left el-icon--left"></i>返回</el-button>
        </el-col>
        <el-col :span="8" :offset="1">
           <div class="title">{{this.request.teamName}}</div>
        </el-col>
        <el-col :span="1" :offset="4">
           <el-button  type="primary" v-if="this.verifyFlag" round @click="update()" :disabled="!disable"> 修改报名表</el-button>
        </el-col>
    </el-row>
     <el-divider content-position="left">{{this.request.compName}}</el-divider>
    <el-row>
      <el-col :span="8">竞赛类型：{{this.request.typeName}}</el-col>
      <el-col :span="8">审核状态：
            <i class="el-icon-success" v-if="this.request.verify===1">{{this.request.verifyName}}</i>
            <i class="el-icon-error" v-if="this.request.verify===2">{{this.request.verifyName}}</i>
            <i class="el-icon-warning" v-if="!this.request.verify">{{this.request.verifyName}}</i>
      </el-col>
     
      <el-col :span="8">报名表状态：
         <i class="el-icon-success" v-if="this.request.active===1">有效</i>
            <i class="el-icon-error" v-if="this.request.active===0">无效</i>
      </el-col>
    </el-row>
     <br>
    <el-row>
      <el-col :span="8">报名时间：{{this.request.createTime}}</el-col>
      <el-col :span="8">上次修改：{{this.request.updateTime}}</el-col>
    </el-row>
<el-divider content-position="left">参赛人信息</el-divider>


		<div class="main">
			<div id="form" class="form-title"></div>

			<div v-for="part in this.parts" :key="part.name">

				<div v-if="JSON.parse(part.code).type == 'el-input'">
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<el-col :span="24" id="form">
						<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;" :key="label.val">
							<el-col :span="2" :offset="1">{{label.name}}</el-col>
							<el-col :span="4">
								<el-input  v-model="form[label['model']]" :disabled="disable"></el-input>
							</el-col>
						</div>
					</el-col>
				</div>

				
				<div v-if="JSON.parse(part.code).type == 'el-input-multi'">
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<div v-for="(label,index) in JSON.parse(part.code).label" style="padding-left: 25%;" :key="label.val">
						<el-col :span="24" id="form">
							<div v-for="lab in label" :key="lab.val">
								<el-col :span="2" :offset="1">{{lab.name}}</el-col>
								<el-col :span="4">
									<el-input v-model="form[lab['model']][index]" :disabled="disable"></el-input>
								</el-col>
                
							</div>
						</el-col>
					</div>
				</div>

				<div v-if="JSON.parse(part.code).type == 'el-select'">
					<el-col :span="24" id="form" class="partner-detail">{{JSON.parse(part.code).label[0]['name']}}</el-col>
					<el-col :span="24" id="form" style="padding-left: 27.8%;">
						<el-col :span="3">{{JSON.parse(part.code).label[0]['name']}}</el-col>
						<el-col :span="4">
							<el-select v-model="form.getPath" placeholder="请选择" :disabled="disable">
								<el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</div>
			</div>
		</div>
  

  <el-button type="primary"  v-if="!disable" @click="submit()">保存修改</el-button>

     </div>

</template>

<script>
export default {
  data() {
    return {  
      disable: true,
      form:{
        competitionId: this.$route.query.compId,
        Id: this.$route.query.signId,
        studentId: [],
        studentName:[]
      }, 
      request: {
         Id: this.$route.query.signId
      },
      optionItem: {},
      parts: [],
      activeParams: [],
      options: [],
      verifyFlag: true
    }
  },
  created() {
    this.getOptionList(this.$route.query.compId)
    this.getDetailSign()
    
  },
  methods: {

    back() {
       this.$router.push({
        path: "/my-comp",
        name: "MyComp"
      })
    },
    getDetailSign(){
      this.axios.post('sign/detailSelf', res=>{
      this.request = res.data[0]
      this.optionItem = JSON.parse(res.data[0].optionItem)
      console.log(this.request)
      this.form = this.optionItem
     
       let studentId = res.data[0].studentId.split(',')
       let studentName = res.data[0].studentName.split(',')
      if(this.request.compType === 2){
       studentId.splice(0,1)
       studentName.splice(0,1)

       this.form.captainId = this.request.captainId
       this.form.captainName = this.request.captainName
       this.form.teamName = this.request.teamName
       
      }
      this.form.studentId = studentId
      this.form.studentName = studentName
     // this.getStuName()
      this.form.competitionId = this.request.competitionId
      this.form.Id = this.$route.query.signId

      if(this.request.verify === 1){
         this.verifyFlag = false
      }
     }, this.request)
    },
    getOptionList(id) {
      this.axios.post('/competition/getOptionList',res =>{
        let json = JSON.parse(res.data)
        this.parts = JSON.parse(json['parts'])
        this.activeParams = json['activeParams']
      }, {id:this.form.competitionId})

      this.axios.get('/constant-item/get-items', response => {
				this.options = response.data
			}, {
				'typeName': '获取信息渠道',
			})
    },
    update() {
      this.disable = false
    },
    submit() {
        this.axios.post('/sign/submit',res=>{
         if(res.code == 200){
           alert("修改成功！")
           this.disable = true
         }
      },{str: JSON.stringify(this.form), active: JSON.stringify(this.activeParams)})
    },
    getStuName(){
      this.axios.post('/student/getstuname',res =>{
          this.form.studentName = JSON.parse(res.data)
          console.log(this.form.studentName)
          console.log(this.form.studentId)
      }, {stuid : JSON.stringify(this.form.studentId) }
      )
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
     .el-icon-success{
        color: rgb(31, 207, 31);
    }
    .el-icon-error{
        color: rgb(219, 135, 135);
    }
    .el-icon-warning{
        color: rgb(197, 194, 37);
    }
</style>