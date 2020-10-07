<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-button round @click="back">
          <i class="el-icon-arrow-left el-icon--left" @click="back()"></i>返回
        </el-button>
      </el-col>
      <el-col :span="8" :offset="1">
        <div class="title">报名信息填写</div>
      </el-col>
      <el-col :span="1" :offset="4">
           <el-button type="danger" round @click="onSubmit()">提交报名</el-button>
        </el-col>
    </el-row>
     <el-divider content-position="left">{{this.name}}</el-divider>

    		<div class="main">
			<div id="form" class="form-title"></div>

			<div v-for="part in this.parts" :key="part.name">

				<div v-if="JSON.parse(part.code).type == 'el-input'">
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<el-col :span="24" id="form">
						<div v-for="label in JSON.parse(part.code).label" style="padding-left: 25%;" :key="label.val">
							<el-col :span="2" :offset="1">{{label.name}}</el-col>
							<el-col :span="4">

              <!--<div v-for="active in this.activeParams" :key="active.val">
                <el-input v-if="active == label['model']" v-model="form.optionItem[label['model']]"></el-input>
              </div>-->

								<el-input  v-model="form[label['model']]"></el-input>

							</el-col>
						</div>
					</el-col>
				</div>

				
				<div v-if="JSON.parse(part.code).type == 'el-input-multi' ">
					<el-col :span="24" id="form" class="partner-detail">{{part.name}}</el-col>
					<div v-for="(label,index) in JSON.parse(part.code).label" style="padding-left: 25%;" :key="label.val">
						<el-col :span="24" id="form">
							<div v-for="lab in label" :key="lab.val">
								<el-col :span="2" :offset="1">{{lab.name}}</el-col>
								<el-col :span="4">
									<el-input v-model="form[lab['model']][index]"></el-input>
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
							<el-select v-model="form.getPath" placeholder="请选择">
								<el-option v-for="option in options" :key="option.id" :label="option.name" :value="option.code"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</div>
			</div>
		</div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.$route.params.name,
      form: {
          competitionId: this.$route.params.id,
          studentId: [],
          studentName:[]
      },
      parts: [],
      activeParams: [],
      options: [],
      
    }
  },
  created() {
     this.getOptionList(this.$route.params.id)
     //alert(this.$route.Params.id)
    // this.compType = this.$route.Params.compType
  },
  methods: {
    onSubmit() {
      this.axios.post('/sign/submit',res=>{
         if(res.code == 200){
           alert("报名成功！")
         }
      },{str: JSON.stringify(this.form), active: JSON.stringify(this.activeParams)})
    },
    back() {
        this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {id: this.form.competitionId}
      })
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
    }

  }
}
</script>

<style>
</style>