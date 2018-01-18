<template>
	<div id="LogIn">
		<el-form label-width="100px" class="demo-ruleForm">
		  <el-form-item label="用户名">
		    <el-input v-model="user.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码">
		    <el-input type="password" auto-complete="off" v-model="user.password"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" v-on:click="singUp">注册</el-button>
		    <el-button v-on:click="logIn">登录</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  import AV from 'leancloud-storage'
  export default{
    props: ['user', 'resume'],
    methods: {
      singUp () {
        var _this = this
        if (!this.user.name || !this.user.password) {
          return alert('用户名和密码不能为空')
        }
        var user = new AV.User()
        user.setUsername(this.user.name)
        user.setPassword(this.user.password)
        user.signUp().then(function (loginedUser) {
          console.log(loginedUser)
        }, function (error) {
          console.error(error)
        })

        var Todo = AV.Object.extend('Todo')
        var todo = new Todo()
        todo.set('name', 'resume')
        todo.save().then(function (todo) {
          console.log('objectId is ' + todo.id)
          _this.user.id = todo.id
          console.log(_this.user.id)
          AV.User.logIn(_this.user.name, _this.user.password).then(function (loginedUser) {
            loginedUser.set('resumeId', todo.id)
            loginedUser.save()
            _this.$emit('done')
          }, function (error) {
            console.error(error)
          })
        }, function (error) {
          console.error(error)
        })
      },
      logIn () {
        var _this = this
        if (!this.user.name || !this.user.password) {
          return alert('用户名和密码不能为空')
        }
        AV.User.logIn(this.user.name, this.user.password).then(function (loginedUser) {
          _this.user.id = loginedUser.get('resumeId')
          _this.$emit('logined')
        }, function (error) {
          console.error(error)
        })
      },
      int (obj, callback) {
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue
          }
          if ((typeof obj[key]) === 'string' || (typeof obj[key]) === 'number') {
            this.resume[key] = obj[key]
          } else {
            this.int(obj[key], this.resume[key])
          }
        }
      }
    },
    created () {
      this.resume.profile.name
    }
  }
</script>

<style>
	#LogIn{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 93%;
		background-color: rgba(0, 0, 0, .8);
	}
	#LogIn > .demo-ruleForm{
		width: 300px;
		margin: 0 auto;
	}
	#LogIn > .demo-ruleForm > .label{
		color: white!important;
	}
</style>