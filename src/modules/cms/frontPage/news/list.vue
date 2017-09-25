<template>
  <div class="page-container textalign">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="序号">
          <el-input v-model="searchData.ID" placeholder="序号"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchData.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="searchData.publishUser" placeholder="发布人"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchData.type" placeholder="类型" style="width:130px;">
            <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='发布时间'>
          <el-date-picker v-model='searchData.startTime' align='right' type='date' placeholder='年-月-日' style='width:120px;'> </el-date-picker>
          至
          <el-date-picker v-model='searchData.endTime' align='right' type='date' placeholder='年-月-日' style='width:120px;'> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop.prevent="getTableData">查询</el-button>
        </el-form-item>
        <table-head-select :selectableFields="selectableFields" @handleTableHeadChange="tableHeadChange"></table-head-select>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data='tableData' border style='width:100%' v-loading="loading1" element-loading-text="玩命加载中">
        <el-table-column :key='fieldInfo.field' v-for='(fieldInfo,index) in lastFields' :label="fieldInfo.label">
          <template scope="scope">
            <router-link :to="{path: '/cms/fp/news/detail', query: { ID: scope.row['ID'] }}" v-if="fieldInfo.field==='title'">{{scope.row[fieldInfo.field]}}</router-link>
            <span v-else>{{scope.row[fieldInfo.field]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchData.pageIndex" :page-size="searchData.pageSize" layout="total, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { Message } from 'element-ui'
import cmsApi from '../api'
import tableHeadSelect from '@/components/tableHeadSelect'
const totalFields = [
  { field: 'ID', label: '序号' },
  { field: 'title', label: '标题' },
  { field: 'type', label: '类型' },
  { field: 'author', label: '作者' },
  { field: 'publishTime', label: '发布时间' },
  { field: 'publishUser', label: '发布人' },
  { field: 'readCount', label: '阅读量' }
]
export default {
  name: 'newsList',
  data() {
    return {
      types: [], // 类型下拉
      searchData: {
        ID: '', // 编号
        author: '', // 作者
        publishUser: '', // 发布人
        type: '', // 类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        pageIndex: 1,
        pageSize: 15
      },
      defaultFields: totalFields.slice(0, 1), //  默认展示的表头
      selectableFields: totalFields.slice(1), // 可选表头
      lastFields: totalFields, // 最终显示表头
      tableData: [], // 列表数据
      totalCount: 0, // 列表数据总数
      loading1: true // 加载
    }
  },
  methods: {
    getTableData() { // 获取列表
      this.loading1 = true
      this.searchData.pageIndex = this.searchData.pageIndex < 1 ? 1 : this.searchData.pageIndex
      cmsApi.getNewsList(this.searchData).then(response => {
        this.loading1 = false
        this.tableData = response.Value.data
        this.totalCount = response.Value.totalCount
      }).catch(error => {
        console.log(error)
        Message({
          type: 'error',
          message: error.Msg,
          durarion: 3 * 1000
        })
      })
    },
    handleCurrentChange(currentPage) { // 分页跳转
      this.searchData.pageIndex = currentPage
      this.getTableData()
    },
    tableHeadChange(selectedFields) { // 表头变化
      this.lastFields = []
      this.lastFields.push(...this.defaultFields)
      const realSelectedFields = totalFields.filter(i => selectedFields.indexOf(i.field) >= 0)
      this.lastFields.push(...realSelectedFields)
    }
  },
  created() {
    this.types.push({ value: 0, label: '类型' })
    this.types.push(...cmsApi.getNewsTye())
    this.searchData.ID = this.$route.query.ID
    this.searchData.author = this.$route.query.author
    this.searchData.publishUser = this.$route.query.publishUser
    this.searchData.type = this.$route.query.type
    this.getTableData()
  },
  components: {
    tableHeadSelect
  }
}
</script>
<style>
.page-container.textalign {
  text-align: justify
}
</style>
