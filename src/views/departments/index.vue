<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools
          :tree-node="company"
          :is-root="true"
          @addDepts="addDepts"
        ></TreeTools>
        <el-tree :data="list" :props="defaultProps" default-expand-all>
          <TreeTools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="delDepts"
            @addDepts="addDepts"
            @editDepts="editDepts"
          ></TreeTools>
        </el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      :tree-node="node"
      :show-dialog.sync="showDialog"
      @addDepts="add"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments, delDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      list: [],
      loading: false, // 用来控制进度弹层的显示和隐藏
      defaultProps: {
        label: 'name'
      },
      company: {},
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const res = await getDepartments()
      this.company = { name: res.companyName, manager: '负责人', id: '' }
      this.list = tranListToTreeData(res.depts, '')
      this.loading = false
    },
    async delDepts(id) {
      try {
        await delDepartments(id)
        this.$message.success('删除部门成功')
        this.getDepartments()
      } catch (error) {
        console.log(error)
      }
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    add() {
      this.getDepartments()
      // this.showDialog = false
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
