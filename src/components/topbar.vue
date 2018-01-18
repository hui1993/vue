<template>
	<div id="topbar">
		<span>Vue-resume</span>
		<div>
			<el-button type="primary" v-on:click="saveData">保存</el-button>
			<el-button v-on:click="preview">预览</el-button>
      <el-button type="primary" v-on:click="logIn">{{this.user.name||'登录'}}</el-button>
      <el-button v-on:click="logOut">注销</el-button>
		</div>
	</div>
</template>

<script>
import AV from 'leancloud-storage'
export default{
  props: ['resume', 'user'],
  methods: {
    preview () {
      this.$emit('preview')
    },
    logIn () {
      this.$emit('logIn')
      console.log('发出登录信号')
    },
    logOut () {
      if (!this.user.name || !this.user.password) {
        return alert('你还没登录呢')
      }
      AV.User.logOut()
      this.user.name = ''
      this.user.password = ''
      this.int(this.resume)
    },
    saveData () {
      if (!this.user.name || !this.user.password) {
        return alert('请先登录')
      }
      var todo = AV.Object.createWithoutData('Todo', this.user.id)
      var dataResume = JSON.stringify(this.resume)
      console.log(dataResume)
      todo.set('content', dataResume)
      todo.save().then(function () {
        console.log('保存成功')
      })
    },
    int (obj) {
      for (var key in obj) {
        if ((typeof obj[key]) === 'string') {
          obj[key] = ''
        } else {
          this.int(obj[key])
        }
      }
    }
  }
}
</script>

<style>
	#topbar{
		display: flex;
		justify-content: space-between;
		padding: 5px 40px;
		border-bottom: 1px solid #999;
		box-shadow: 0 3px 5px #999;
	}
	#topbar > span{
		line-height: 35px;
	}
</style>
