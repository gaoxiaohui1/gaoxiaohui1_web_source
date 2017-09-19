<template>
  <div class="table-head-select">
    <el-popover ref="popover_ths" placement="left" width="400" trigger="hover">
      <el-checkbox-group v-model="selectedFields">
        <el-checkbox v-for="(field,index) in selectableFields" :label="field.field" :key="field.field">{{field.label}}</el-checkbox>
      </el-checkbox-group>
    </el-popover>
    <i class="el-icon-menu" v-popover:popover_ths></i>
  </div>
</template>

<script>
export default {
  name: 'tableHeadSelect',
  props: ['selectableFields'],
  data() {
    return {
      selectedFields: []
    }
  },
  created() {
    this.selectableFields.forEach(c => this.selectedFields.push(c.field))
  },
  watch: {
    selectedFields(valArr) {
      this.$emit('handleTableHeadChange', valArr)
    }
  }
}
</script>
<style>
.table-head-select {
  background-color: #58b7ff;
  float: right;
  right: 100px;
  top: 100px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: .4;
  transition: .3s
}

.table-head-select i {
  color: #fff;
  display: block;
  line-height: 50px;
  text-align: center;
  font-size: 22px
}

.table-head-select:hover {
  opacity: 1
}
</style>

