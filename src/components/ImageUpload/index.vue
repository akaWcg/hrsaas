<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :on-remove="handleRemove"
      :on-change="changeFile"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img
        :src="imgUrl"
        style="width: 100%; max-heigth: 300px; object-fit: contain"
        alt=""
      />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {
          // url: 'https://ts1.cn.mm.bing.net/th/id/R-C.158244c57e80ac9cc38ccda65a513b38?rik=OOH18e32FfGo3g&riu=http%3a%2f%2fimages.shejidaren.com%2fwp-content%2fuploads%2f2015%2f11%2fdribbble-gif-8.gif&ehk=Iyrk4kLi4oxg5ukuyjDT1AOO4ZKQtsLLcNivTAtjJHM%3d&risl=&pid=ImgRaw&r=0'
          url: 'https://ts1.cn.mm.bing.net/th/id/R-C.9c1553a1082a4a77171dcf7472b48075?rik=INtKy3MV5niNUw&riu=http%3a%2f%2fimages.shejidaren.com%2fwp-content%2fuploads%2f2015%2f11%2fdribbble-gif-4.gif&ehk=SZo%2bpXF2BGcTHtBXJngkEuEK0hsyWoklJSfeZV5In2Y%3d&risl=&pid=ImgRaw&r=0'
        }
      ], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      // file是点击删除的文件
      //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
