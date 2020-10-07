<template>
    <div>
        <!-- 顶部操作栏 -->
        <el-row class="top-row">
            <el-row>
                <!-- 竞赛类别选择 -->
                <el-col :span="5">
                    <el-select v-model="search.type" @change="getSearch()">
                        <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" :offset="1">
                    <!-- 这里坑点，用封装组件接收消息，要是用native作为后缀才可 -->
                    <el-input v-model="search.name" placeholder="请输入竞赛名称" @keyup.enter.native="getSearch()"/>
                </el-col>
                <el-col :span="2">
                    <el-button @click="getSearch()" class='button' type="primary" icon="el-icon-search" plain/>
                </el-col>
            </el-row>
        </el-row>

        <!-- 数据表格，采用template自制模板 -->
        <el-table
            :data="show.items"
            style="width: 100%"> <!--这里必不能带()-->

            <!-- 属性列 -->
            <el-table-column label="竞赛名称" min-width="100px">
                <template slot-scope="scope">
                    <span @click="compInfo(scope.row.competitionId)" title="点击查看竞赛详情" id="compInfo">
                        {{scope.row.compName}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="报名时间" width="200px"></el-table-column>
            <el-table-column prop="teamName" label="队伍名称" v-if="search.type == 2">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.studentName" placement="right" :enterable="false">
                        <span>{{scope.row.teamName}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="captainName" label="队长" v-if="search.type == 2"></el-table-column>
            <el-table-column prop="studentName" label="参赛人" v-else></el-table-column>
            <el-table-column label="状态" min-width="120px">
                <template slot-scope="scope">
                    <i class="el-icon-remove" v-if="!scope.row.active">未提交</i>
                    <div v-else>
                        <i class="el-icon-success" v-if="scope.row.verify===1">审核通过</i>
                        <i class="el-icon-error" v-if="scope.row.verify===2">审核驳回</i>
                        <i class="el-icon-warning" v-if="!scope.row.verify">待审核</i>
                    </div>
                </template>
            </el-table-column>
            
            <!-- 修改和单项删除操作 -->
            <el-table-column label="操作"  min-width="200px">
                <template slot-scope="scope">
                    <el-button @click="showTable(scope.row.id,scope.row.competitionId)" size="mini" type="primary" plain>查看报名表</el-button>
                    <div v-if="scope.row.active&&!scope.row.verify" id="btn-wrap">
                        <el-popconfirm @onConfirm="cancel(scope.row.id)" title="确定要撤销报名吗？">
                            <el-button size="mini" type="danger" slot="reference">撤销报名</el-button>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            search: {
                name : null,
                type : 0,
            },
            //请求参数
            request: {
                studentId: null,
                compType: null,
                compName: null,
            },
            types: [{
                value: 0,
                label: '-',
            }, {
                value: 2,
                label: '团队比赛',
            },{
                value: 1,
                label: '个人比赛',
            }],
            //用于显示的数据
            show: {items:[]},
        }
    },
    computed: {
        ...mapGetters(['getNumId']),
    },
    methods: {
        getPage(otherback=()=>{}) {
            //发送分页查询请求
            this.axios.get('student/list-sign', res=>{
                this.show.items = res.data
                otherback()
            }, this.request)
        },
        getSearch() {
            this.show.items = []

            //修改请求数据
            this.request.compType = this.search.type ? this.search.type : null
            this.request.compName = this.search.name
            console.log(this.request)

            //发送请求
            this.getPage()
        },
        showTable(signid,compid) {
            this.$router.push({
                name:"DetailSign",
                path:"/detail-sign",
                query: {
                    signId: signid,
                    compId: compid
                }
            })
        },
        cancel(id) {
            console.log(id)
        },
        compInfo(compId) {
            console.log(compId)
            this.$router.push({
                path: "/detail",
                query: {id: compId}
            })
        }
    },
    created() {
        this.request.studentId = this.getNumId
        this.getPage()
    }
}
</script>

<style scoped>
    #compInfo{
        color: rgb(63, 63, 230);
    }
    #compInfo:hover{
        cursor: pointer;
        color: rgb(218, 33, 33);
    }
    .el-table{
        margin-top: 5px;
    }
    .button{
        padding: 12px;
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
    .el-icon-remove{
        color: rgb(114, 114, 114);
    }
    #btn-wrap{
        display: inline-block;
    }
</style>