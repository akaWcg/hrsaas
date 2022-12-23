<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleIds">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{
        item.name
      }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    },
    async getRoleList() {
      try {
        const { rows } = await getRoleList()
        this.list = rows
      } catch (error) {
        console.log(error)
      }
    },
    async getUserDetailById(id) {
      try {
        const { roleIds } = await getUserDetailById(id)
        this.roleIds = roleIds
      } catch (error) {
        console.log(error)
      }
    },
    async btnOK() {
      try {
        await assignRoles({ id: this.userId, roleIds: this.roleIds })
        this.$emit('update:showRoleDialog', false)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

