<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template slot="before">
          <span>共{{ page.total }}条记录</span>
        </template>
        <template #after>
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import?type=user')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column
            prop="formOfEmployment"
            :formatter="formatEmployment"
            label="聘用形式"
            sortable=""
          />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{ row }">{{
              row.timeOfEntry | formatDate
            }}</template>
          </el-table-column>
          <el-table-column prop="enableState" label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <AddDemployee :show-dialog.sync="showDialog"></AddDemployee>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddDemployee from './components/add-employee.vue'
import { formatDate } from '@/filters'
export default {
  components: {
    AddDemployee
  },
  data() {
    return {
      loading: false,
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10,
        total: 0 // 总数
      },
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((itme) => itme.id === +cellValue)
      return obj ? obj.value : '未知'
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    // exportData() {
    //   const headers = {
    //     手机号: 'mobile',
    //     姓名: 'username',
    //     入职日期: 'timeOfEntry',
    //     聘用形式: 'formOfEmployment',
    //     转正日期: 'correctionTime',
    //     工号: 'workNumber',
    //     部门: 'departmentName'
    //   }
    //   import('@/vendor/Export2Excel').then(async (excel) => {
    //     const { rows } = await getEmployeeList({
    //       page: 1,
    //       size: this.page.total
    //     })
    //     const data = this.formatJson(headers, rows)
    //     excel.export_json_to_excel({
    //       header: Object.keys[headers],
    //       data,
    //       filename: '员工信息表',
    //       autoWidth: true
    //     })
    //   })
    // },
    // formatJson(headers, rows) {
    //   return rows.map((item) => {
    //     console.log(1)
    //     return Object.keys(headers).map((key) => {
    //       console.log(2)
    //       return item[headers[key]]
    //     })
    //   })
    // }
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async (excel) => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工表',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map((item) => {
        // item是一个对象  { mobile: 132111,username: '张三'  }
        // ["手机号", "姓名", "入职日期" 。。]
        return Object.keys(headers).map((key) => {
          // 需要判断 字段
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(
              (obj) => obj.id === item[headers[key]]
            )
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
        // ["132", '张三’， ‘’，‘’，‘’d]
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
