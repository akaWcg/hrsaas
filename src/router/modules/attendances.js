// 导出员工路由规则
import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [
    {
      // 二级路由path不写的话 默认和一级路由共用一个
      path: '',
      component: () => import('@/views/attendances'),
      // 路由元信息 是储存数据的地方 可以放任何内容
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
