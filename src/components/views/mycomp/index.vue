<template>
    <div>
        <!-- 顶部操作栏 -->
        <el-row class="top-row">
            <el-row>
                <el-col :span="5">
                    <el-select v-model="show.type">
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
            <el-table-column prop="competitionName" label="竞赛名称" min-width="100px"></el-table-column>
            <el-table-column prop="createTime" label="报名时间" min-width="200px"></el-table-column>
            <el-table-column prop="teamName" label="队伍名称" v-if="show.type">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="提示文字" placement="right" :enterable="false">
                        <span>{{scope.row.teamName}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="captainName" label="队长" v-if="show.type"></el-table-column>
            <el-table-column label="状态" min-width="120px">
                <template slot-scope="scope">
                    <i class="el-icon-remove" v-if="!scope.row.active">未提交</i>
                    <div v-else>
                        <i class="el-icon-success" v-if="scope.row.verify===1">审核通过</i>
                        <i class="el-icon-error" v-if="scope.row.verify===2">审核未通过</i>
                        <i class="el-icon-warning" v-if="scope.row.verify===3">正在审核</i>
                        <i class="el-icon-warning" v-if="!scope.row.verify">待审核</i>
                    </div>
                </template>
            </el-table-column>
            
            <!-- 修改和单项删除操作 -->
            <el-table-column label="操作"  min-width="200px">
                <template slot-scope="scope">
                    <el-button @click="showTable(scope.row)" size="mini" type="primary" plain>查看报名表</el-button>
                    <div v-if="scope.row.active&&!scope.row.verify" id="btn-wrap">
                        <el-popconfirm @onConfirm="cancel(scope.row.id)" title="确定要撤销报名吗？">
                            <el-button size="mini" type="danger" slot="reference">撤销报名</el-button>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 分页导航 两个request参数需要sync同步（双向绑定）-->
        <el-pagination
            background
            layout="sizes, prev, pager, next"
            :page-sizes="[5, 10, 20, 40]"
            :page-count="show.pageCount"
            :page-size.sync="request.pageSize"
            :current-page.sync="request.pageNum"
            @current-change="getPage()"
            @size-change="getPage()">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: {
                name : null,
            },
            //请求参数
            request: {
                withPage : true,
                pageSize : 5,
                pageNum : 1,
                name: null,
            },
            types: [{
                value: 1,
                label: '团队比赛',
            },{
                value: 0,
                label: '个人比赛',
            }],
            //用于显示的数据
            show: {
                type: 1,
                pageCount : 1,
                items:  [
                    {
                        competitionName: "黑桥杯",
                        createTime: "yyyy-MM-dd HH:mm:ss",
                        verify: 0,
                        active: 0,
                    },
                    {
                        competitionName: "蓝桥杯",
                        createTime: "yyyy-MM-dd HH:mm:ss",
                        verify: 0,
                        active: 1,
                    },
                    {
                        competitionName: "绿桥杯",
                        createTime: "yyyy-MM-dd HH:mm:ss",
                        verify: 1,
                        active: 1,
                    },
                    {
                        competitionName: "红桥杯",
                        createTime: "yyyy-MM-dd HH:mm:ss",
                        verify: 2,
                        active: 1,
                    },
                    // {
                    //     competitionName: "黄桥杯",
                    //     createTime: "yyyy-MM-dd HH:mm:ss",
                    //     verify: 3,
                    //     active: 1,
                    // },
                    {
                        competitionName: "紫桥杯",
                        createTime: "yyyy-MM-dd HH:mm:ss",
                        verify: 0,
                        active: 1,
                        teamName: "哈哈哈",
                    }
                ],
            },
        }
    },
    methods: {
        getPage(otherback=()=>{}) {

            //发送分页查询请求
            this.axios.get('ums-role/list', res=>{
                let data = res.data
                this.show.items = data.records
                this.request.pageSize = data.size
                this.request.pageNum = data.current
                this.show.pageCount = data.pages
                otherback()
            }, this.request)
        },
        getSearch() {

            //修改请求数据
            this.request.pageNum = 1
            this.request.name = this.search.name

            //发送请求
            this.getPage()
        },
        showTable(row) {

        },
        cancel(id) {

        }
    },
    created() {
        // this.getPage()
    }
}
</script>

<style scoped>
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