<template>
  <div class="page-container textalign">
    <div class="filter-container">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-form-item label="序号">
          <el-input v-model="searchData.ID" placeholder="序号"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchData.type" placeholder="类型" style="width:130px;">
            <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="searchData.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="发布人">
          <el-select v-model="searchData.publishUserID" placeholder="发布人" style="width:130px;">
            <el-option v-for="item in publishUsers" :label="item.label" :value="item.value" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchData.newsStatus" placeholder="状态" style="width:130px;">
            <el-option v-for="item in statuss" :label="item.label" :value="item.value" :key="item.value">
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
        <el-form-item>
          <el-button>
            <router-link to="/cms/bp/news/add">新增</router-link>
          </el-button>
        </el-form-item>
        <table-head-select :selectableFields="selectableFields" @handleTableHeadChange="tableHeadChange"></table-head-select>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data='tableData' border style='width:100%' v-loading="loading1" element-loading-text="玩命加载中">
        <el-table-column :key='fieldInfo.field' v-for='(fieldInfo,index) in lastFields' :label="fieldInfo.label">
          <template scope="scope">
            <router-link :to="{path: '/cms/bp/news/detail', query: { ID: scope.row['ID'] }}" v-if="fieldInfo.field==='title'">{{scope.row[fieldInfo.field]}}</router-link>
            <span v-else>{{scope.row[fieldInfo.field]}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130px" align="center" label="操作">
          <template scope="scope">
            <el-button size="mini" type="info" v-if="scope.row['newsStatus']===0" @click="doOperateNews(scope.row['ID'],'publish')">发布</el-button>
            <el-button size="mini" type="info" v-if="scope.row['newsStatus']===1" @click="doOperateNews(scope.row['ID'],'callBackPublish')">草稿</el-button>
            <el-button size="mini" type="info" v-if="scope.row['newsStatus']!==9" @click="doOperateNews(scope.row['ID'],'delete')">删除</el-button>
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
import cmsAPI from '@/modules/cms/api/newsAPI'
import tableHeadSelect from '@/components/tableHeadSelect'
const totalFields = [
  { field: 'ID', label: '序号' },
  { field: 'title', label: '标题' },
  { field: 'type', label: '类型' },
  { field: 'author', label: '作者' },
  { field: 'publishTime', label: '发布时间' },
  { field: 'publishUser', label: '发布人' },
  { field: 'readCount', label: '阅读量' },
  { field: 'newsStatusDes', label: '状态' }
]
export default {
  name: 'newsList',
  data() {
    return {
      types: [{ value: '', label: '类型' }], // 类型下拉
      publishUsers: [{ value: -2, label: '发布人' }], // 发布人下拉
      statuss: [{ value: -1, label: '状态' }, { value: 0, label: '草稿' }, { value: 1, label: '发布' }, { value: 9, label: '删除' }], // 状态下拉
      searchData: {
        ID: '', // 编号
        type: '', // 类型
        author: '', // 作者
        newsStatus: -1, // 状态
        publishUserID: -2, // 发布人
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
      const listRes = cmsAPI.getNewsList(this.searchData)
      this.loading1 = false
      if (listRes.IsSuccess) {
        this.tableData = listRes.Data.data
        this.totalCount = listRes.Data.totalCount
      } else {
        Message({
          type: 'error',
          message: listRes.Msg,
          durarion: 3 * 1000
        })
      }
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
    },
    doOperateNews(id, type) { // 操作
      const operateRes = cmsAPI.operateNews({ id: id, type: type })
      if (operateRes.IsSuccess) {
        this.getTableData()
      } else {
        Message({
          type: 'error',
          message: operateRes.Msg,
          durarion: 3 * 1000
        })
      }
    },
    doCBPublish(id) { // 召回发布
      Message({
        type: 'success',
        message: id + '召回发布成功',
        durarion: 3 * 1000
      })
    },
    doDelete(id) { // 删除
      Message({
        type: 'success',
        message: id + '删除成功',
        durarion: 3 * 1000
      })
    }
  },
  created() {
    const typeRes = cmsAPI.getDistinctInfos({ type: 'type', label: '类型' })
    if (typeRes.IsSuccess) {
      typeRes.Data.forEach(x => {
        this.types.push({ value: x, label: x })
      })
    } else {
      Message({
        type: 'error',
        message: typeRes.Msg,
        durarion: 3 * 1000
      })
    }
    const puRes = cmsAPI.getDistinctInfos({ type: 'publishUser', label: '发布人' })
    if (puRes.IsSuccess) {
      puRes.Data.forEach(x => {
        this.publishUsers.push({ value: x.ID, label: x.name })
      })
    } else {
      Message({
        type: 'error',
        message: puRes.Msg,
        durarion: 3 * 1000
      })
    }
    this.searchData.ID = this.$route.query.ID
    this.searchData.author = this.$route.query.author
    this.searchData.publishUserID = this.$route.query.publishUserID
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
