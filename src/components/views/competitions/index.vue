<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="1">
        <!-- 这里坑点，用封装组件接收消息，要是用native作为后缀才可 -->
        <el-input v-model="search.name" placeholder="请输入竞赛名称" @keyup.enter.native="getSearch()" clearable @clear="clearSearch()"/>
      </el-col>
      <el-col :span="2" >
        <el-button  @click="getSearch()"  type="primary" icon="el-icon-search" plain >搜索</el-button>
      </el-col>
    </el-row>
   
    <div class="bo">
      <el-row>
        <el-col :span="2">
          <div class="titlefont">竞赛级别：</div>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="level('国家级')"
            >国家级</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="level('省级')">省级</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="level('校级')">校级</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="level('院级')">院级</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="bo">
      <el-row>
        <el-col :span="2">
          <div class="titlefont">竞赛类型：</div>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="type('团队赛')">团队赛</el-button >
        </el-col>
        <el-col :span="2">
          <el-button size="mini" round @click="type('个人赛')" >个人赛</el-button >
        </el-col>
      </el-row>
    </div>
    <div class="bo">
      <el-row>
        <el-col :span="2">
          <div class="titlefont" v-if="query.levelName != '' || query.typeName != ''" >已选标签：</div>
        </el-col>
        <el-col :span="2">
          <el-tag v-if="query.levelName != ''" size="medium" type="success" closable @close="closeLevel">{{ query.levelName }}</el-tag>
        </el-col>
        <el-col :span="2">
          <el-tag v-if="query.typeName != ''" size="medium" type="warning" closable @close="closeType">{{ query.typeName }}</el-tag>
        </el-col>
        <el-col :span="2">
          <el-button v-if="query.levelName != '' || query.typeName != ''" size="mini" type="primary" round @click="clean()">清除标签</el-button>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col
        :span="5"
        v-for="(item, index) in result.items"
        :key="item.val"
        :offset="index % 4 > 0 ? 1 : 0">
        <br />
        <el-card :body-style="{ padding: '0px',height:'325px' }" >
          <img :src="item.image" class="image" style="height:230px; width=100px;"/>
          <div style="padding: 14px">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.startTime }}至{{ item.endTime }}</time>
              <el-button type="text" class="button" @click="goDetail(item.id)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="8" :offset="8">
        <el-pagination
          background
          layout="sizes, prev, pager, next"
          :page-sizes="[4, 8, 12, 16]"
          :page-count="result.pages"
          :page-size.sync="query.pageSize"
          :current-page.sync="query.pageNo"
          @current-change="getData()"
          @size-change="getData()">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //请求参数
      query: {
        pageSize: 8,
        pageNo: 1,
        name: "",
        levelName: "",
        typeName: "",
        id: 4,
      },
      result: {
        items: [],
        pages: 0,
      },
      tag: {
        levelswitch: false,
        typeswitch: false,
      },
      search: {
        name: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        name: "Detail",
        params: {id: id}
      })
    },
    getSearch() {
      this.query.name = this.search.name
      this.$set(this.query, 'pageNo' ,1)
      this.getData()
    },
    clearSearch() {
      this.clean()
      this.getData()
    },
    getData() {
      this.axios.post("/competition/list",response => {
          this.result.items = response.data.records
          this.result.pages = response.data.pages
          this.query.pageSize = response.data.size
          this.query.pageNo = response.data.current
        },
        this.query
      )
    },
    time(sort) {
      //按时间排序，0，1，2，3  4为不排序
      this.query.id = sort
      this.getData()
    },
    level(levelname) {
      this.query.levelName = levelname
      this.getData()
    },
    type(typename) {
      this.query.typeName = typename
      this.getData()
    },
    closeLevel() {
      this.query.levelName = ""
      this.getData()
    },
    closeType() {
      this.query.typeName = ""
      this.getData()
    },
    clean() {
      this.query.name = ""
      this.query.levelName = ""
      this.query.typeName = ""
      this.query.id = 4
      this.getData()
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
  clear: both;
}
.titlefont {
  font-size: 15px;
  text-align: center;
  margin-top: 4px;
}
.bo {
  margin: 15px;
}
</style>